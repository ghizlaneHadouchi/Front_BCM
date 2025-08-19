import React, { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
  CTooltip,
} from '@coreui/react'
import PropTypes from 'prop-types'
import {
  createIncident,
  getAllIncidents,
  getIncidentsByParticipants,
  getIncidentsBySeverityLevel,
  getIncidentsByStatus,
  getIncidentsBySystem,
  getIncidentsForTableDashboard,
  getTotalIncidentsAndNonResolvedByParticipants,
  updateIncident,
} from '../../hooks/incident.js'
import BasicLineChart from '../../components/BasicLineChart.js'
import DoubleBarChart from '../../components/DoubleBarChart.js'
import StackedLineChart from '../../components/StackedLineChart.js'
import Card from '../../components/Card.js'
import { FaInfoCircle, FaSearch } from 'react-icons/fa'
import { BsTable } from 'react-icons/bs'
import { GoGraph } from 'react-icons/go'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import Kpi from '../../components/Kpi.js'
import PieChart from '../../components/PieChart.js'
import LabeledField from '../../components/LabeledField.js'
import TypeButton from '../../components/TypeButton.js'
import SearchButton from '../../components/SearchButton.js'

const IncidentManagement = () => {
  const [cardStates, setCardStates] = useState({
    filter: true,
    table: true,
    dashboard: true,
    totalIncidents: true,
    incidentsByParticipant: true,
    totalAndNonSolvedByParticipant: true,
    incidentsDistribution: true,
  })
  const [shownData, setShownData] = useState('table')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [system, setSystem] = useState('')
  const [filteredIncidents, setFilteredIncidents] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isCorrectModalOpen, setIsCorrectModalOpen] = useState(false)
  const [correctionData, setCorrectionData] = useState({
    id: '',
    Status: '',
    ResolutionDescription: '',
    CorrectionDate: '',
  })
  const [formData, setFormData] = useState({
    reportedBy: '',
  reportedDate: '',
  incidentType: '',
  maxDeliveryDate: '', // You were missing this one
  system: '',
  severityLevel: '',
  description: '',
  status: '',
  assignedTo: '',
  resolutionDescription: '',
  correctionDate: '',
  })
  const toggleCard = (card) => setCardStates((prev) => ({ ...prev, [card]: !prev[card] }))
  const { dashboardData, isDashboardloading } = getIncidentsForTableDashboard()
  const incidentsByParticipants = getIncidentsByParticipants()
  const incidentsBySeverityLevel = getIncidentsBySeverityLevel()
  const incidentsByStatus = getIncidentsByStatus()
  const incidentsBySystem = getIncidentsBySystem()
  const totalIncidentsByPartipants = getTotalIncidentsAndNonResolvedByParticipants()
  const { incidents, isTableLoading } = getAllIncidents()

  const severityLevelPieChartData = useMemo(
    () =>
      incidentsBySeverityLevel.map((i) => {
        return {
          value: i.count,
          name: i.SeverityLevel,
        }
      }),
    [incidentsBySeverityLevel],
  )

  const statusPieChartData = useMemo(
    () =>
      incidentsByStatus.map((i) => {
        return {
          value: i.count,
          name: i.Status,
        }
      }),
    [incidentsByStatus],
  )

  const systemPieChartData = useMemo(
    () =>
      incidentsBySystem.map((i) => {
        return {
          value: i.count,
          name: i.System,
        }
      }),
    [incidentsBySystem],
  )

  const participantsPieChartData = useMemo(
    () =>
      totalIncidentsByPartipants.map((i) => {
        return {
          value: i.total_incidents,
          name: i.reportedBy,
        }
      }),
    [totalIncidentsByPartipants],
  )

  const clearCorrectionInputs = () => {
    setCorrectionData({
      id: '',
      Status: '',
      ResolutionDescription: '',
      CorrectionDate: '',
    })
  }

  const clearInputs = () => {
    setFormData({
      ReportedDate: '',
      Description: '',
      SeverityLevel: '',
      Status: '',
      IncidentType: '',
      ReportedBy: '',
      AssignedTo: '',
      ResolutionDescription: '',
      CorrectionDate: '',
      System: '',
    })
  }

  useEffect(() => {
    setFilteredIncidents(incidents)
  }, [incidents])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChangeCorrection = (e) => {
    const { name, value } = e.target
    setCorrectionData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    const createdIncident = await createIncident(formData)
    setFilteredIncidents((prev) => [...prev, createdIncident])
    setIsAddModalOpen(false)
    clearInputs()
  }

  const tableStats = dashboardData[0] || {}
  const {
    total_incidents_all_months: totalIncidentsAllMonths,
    resolved_count_all_months: resolvedCountAllMonths,
    // in_progress_count_all_months: inProgressCountAllMonths,
    non_resolved_count_all_months: nonResolvedCountAllMonths,
    // minor_severity_count_all_months: minorSeverityCountAllMonths,
    // major_severity_count_all_months: majorSeverityCountAllMonths,
    // critical_severity_count_all_months: criticalSeverityCountAllMonths,
  } = tableStats

  const columnsDashboard = useMemo(
    () => [
      { Header: 'Mois', accessor: 'month' },
      { Header: 'Nombre Incidents', accessor: 'total_incidents' },
      { Header: 'Incidents Résolus', accessor: 'resolved_count' },
      { Header: 'Incidents En Cours', accessor: 'in_progress_count' },
      { Header: 'Incidents Non Résolus', accessor: 'non_resolved_count' },
      { Header: 'Mineur', accessor: 'minor_severity_count' },
      { Header: 'Majeur', accessor: 'major_severity_count' },
      { Header: 'Critique', accessor: 'critical_severity_count' },
    ],
    [],
  )

  const columnsTable = useMemo(
    () => [
      { Header: 'Id', accessor: 'id' },
      { Header: 'Date de détection', accessor: 'reportedDate' },
      { Header: 'Date de Livraison Maximale', accessor: 'maxDeliveryDate' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Criticité', accessor: 'severityLevel' },
      { Header: 'Statut', accessor: 'status' },
      { Header: 'Système', accessor: 'system' },
      { Header: 'Participants', accessor: 'reportedBy' },
      { Header: 'Assigné À', accessor: 'assignedTo' },
      { Header: 'Description de résolution', accessor: 'resolutionDescription' },
      { Header: 'Date de correction', accessor: 'correctionDate' },
      { Header: 'Actions', accessor: 'actions' },
    ],
    [],
  )

  const tableData = useMemo(() => filteredIncidents, [filteredIncidents])

  const tableInstance = useTable(
    {
      columns: shownData === 'table' ? columnsTable : columnsDashboard,
      data: shownData === 'table' ? tableData : dashboardData,
      initialState: { pageIndex: 0, pageSize: 12 },
    },
    usePagination,
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
    gotoPage,
  } = tableInstance

  const basicLineChartData = useMemo(
    () => ({
      xAxisData: dashboardData.map((d) => d.month).sort((a, b) => new Date(a) - new Date(b)),
      seriesData: dashboardData.map((d) => d.total_incidents),
    }),
    [dashboardData],
  )

  const { xAxisData1, data1 } = useMemo(() => {
    const xAxisData = totalIncidentsByPartipants.map((i) => i.reportedBy)

    const data = ['total_incidents', 'non_resolved_count'].map((key, index) => ({
      name: ['Total Incidents', 'Incidents Non Résolus'][index],
      values: totalIncidentsByPartipants.map((i) => i[key]),
      color: ['#5c74cc', '#e66a68'][index],
    }))

    return { xAxisData1: xAxisData, data1: data }
  }, [totalIncidentsByPartipants])

  const stackedLineData = useMemo(() => {
    const xAxisData = [...new Set(incidentsByParticipants.map((d) => d.month))].sort(
      (a, b) => new Date(a) - new Date(b),
    )

    const legendData = [...new Set(incidentsByParticipants.map((i) => i.reportedBy))]

    const seriesData = legendData.map((reportedBy) => ({
      name: reportedBy,
      type: 'line',
      stack: 'Total',
      data: xAxisData.map((month) =>
        incidentsByParticipants
          .filter((i) => i.reportedBy === reportedBy && i.month === month)
          .reduce((sum, i) => sum + i.total_incidents, 0),
      ),
    }))

    return { xAxisData, legendData, seriesData }
  }, [incidentsByParticipants])

  const handleFilter = (e) => {
    e && e.preventDefault()

    const filtered = tableData.filter((item) => {
      const matchesSystem = system ? item.ReportedBy === system : true

      const matchesDateRange =
        startDate && endDate
          ? new Date(item.ReportedDate) >= new Date(startDate) &&
            new Date(item.ReportedDate) <= new Date(endDate)
          : true

      return matchesSystem && matchesDateRange
    })

    setFilteredIncidents(filtered)
  }

  const globalViewPieChart = useMemo(
    () => [
      { value: resolvedCountAllMonths, name: 'Résolus' },
      { value: nonResolvedCountAllMonths, name: 'Non Résolus' },
    ],
    [dashboardData],
  )

  const colors = useMemo(() => ['#32de84', '#D2122E'], [])

  const handleCorrectionSubmit = async (id, Status, CorrectionDate, ResolutionDescription) => {
    const updatedIncident = await updateIncident(id, Status, CorrectionDate, ResolutionDescription)

    setFilteredIncidents((prevIncidents) => {
      const incidentIndex = prevIncidents.findIndex((incident) => incident.id === id)
      if (incidentIndex !== -1) {
        const updatedIncidents = [...prevIncidents]
        updatedIncidents[incidentIndex] = {
          ...updatedIncidents[incidentIndex],
          Status: updatedIncident.Status,
          CorrectionDate: updatedIncident.CorrectionDate,
          ResolutionDescription: updatedIncident.ResolutionDescription,
        }
        return updatedIncidents
      }
      return prevIncidents
    })

    setIsCorrectModalOpen(false)
  }

  const systems = Array.from(new Set(tableData.map((t) => t.ReportedBy)))

  return (
    <div>
      <Card
        title="Filtre"
        isCardOpen={cardStates.filter}
        setIsCardOpen={() => toggleCard('filter')}
        content={
          <>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  placeholder="Système ..."
                  type="text"
                  list="système"
                  value={system}
                  onChange={(e) => setSystem(e.target.value)}
                  style={{ padding: '6px 10px' }}
                />
                <datalist id="système">
                  {systems.map((s) => (
                    <option key={s} value={s} />
                  ))}{' '}
                </datalist>

                <input
                  placeholder="De"
                  selected={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                />

                <input
                  placeholder="À"
                  selected={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                />
              </div>

              <SearchButton handleFilter={handleFilter} />
            </div>
            <hr />
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <TypeButton
                  Icon={<BsTable size={16} />}
                  onClick={() => setShownData('table')}
                  isSelected={shownData === 'table'}
                  title="Détails Incidents"
                />
                <TypeButton
                  Icon={<GoGraph size={16} />}
                  onClick={() => setShownData('graph')}
                  isSelected={shownData === 'graph'}
                  title="Reporting"
                />
              </div>
            </div>
          </>
        }
      />
      {!isDashboardloading && shownData === 'graph' ? (
        <>
          <Card
            title="Dashboard Incidents"
            isCardOpen={cardStates.dashboard}
            setIsCardOpen={() => toggleCard('dashboard')}
            content={
              <>
                <CRow>
                  <CCol xs={3}>
                    <Kpi title="Nombre Total Incidents" data={totalIncidentsAllMonths} />
                    <Kpi
                      title="Nombre Total Incidents Non Résolus"
                      data={nonResolvedCountAllMonths}
                    />
                  </CCol>

                  <CCol xs={3}>
                    <Kpi title="Nombre Total Incidents Résolus" data={resolvedCountAllMonths} />
                    <Kpi title="Temps de Résolution Moyen (par jour)" data="1" />
                  </CCol>
                  <CCol xs={6}>
                    <PieChart
                      subtext=""
                      data={globalViewPieChart}
                      isLegendShown={false}
                      colors={colors}
                      isLabelShown={true}
                    />
                  </CCol>
                </CRow>
                <div style={{ display: 'flex' }}></div>

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
                    {page.map((row, rowIndex) => {
                      prepareRow(row)
                      return (
                        <React.Fragment key={row.id || rowIndex}>
                          {(() => {
                            const { key, ...rowProps } = row.getRowProps()
                            return (
                              <>
                                <tr key={key} {...rowProps}>
                                  {row.cells.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell.render('Cell')}</td>
                                  ))}
                                </tr>
                              </>
                            )
                          })()}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
                <div className="pagination">
                  <button onClick={previousPage} disabled={!canPreviousPage}>
                    Précédent
                  </button>
                  <span>
                    Page {pageIndex + 1} of {pageOptions.length}
                  </span>
                  <button onClick={nextPage} disabled={!canNextPage}>
                    Suivant
                  </button>
                </div>
              </>
            }
          />
          <Card
            title="Total Incidents"
            isCardOpen={cardStates.totalIncidents}
            setIsCardOpen={() => toggleCard('totalIncidents')}
            content={
              <BasicLineChart
                xAxisData={basicLineChartData.xAxisData}
                seriesData={basicLineChartData.seriesData}
              />
            }
          />
          <Card
            title="Total Incidents par Participants"
            isCardOpen={cardStates.incidentsByParticipant}
            setIsCardOpen={() => toggleCard('incidentsByParticipant')}
            content={
              <StackedLineChart
                legendData={stackedLineData.legendData}
                xAxisData={stackedLineData.xAxisData}
                seriesData={stackedLineData.seriesData}
              />
            }
          />
          <Card
            title="Total Incidents et Incidents Non Résolus par Participants"
            isCardOpen={cardStates.totalAndNonSolvedByParticipant}
            setIsCardOpen={() => toggleCard('totalAndNonSolvedByParticipant')}
            content={<DoubleBarChart xAxisData={xAxisData1} data={data1} />}
          />
          <Card
            title="Répartition des Incidents"
            isCardOpen={cardStates.incidentsDistribution}
            setIsCardOpen={() => toggleCard('incidentsDistribution')}
            content={
              <CRow>
                <CCol xs={6}>
                  <PieChart subtext="" data={severityLevelPieChartData} height="var(--chart-300)" />
                </CCol>
                <CCol xs={6}>
                  <PieChart subtext="" data={statusPieChartData} height="var(--chart-300)" />
                </CCol>
                <CCol xs={6}>
                  <PieChart subtext="" data={participantsPieChartData} height="var(--chart-300)" />
                </CCol>
                <CCol xs={6}>
                  <PieChart subtext="" data={systemPieChartData} height="var(--chart-300)" />
                </CCol>
              </CRow>
            }
          />
        </>
      ) : !isTableLoading && shownData === 'table' ? (
        <Card
          title="Liste Des Incidents"
          isCardOpen={cardStates.table}
          setIsCardOpen={() => toggleCard('table')}
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsAddModalOpen(true)
                }}
                style={{
                  borderRadius: 20,
                  backgroundColor: 'var(--nup-mid-blue)',
                  color: 'var(--nup-white)',
                  marginRight: 10,
                  maxWidth: 100,
                  alignSelf: 'flex-end',
                }}
              >
                + Ajouter
              </button>
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
                    {page.map((row, rowIndex) => {
                      prepareRow(row)
                      return (
                        <React.Fragment key={row.id || rowIndex}>
                          {(() => {
                            const { key, ...rowProps } = row.getRowProps()
                            return (
                              <>
                                <tr key={key} {...rowProps}>
                                  {row.cells.map((cell, cellIndex) => (
                                    <td key={cellIndex}>
                                      {cell.column.id === 'Description' ||
                                      cell.column.id === 'ResolutionDescription' ? (
                                        <CTooltip content={<div>{cell.value}</div>} placement="top">
                                          <span>
                                            <FaInfoCircle style={{ cursor: 'pointer' }} />
                                          </span>
                                        </CTooltip>
                                      ) : cell.column.id === 'actions' &&
                                        row.original.Status !== 'Résolu' ? (
                                        <button
                                          onClick={() => {
                                            setIsCorrectModalOpen(true)
                                            setCorrectionData({
                                              id: row.original.id,
                                              Status: 'Résolu',
                                              CorrectionDate: row.original.CorrectionDate,
                                              ResolutionDescription:
                                                row.original.ResolutionDescription || '',
                                            })
                                          }}
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            border: '1px solid green',
                                            backgroundColor: 'rgba(0,245,0,0.2)',
                                            color: 'green',
                                            borderRadius: 10,
                                          }}
                                        >
                                          <IoIosCheckmarkCircleOutline size={18} />
                                          <span>Fixer</span>
                                        </button>
                                      ) : (
                                        cell.render('Cell')
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              </>
                            )
                          })()}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
                <div className="pagination">
                  <button onClick={previousPage} disabled={!canPreviousPage}>
                    Précédent
                  </button>
                  <span>
                    Page{' '}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>
                  </span>
                  <button onClick={nextPage} disabled={!canNextPage}>
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          }
        />
      ) : (
        <CSpinner />
      )}
      <CModal size="lg" visible={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Ajout Incident</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <LabeledField
              label="Date de détection"
              name="reportedDate"
              type="date"
              value={formData.reportedDate}
              onChange={handleChange}
            />
            <LabeledField
              label="Assigné À"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
            />
            <LabeledField
              label="Statut"
              name="status"
              isSelect={true}
              options={[
                { label: '', value: '', disabled: true },
                {
                  label: 'Résolue',
                  value: 'résolue',
                },
                {
                  label: 'Non Résolue',
                  value: 'non résolue',
                },
                {
                  label: 'En Cours',
                  value: 'en cours',
                },
              ]}
              value={formData.status}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <LabeledField
              label="Date de correction"
              name="correctionDate"
              type="date"
              value={formData.correctionDate}
              onChange={handleChange}
            />
            <LabeledField
              label="Participant"
              name="reportedBy"
              value={formData.reportedBy}
              onChange={handleChange}
            />
            <LabeledField
              label="Criticité"
              name="severityLevel"
              value={formData.severityLevel}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <LabeledField
              label="Type d'Incident"
              name="incidentType"
              isSelect={true}
              options={[
                { label: '', value: '', disabled: true },
                {
                  label: 'Retard Service',
                  value: 'Retard Service',
                },
                {
                  label: 'Fraude',
                  value: 'Fraude',
                },
                {
                  label: 'Défaillance du Système',
                  value: 'défaillance du système',
                },
              ]}
              value={formData.incidentType}
              onChange={handleChange}
            />
            <LabeledField
              label="Système"
              name="system"
              value={formData.system}
              onChange={handleChange}
            />
            <LabeledField
              label="Description de Résolution"
              name="resolutionDescription"
              isTextArea={true}
              value={formData.resolutionDescription}
              onChange={handleChange}
            />
          </div>
          <LabeledField
            label="Description"
            name="description"
            isTextArea={true}
            value={formData.description}
            onChange={handleChange}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsAddModalOpen(false)}>
            Fermer
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Confirmer
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal size="lg" visible={isCorrectModalOpen} onClose={() => setIsCorrectModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Correction Incident</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: 10 }}>
            <LabeledField
              label="Date de correction"
              name="CorrectionDate"
              type="date"
              value={correctionData.CorrectionDate}
              onChange={handleChangeCorrection}
            />
            <LabeledField
              label="Description de Résolution"
              name="ResolutionDescription"
              isTextArea={true}
              value={correctionData.ResolutionDescription}
              onChange={handleChangeCorrection}
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setIsCorrectModalOpen(false)
              clearCorrectionInputs()
            }}
          >
            Fermer
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              handleCorrectionSubmit(
                correctionData.id,
                correctionData.Status,
                correctionData.CorrectionDate,
                correctionData.ResolutionDescription,
              )
            }
          >
            Confirmer
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

IncidentManagement.propTypes = {
  row: PropTypes.object,
}

export default IncidentManagement
