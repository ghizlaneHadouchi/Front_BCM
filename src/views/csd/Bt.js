import React, { useMemo, useState, useEffect } from 'react'
import { useTable, usePagination } from 'react-table'
import { useNavigate } from 'react-router-dom'
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { formatDate } from '../../utils/formatDate'
import { CiCircleMore } from 'react-icons/ci'
import FilterCard from '../../components/FilterCard'
import StatusBadge from '../../components/StatusBadge'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import AddButton from '../../components/AddButton'
import DsbUploadModal from './DsbUploadModal'
import { Btdata } from '../../constants/constants'

const DsbDashboard = () => {
  const [data, setData] = useState(Btdata)
  const [filteredData, setFilteredData] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('')
  const [reportDate, setReportDate] = useState('')

  const [isMainCardOpen, setIsMainOpen] = useState(true)
  const [isFilterCardOpen, setIsFilterCardOpen] = useState(true)
  const [pageCount, setPageCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const pageSize = 10

  const columns = useMemo(
    () => [
      { Header: t('Rapport'), accessor: 'report' },
      { Header: t('Fréquence'), accessor: 'frequency' },
      {
        Header: t('Date du rapport'),
        accessor: 'reportDate',
        Cell: ({ value }) => (value ? formatDate(value) : '-'),
      },
      {
        Header: t('Date de présentation'),
        accessor: 'submissionDate',
        Cell: ({ value }) => (value ? formatDate(value) : '-'),
      },
      {
        Header: t('Statut du rapport'),
        accessor: 'reportStatus',
        Cell: ({ value }) => <StatusBadge status={value || 'N/A'} type="smpWorkflow" />,
      },
      {
        Header: t("Statut d'envoi"),
        accessor: 'submissionStatus',
        Cell: ({ value }) => <StatusBadge status={value || 'N/A'} type="smpBkam" />,
      },
      {
        Header: t('Status de réception'),
        accessor: 'receivingStatus',
        Cell: ({ value }) => <StatusBadge status={value || 'N/A'} type="smpBkam" />,
      },
      {
        Header: t('Détails'),
        accessor: 'details',
        Cell: ({ row }) => {
          const { id } = row.original
          return (
            <Link to={`/csd/bt/Details/${id}`} state={{ data: row.original }}>
              <CButton size="sm" className="detail-button">
                <CiCircleMore size={24} />
              </CButton>
            </Link>
          )
        },
      },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount,
      initialState: { pageIndex: 0 },
    },
    usePagination,
  )

  const addReport = () => {
    setIsModalVisible(true)
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      //   const response = await getAllWorkflows({ page: pageIndex, size: pageSize })
      const response = {}
      const content = response?.content || []
      setData((prev) => [...prev, ...content])
      setFilteredData(content)
      setPageCount(response?.totalPages || 0)
    } catch (e) {
      console.error('Fetch error', e)
    } finally {
      setLoading(false)
    }
  }

  const handleAddReportSubmit = async ({ report, reportDate }) => {
    try {
      const createdWorkflow = await uploadDsbReport(report, reportDate)
      fetchData()
      navigate(`/dsbDetails/${createdWorkflow.id}`)
    } catch (err) {
      window.showToast(`Upload failed: ${err.message}`, 'error')
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageIndex])

  return (
    <div>
      <FilterCard
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onSearch={() => {}}
        isOpen={isFilterCardOpen}
        toggleOpen={() => setIsFilterCardOpen((prev) => !prev)}
      />
      <div className="card-container">
        <div className="card-header" onClick={() => setIsMainOpen((prev) => !prev)}>
          <h6>Table</h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="var(--cui-body-color)"
            style={{
              marginLeft: 'auto',
              transition: 'transform 1s',
              transform: isMainCardOpen ? 'rotate(90deg)' : 'rotate(0)',
            }}
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </div>

        <div className={`card-content ${isMainCardOpen ? 'open' : ''}`}>
          <div className="mb-4 flex justify-end">
            <AddButton onClick={addReport} label={t('Ajout Rapport')} />
          </div>
          <div>
            <table {...getTableProps()} className="table">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index}>
                    {headerGroup.headers.map((column, columnIndex) => (
                      <th key={columnIndex}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <tr key={row.id}>
                      {row.cells.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={() => gotoPage(pageIndex - 1)} disabled={pageIndex === 0}>
                {t('Précédent')}
              </button>
              <span>
                Page{' '}
                <strong>
                  {pageIndex + 1} {t('of')} {pageCount}
                </strong>
              </span>
              <button onClick={() => gotoPage(pageIndex + 1)} disabled={pageIndex >= pageCount - 1}>
                {t('Suivant')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <DsbUploadModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddReportSubmit}
        onRefresh={fetchData}
        setData={setData}
        data={data}
      />
    </div>
  )
}

export default DsbDashboard
