import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsFiletypeXlsx, BsEye, BsDownload } from 'react-icons/bs'
import PropTypes from 'prop-types'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'
import { FiSend, FiCheck } from 'react-icons/fi'
import StatusBadge from '../../components/StatusBadge'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { formatDate } from '../../utils/formatDate'
// import {
//   getDsbWorkflowById,
//   downloadFile,
//   updateDsbWorkflow,
//   downloadDsbTxt,
// } from '../../hooks/dsbApi'

const StatusDisplay = ({ label, value, type }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
    <span style={{ fontSize: 16, fontWeight: 600 }}>{label}</span>
    <StatusBadge status={value || 'N/A'} type={type} />
  </div>
)

StatusDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

// InfoField Component
const InfoField = ({ label, value, width = '10%' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width }}>
    <label
      style={{
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {label}
    </label>
    <input
      className="bg-gray-50 shadow-sm px-2 py-2 rounded-md text-center font-bold border border-gray-100"
      value={value}
      disabled
    />
  </div>
)

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.string,
}

const BtDetails = () => {
  const location = useLocation()
  const { state } = location
  const [workflow, setWorkflow] = useState(state.data)
  const [loadingWorkflow, setLoadingWorkflow] = useState(true)
  const [error, setError] = useState(null)
  const [isDownloadingExcel, setIsDownloadingExcel] = useState(false)
  const [downloadingType, setDownloadingType] = useState(null)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showRequestPreview, setShowRequestPreview] = useState(false)
  const [showResponsePreview, setShowResponsePreview] = useState(false)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [isExportingCSV, setIsExportingCSV] = useState(false)
  const navigate = useNavigate()

  const { t } = useTranslation()

  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      setLoadingWorkflow(true)
      try {
        // const data = await getDsbWorkflowById(id)
        const data = {}
        // setWorkflow(data)
      } catch (err) {
        console.error('Error fetching workflow details:', err)
        setError('Failed to fetch workflow details.')
      } finally {
        setLoadingWorkflow(false)
      }
    }

    fetchData()
  }, [id])

  const handleTXTDownload = async (id, reportCode) => {
    try {
      const response = await downloadDsbTxt(id, reportCode)

      const blob = new Blob([response.data], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)

      // Extract filename from Content-Disposition header
      const disposition = response.headers['content-disposition']
      let filename = 'Dsb-report.txt'

      if (disposition && disposition.includes('filename=')) {
        const match = disposition.match(/filename="?(.+?)"?$/)
        if (match?.[1]) {
          filename = decodeURIComponent(match[1])
        }
      }

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error('Download failed:', err)
      window.showToast?.('Download failed', 'error')
    }
  }

  const handlBODownload = async (workflowId) => {
    try {
      setIsDownloadingExcel(true)

      const response = await downloadFile(workflowId)

      const blob = new Blob([response.data], { type: response.headers['content-type'] })
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url

      const contentDisposition = response.headers['content-disposition']
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') || `report_${workflowId}`
        : `report_${workflowId}`

      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloadingExcel(false)
    }
  }

  if (loadingWorkflow) {
    return (
      <div className="p-4">
        <div className="text-gray-600">Loading CSD report details...</div>
      </div>
    )
  }

  if (!workflow) {
    return (
      <div className="p-4">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
          No DSB report details found. Please select a report from the dashboard.
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          &larr; Back to CSD Dashboard
        </button>
      </div>
    )
  }

  // Example: Validate workflow
  const handleValidate = async (workflowId) => {
    try {
      const updated = await updateDsbWorkflow(workflowId, {
        reportStatus: 'VALIDATED',
        submissionStatus: 'AWAITING',
      })

      setWorkflow((prev) => ({
        ...prev,
        reportStatus: updated.reportStatus,
        submissionStatus: updated.submissionStatus,
      }))

      window.showToast?.('Workflow successfully validated', 'success')
      setShowValidationModal(false)
    } catch (err) {
      console.error(err)
      window.showToast?.('Validation failed', 'error')
    }
  }

  const handleSend = async (workflowId) => {
    try {
      await updateDsbWorkflow(workflowId, {
        reportStatus: 'SENT',
        submissionStatus: 'SENT',
      })

      window.showToast?.(t('Report successfully sent'), 'success')

      const updatedWorkflow = await getDsbWorkflowById(workflowId)
      if (updatedWorkflow) {
        setWorkflow(updatedWorkflow)
      }

      setShowSendModal(false)
    } catch (error) {
      console.error('Error sending workflow:', error)
      window.showToast?.(t('Error sending report'), 'error')
    }
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="text-gray-700 hover:text-gray-900 hover:underline font-medium transition-colors duration-200 no-underline cursor-pointer mb-4 block border-0 bg-transparent"
      >
        &larr; {t('Return to CSD Dashboard')}
      </button>

      <div className="flex flex-col gap-2 mb-2">
        {/* Workflow Data Card */}
        <div className="card-container">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-8">
              {/* Status Displays */}
              <div className="flex flex-col items-center justify-center">
                <StatusDisplay
                  label={t('Statut du rapport')}
                  value={workflow.reportStatus}
                  type="smpWorkflow"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <StatusDisplay
                  label={t("Statut d'envoi")}
                  value={workflow.submissionStatus}
                  type="smpBkam"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <StatusDisplay
                  label={t('Statut de réception')}
                  value={workflow.receivingStatus}
                  type="smpBkam"
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold text-gray-700">{t('Rapports')}</span>

                  <CButton
                    onClick={() => handlBODownload(workflow.id)}
                    color="info"
                    variant="outline"
                    disabled={
                      isDownloadingExcel ||
                      ['ERROR', 'IN_PROGRESS', 'SKIPPED', 'ALREADY_EXISTS'].includes(
                        workflow?.reportStatus,
                      )
                    }
                  >
                    <div className="flex flex-row items-center gap-2">
                      {isDownloadingExcel ? (
                        <AiOutlineLoading3Quarters size={15} className="animate-spin" />
                      ) : (
                        <BsDownload size={15} />
                      )}
                      <span>{t('Télecharger')}</span>
                    </div>
                  </CButton>
                </div>
              </div>
            </div>

            {/* Info Fields */}
            <div className="flex justify-between px-[2%] gap-[1%]">
              <InfoField label={t('Nom du rapport')} value={workflow.report} width="15%" />
              <InfoField label={t('Fréquence')} value={workflow.frequency} width="15%" />
              <InfoField
                label={t('Date de réception')}
                value={formatDate(workflow.receptionDate)}
                width="15%"
              />
              <InfoField
                label={t('Date de présentation')}
                value={formatDate(workflow.submissionDate)}
                width="15%"
              />
              <InfoField
                label={t('Date du rapport')}
                value={formatDate(workflow.reportDate)}
                width="15%"
              />
            </div>
          </div>
        </div>

        {/* Request and Response Files Side by Side */}
        <div className="flex flex-col lg:flex-row gap-6">
          {workflow.submissionFileName && (
            <div className="card-container w-full lg:w-1/2 p-4">
              <div className="flex flex-col gap-3">
                <h6 className="text-lg font-semibold">{t('Fichier Requis')}</h6>
                <div className="text-sm text-gray-500 truncate mb-2">
                  {workflow.submissionFileName}
                </div>
                <div className="flex gap-2">
                  {workflow.reportStatus === 'GENERATED' ? (
                    <CButton
                      color="warning"
                      variant="outline"
                      onClick={() => setShowValidationModal(true)}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <FiCheck size={15} />
                        <span>{t('Valider')}</span>
                      </div>
                    </CButton>
                  ) : workflow.reportStatus === 'VALIDATED' ? (
                    <CButton
                      color="success"
                      variant="outline"
                      onClick={() => setShowSendModal(true)}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <FiSend size={15} />
                        <span>{t('Envoyer')}</span>
                      </div>
                    </CButton>
                  ) : null}

                  <CButton
                    onClick={() => handleTXTDownload(workflow.id, workflow.reportCode)}
                    color="info"
                    variant="outline"
                    disabled={isExportingCSV}
                  >
                    <div className="flex flex-row items-center gap-2">
                      {isExportingCSV ? (
                        <AiOutlineLoading3Quarters size={15} className="animate-spin" />
                      ) : (
                        <BsDownload size={15} />
                      )}
                      <span>{t('Télecharger')}</span>
                    </div>
                  </CButton>
                </div>
              </div>
            </div>
          )}

          {workflow.receivingFileName && (
            <div className="card-container w-full lg:w-1/2 p-4">
              <div className="flex flex-col gap-3">
                <h6 className="text-lg font-semibold">{t('Response File')}</h6>
                <div className="text-sm text-gray-500 truncate mb-2">ReceivedFileName</div>
                <div className="flex gap-2">
                  <CButton
                    onClick={() => setShowResponsePreview(true)}
                    color="info"
                    variant="outline"
                    className="flex justify-center items-center gap-2 py-1 px-2"
                  >
                    <BsEye size={15} />
                    <span>{t('Preview')}</span>
                  </CButton>
                  <CButton
                    onClick={''}
                    color="primary"
                    variant="outline"
                    className="flex justify-center items-center gap-2 py-1 px-2"
                    disabled={isDownloadingCSV}
                  >
                    {isDownloadingExcel ? (
                      <AiOutlineLoading3Quarters size={15} className="animate-spin" />
                    ) : (
                      <BsDownload size={15} />
                    )}
                    <span>{t('Download')}</span>
                  </CButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <CModal visible={showValidationModal} onClose={() => setShowValidationModal(false)}>
        <CModalHeader>
          <CModalTitle>{t('Confirmation')}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{t('Are you sure you want to validate this report?')}</p>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            variant="outline"
            onClick={() => setShowValidationModal(false)}
          >
            {t('Cancel')}
          </CButton>
          <CButton
            color="warning"
            onClick={() => {
              handleValidate(workflow.id)
              setShowValidationModal(false)
            }}
          >
            {t('Confirm')}
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={showSendModal} onClose={() => setShowSendModal(false)}>
        <CModalHeader>
          <CModalTitle>{t('Send Confirmation')}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{t('Are you sure you want to send this report?')}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={() => setShowSendModal(false)}>
            {t('Cancel')}
          </CButton>
          <CButton
            color="success"
            onClick={() => {
              handleSend(workflow.id)
              setShowSendModal(false)
            }}
          >
            {t('Confirm')}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default BtDetails
