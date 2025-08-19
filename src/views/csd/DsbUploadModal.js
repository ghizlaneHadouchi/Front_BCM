import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormLabel,
  CFormSelect,
  CFormInput,
} from '@coreui/react'
// import { generateReport } from '../../hooks/dsbApi'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Btdata } from '../../constants/constants'
// import { checkExistingGeneratedDsbWorkflow, archiveDsbWorkflow } from '../../hooks/dsbApi'

const DsbUploadModal = ({ visible, onClose, onRefresh, setData, data }) => {
  const [selectedReport, setSelectedReport] = useState('292')
  const [periodQuarter, setPeriodQuarter] = useState('T1')
  const [periodYear, setPeriodYear] = useState(new Date().getFullYear())
  const [showConfirm, setShowConfirm] = useState(false)
  const [existingWorkflowId, setExistingWorkflowId] = useState(null)

  const navigate = useNavigate()
  const { t } = useTranslation()

  const reportOptions = [
    { label: t('Report 292'), value: '292' },
    { label: t('Report 293'), value: '293' },
    { label: t('Report 296'), value: '296' },
    { label: t('Report 298'), value: '298' },
    { label: t('Report 303'), value: '303' },
    { label: t('Report 304'), value: '304' },
    { label: t('Report 300'), value: '300' },
    { label: t('Report 291'), value: '291' },
    { label: t('Report 294'), value: '294' },
    { label: t('Report 295'), value: '295' },
    { label: t('Report 297'), value: '297' },
    { label: t('Report 299'), value: '299' },
    { label: t('Report 302'), value: '302' },
    { label: t('Report 305'), value: '305' },
    { label: t('Report 308'), value: '308' },
  ]

  const semestrielReports = ['304', '305', '308']
  const isSemestriel = semestrielReports.includes(selectedReport)
  const frequency = semestrielReports.includes(selectedReport) ? 'Semestriel' : 'Trimestriel'

  const handleUpload = async () => {
    if (!selectedReport || !periodQuarter || !periodYear) {
      alert(t('Please select a report, quarter, and year.'))
      return
    }

    const formattedDate = `${periodQuarter}${periodYear}`
    const formattedReport = `CSD Report ${selectedReport}`
    const check = data.findIndex(
      (i) => i.report === `CSD report ${selectedReport}` && i.quarter === periodQuarter,
    )

    // const check = await checkExistingGeneratedDsbWorkflow(formattedReport, formattedDate)
    // console.log(formattedReport)

    if (check !== -1) {
      // setExistingWorkflowId(check.workflowId)
      onClose()
      setShowConfirm(true)
      return
    } else {
      setData((prev) => [
        ...prev,
        {
          report: `CSD report ${selectedReport}`,
          frequency: 'Trimestriel',
          quarter: periodQuarter,
          reportDate: `${periodYear}-${periodQuarter}`,
          submissionDate: '-',
          reportStatus: 'GENERATED',
          sendingStatus: 'N/D',
          receinvingStatus: 'N/D',
        },
      ])
      onClose()
    }
  }

  const resetFormAndClose = () => {}

  return (
    <>
      <CModal visible={visible} onClose={onClose}>
        <CModalHeader>
          <CModalTitle>{t('Ajout Rapport CSD')}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="mb-4">
            <label className="block mb-2">{t('Rapport')}</label>
            <CFormSelect
              className="form-select w-full"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="">{t('-- Rapport--')}</option>
              {reportOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 2 }}>
              <CFormLabel>{t('Quarter')}</CFormLabel>
              {isSemestriel ? (
                <CFormSelect
                  value={periodQuarter}
                  onChange={(e) => setPeriodQuarter(e.target.value)}
                >
                  <option value="">{t('Select Semester')}</option>
                  <option value="S1">{t('S1 - Jan to Jun')}</option>
                  <option value="S2">{t('S2 - Jul to Dec')}</option>
                </CFormSelect>
              ) : (
                <CFormSelect
                  value={periodQuarter}
                  onChange={(e) => setPeriodQuarter(e.target.value)}
                >
                  <option value="">{t('Select Quarter')}</option>
                  <option value="T1">{t('T1 - Jan to Mar')}</option>
                  <option value="T2">{t('T2 - Apr to Jun')}</option>
                  <option value="T3">{t('T3 - Jul to Sep')}</option>
                  <option value="T4">{t('T4 - Oct to Dec')}</option>
                </CFormSelect>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <CFormLabel>{t('Year')}</CFormLabel>
              <CFormInput
                type="number"
                min="2000"
                max="2100"
                value={periodYear || new Date().getFullYear()}
                onChange={(e) => setPeriodYear(e.target.value)}
              />
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            {t('Cancel')}
          </CButton>
          <CButton
            color="primary"
            onClick={handleUpload}
            disabled={!selectedReport || !periodQuarter || !periodYear}
          >
            {t('Générer')}
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={showConfirm} onClose={() => setShowConfirm(false)}>
        <CModalHeader>
          <CModalTitle>{t('Rapport déjà généré')}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {t('Ce rapport a déjà été généré pour la période sélectionnée. Que voudrais-tu faire ?')}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="warning"
            onClick={async () => {
              // await archiveDsbWorkflow(existingWorkflowId)
              setShowConfirm(false)
              onRefresh?.()
              resetFormAndClose()
            }}
          >
            {t('Archiver')}
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              navigate(`/csd/bt/details/1`, { state: { data: Btdata[0] } })
            }}
          >
            {t('Consulter')}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DsbUploadModal
