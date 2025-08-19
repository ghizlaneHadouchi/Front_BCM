import React, { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { CCol, CRow } from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'
import { achData, achDataDetailed } from '../../../lists/achData.js'
import Kpi from '../../../components/Kpi.js'
// import SimpleBarChart from '../../../components/SimpleBarChart.js'
import DoubleBarChart from '../../../components/DoubleBarChart.js'
import PieChart from '../../../components/PieChart.js'
import MixedLineBarChart from '../../../components/MixedLineBarChart.js'
import { PiExportBold } from 'react-icons/pi'
import { handleDownloadExcel } from '../../../utils/DownloadExcel.js'

const Dashboard = () => {
  const [isMainCardOpen, setIsMainCardOpen] = useState(true)
  const [isDashboardCardOpen, setIsDashboardCardOpen] = useState(true)
  const [isDashboardCardOpen1, setIsDashboardCardOpen1] = useState(true)
  const [isDashboardCardOpen2, setIsDashboardCardOpen2] = useState(true)
  const [isDashboardCardOpen3, setIsDashboardCardOpen3] = useState(true)
  const [isDashboardCardOpen4, setIsDashboardCardOpen4] = useState(true)
  const [selectedParticipant, setSelectedParticipant] = useState('all')
  const [shownData, setShownData] = useState([])

  useEffect(() => {
    const participantData = achDataDetailed[selectedParticipant]

    if (selectedParticipant === 'all') {
      setShownData(data)
    } else if (participantData) {
      const { months, percentage } = participantData

      const formattedData = Object.keys(months).map((month) => ({
        month,
        nbTransfers: months[month].nbTransfers,
        amount: months[month].amount,
        failedTransfers: months[month].failedTransfers,
        '%nbTransfers': percentage.nbTransfers,
        '%amount': percentage.amount,
        '%failed': percentage.failedTransfers,
      }))

      setShownData(formattedData)
    }
  }, [selectedParticipant])

  const data = achData
  const detailedData = achDataDetailed

  const titleStyle = {
    textAlign: 'center',
    flex: 1,
  }

  const columns = useMemo(
    () => [
      { Header: 'Mois', accessor: 'month' },
      { Header: 'Nbr Transferts', accessor: 'nbTransfers' },
      { Header: '% Nb Transferts', accessor: '%nbTransfers' },
      { Header: 'Montant', accessor: 'amount' },
      { Header: '% Montant', accessor: '%amount' },
      { Header: 'Transferts Rejetés', accessor: 'failedTransfers' },
      { Header: '% Rejetés', accessor: '%failed' },
      // { Header: 'Failure Reason Details', accessor: 'failureReasonDetails' },
    ],
    [],
  )

  // const dataForChart = [
  //   { x: 'Fonds Insuffisants', y: 35 },
  //   { x: 'Erreur Techniques', y: 28 },
  //   { x: 'Info Incorrectes', y: 15 },
  //   { x: 'Autre', y: 30 },
  // ]

  const data1 = useMemo(
    () => [
      {
        name: '',
        values: [35, 28, 15, 30],
        color: 'orange',
      },
    ],
    [],
  )

  const xAxisData1 = useMemo(
    () => ['Fonds Insuffisants', 'Erreur Techniques', 'Info Incorrectes', 'Autre'],
    [],
  )

  const data2 = useMemo(
    () => [
      {
        name: 'Virements rejetés',
        values: shownData.map((d) => d.failedTransfers),
        color: 'red',
      },
      {
        name: 'Virements émis',
        values: shownData.map((d) => d.nbTransfers),
        color: 'blue',
      },
    ],
    [shownData],
  )

  const xAxisData2 = useMemo(
    () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [],
  )

  const data3 = useMemo(
    () => [
      {
        name: '',
        values: [
          1600, 2300, 900, 1100, 800, 700, 1200, 1000, 1400, 1300, 1600, 1400, 800, 110, 700, 1200,
          1300, 600,
        ],
        color: '#89CFF0',
      },
    ],
    [],
  )

  const xAxisData3 = useMemo(
    () => [
      'BPN',
      'SGM',
      'Chinguitty Bank',
      'Orabank Mauritanie',
      'BEA',
      'AUB',
      'BAMIS',
      'BGM',
      'BCI',
      'BMCI',
      'BNM',
      'NBM',
      'BIM',
      'ABM',
      'BPM',
      'IBM',
      'BMI',
      'BFI',
    ],
    [],
  )

  const pieChartData = useMemo(
    () => [
      { value: 1048, name: 'BNP' },
      { value: 735, name: 'SGM' },
      { value: 580, name: 'Chinguitty Bank' },
      { value: 484, name: 'Orabank Mauritanie' },
      { value: 300, name: 'BEA' },
      { value: 300, name: 'AUB' },
      { value: 300, name: 'BAMIS' },
      { value: 300, name: 'GBM' },
      { value: 300, name: 'Autre' },
    ],

    [],
  )

  const colors = useMemo(() => ['#32de84', '#D2122E'], [])

  const globalViewPieChart = useMemo(
    () => [
      { value: 99, name: 'Executés' },
      { value: 1, name: 'Rejetés' },
    ],
    [],
  )

  const mixedLineBarChartData = useMemo(() => {
    const barData = shownData.map((d) => Number(d.nbTransfers))
    const barMin = 0
    const barMax = Math.ceil(Math.max(...barData) * 1.1)
    const barInterval = Math.ceil(barMax / 10)

    const lineData = shownData.map((d) =>
      Number(String(d.amount).replace(/,/g, '').replace(/\..*/g, '')),
    )
    const lineMin = 0
    const lineMax = Math.ceil(Math.max(...lineData) * 1.1)
    const lineInterval = Math.ceil(lineMax / 10)

    return {
      xAxisData: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      barData,
      lineData,
      barName: 'Nbr Transferts',
      lineName: 'Amount',
      barYAxis: {
        name: 'Nbr Transferts',
        min: barMin,
        max: barMax,
        interval: barInterval,
      },
      lineYAxis: {
        name: 'Amount',
        min: lineMin,
        max: lineMax,
        interval: lineInterval,
      },
    }
  }, [shownData])

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
  } = useTable(
    { columns, data: shownData, initialState: { pageIndex: 0, pageSize: 12 } },
    usePagination,
  )

  const downloadExcel = (e) => {
    e.stopPropagation()
    const columnMapping = columns.reduce((acc, col) => {
      acc[col.accessor] = col.Header
      return acc
    }, {})

    const formattedData = shownData.map((d) => {
      const transformed = {}
      Object.keys(d).forEach((key) => {
        if (columnMapping[key]) {
          transformed[columnMapping[key]] = d[key]
        }
      })
      return transformed
    })
    handleDownloadExcel(formattedData, `Virement-${selectedParticipant}`)
  }

  // console.log(
  //   shownData.reduce(
  //     (acc, val) => {
  //       acc.amount += parseFloat(val.amount.replace(/,/g, '')) || 0
  //       acc.nbTransfers += parseFloat(val.nbTransfers) || 0
  //       return acc
  //     },
  //     { amount: 0, nbTransfers: 0 },
  //   ),
  // )

  return (
    <div>
      <div className="card-container">
        <div className="card-header" onClick={() => setIsMainCardOpen((prev) => !prev)}>
          <select
            style={{
              textAlign: 'center',
              margin: 'auto',
              padding: '4px 8px',
              fontWeight: 'bold',
              fontSize: 16,
            }}
            value={selectedParticipant}
            onChange={(e) => setSelectedParticipant(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="all">Vue Globale</option>
            {Object.keys(detailedData).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <div>
            <PiExportBold
              color="green"
              title="exporter l'excel"
              onClick={downloadExcel}
              style={{ cursor: 'pointer', marginLeft: 'auto', marginRight: 20 }}
              size={20}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="var(--cui-body-color)"
              style={{
                transition: 'transform 1s',
                transform: isMainCardOpen ? 'rotate(90deg)' : 'rotate(0)',
              }}
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </div>
        </div>
        <div className={`card-content ${isMainCardOpen ? 'open' : ''}`}>
          <CRow>
            <CCol xs={3}>
              <Kpi title="Virement éxecutés" data="231337" />
              <Kpi title="Volume virement éxecutés (RMU)" data="106470195.00" />
            </CCol>
            <CCol xs={3}>
              <Kpi title="Tot RIB Unique" data="77112" />
              <Kpi title="RIB Emetteur" data="25704" />
            </CCol>
            <CCol xs={3}>
              <Kpi title="Montant moyen de Virements" data="460.23" />
              <Kpi title="RIB Bénéficiare" data="51,408" />
            </CCol>
            <CCol
              xs={3}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <div
                style={{
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  height: 120,
                  width: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid gray',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  borderRadius: 999,
                }}
              >
                <span>Taux de rejeté vrmt:</span>
                <h6>1%</h6>
              </div> */}
              <PieChart
                subtext=""
                data={globalViewPieChart}
                isLegendShown={false}
                colors={colors}
                isLabelShown={true}
              />
            </CCol>
          </CRow>
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
      </div>
      <div style={{ display: 'flex', gap: 20, overflow: 'auto' }}>
        <div className="card-container" style={{ flex: 1 }}>
          <div className="card-header" onClick={() => setIsDashboardCardOpen((prev) => !prev)}>
            <h6 style={titleStyle}>Répartition des Virements Rejetés par Cause</h6>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="var(--cui-body-color)"
              style={{
                transition: 'transform 1s',
                transform: isDashboardCardOpen ? 'rotate(90deg)' : 'rotate(0)',
              }}
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </div>
          <div className={`card-content ${isDashboardCardOpen ? 'open' : ''}`}>
            <DoubleBarChart xAxisData={xAxisData1} data={data1} />
          </div>
        </div>
        <div className="card-container" style={{ flex: 1 }}>
          <div className="card-header" onClick={() => setIsDashboardCardOpen1((prev) => !prev)}>
            <h6 style={titleStyle}>Évolution Mensuelle des Virements Émis/Rejetés</h6>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="var(--cui-body-color)"
              style={{
                marginLeft: 'auto',
                transition: 'transform 1s',
                transform: isDashboardCardOpen1 ? 'rotate(90deg)' : 'rotate(0)',
              }}
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </div>
          <div className={`card-content ${isDashboardCardOpen1 ? 'open' : ''}`}>
            <DoubleBarChart xAxisData={xAxisData2} data={data2} />
          </div>
        </div>
      </div>
      {selectedParticipant === 'all' && (
        <div style={{ display: 'flex', gap: 20, overflow: 'auto' }}>
          <div className="card-container" style={{ flex: 1 }}>
            <div className="card-header" onClick={() => setIsDashboardCardOpen2((prev) => !prev)}>
              <h6 style={titleStyle}>Total de transferts par institution</h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="var(--cui-body-color)"
                style={{
                  marginLeft: 'auto',
                  transition: 'transform 1s',
                  transform: isDashboardCardOpen2 ? 'rotate(90deg)' : 'rotate(0)',
                }}
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </div>
            <div className={`card-content ${isDashboardCardOpen2 ? 'open' : ''}`}>
              <DoubleBarChart xAxisData={xAxisData3} data={data3} />
            </div>
          </div>
          <div className="card-container" style={{ flex: 1 }}>
            <div className="card-header" onClick={() => setIsDashboardCardOpen3((prev) => !prev)}>
              <h6 style={titleStyle}>Taux de participation par Banque</h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="var(--cui-body-color)"
                style={{
                  marginLeft: 'auto',
                  transition: 'transform 1s',
                  transform: isDashboardCardOpen3 ? 'rotate(90deg)' : 'rotate(0)',
                }}
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </div>
            <div className={`card-content ${isDashboardCardOpen3 ? 'open' : ''}`}>
              <PieChart subtext="" data={pieChartData} height="var(--chart-300)" />
            </div>
          </div>
        </div>
      )}
      <div className="card-container">
        <div className="card-header" onClick={() => setIsDashboardCardOpen4((prev) => !prev)}>
          <h6 style={titleStyle}>Nbr Transferts et Montants par Mois</h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="var(--cui-body-color)"
            style={{
              marginLeft: 'auto',
              transition: 'transform 1s',
              transform: isDashboardCardOpen4 ? 'rotate(90deg)' : 'rotate(0)',
            }}
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </div>
        <div className={`card-content ${isDashboardCardOpen4 ? 'open' : ''}`}>
          <MixedLineBarChart
            xAxisData={mixedLineBarChartData.xAxisData}
            barData={mixedLineBarChartData.barData}
            lineData={mixedLineBarChartData.lineData}
            barName={mixedLineBarChartData.barName}
            lineName={mixedLineBarChartData.lineName}
            barYAxis={mixedLineBarChartData.barYAxis}
            lineYAxis={mixedLineBarChartData.lineYAxis}
          />
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  row: PropTypes.object,
}

export default Dashboard
