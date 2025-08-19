import React, { useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { CSpinner } from '@coreui/react'
import Card from '../../components/Card.js'
import { BsTable } from 'react-icons/bs'
import { GoGraph } from 'react-icons/go'
import PieChart from '../../components/PieChart.js'
import TypeButton from '../../components/TypeButton.js'
import SearchButton from '../../components/SearchButton.js'

const BitInProgress = () => {
  const [cardStates, setCardStates] = useState({
    filter: true,
    table: true,
    dashboard: true,
  })
  const [shownData, setShownData] = useState('table')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [system, setSystem] = useState('')
  const toggleCard = (card) => setCardStates((prev) => ({ ...prev, [card]: !prev[card] }))

  const tableData = useMemo(
    () => [
      {
        'Nom du soumissionnaire': 'BPM',
        '26/06/25': 600,
        '31/07/25': '-',
        '28/08/25': 187.5,
        '25/09/25': '-',
        '27/10/25': 20,
        '27/11/25': 210,
        '26/02/26': '-',
        '27/04/26': 248.6,
        '28/05/26': '-',
        TOTAL: 1266.1,
        Répartition: '37%',
      },
      {
        'Nom du soumissionnaire': 'BAMIS',
        '26/06/25': '-',
        '31/07/25': '-',
        '28/08/25': 100,
        '25/09/25': 60,
        '27/10/25': '-',
        '27/11/25': '-',
        '26/02/26': '-',
        '27/04/26': '-',
        '28/05/26': '-',
        TOTAL: 160.0,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'Sous -total (bancaires)',
        '26/06/25': 600,
        '31/07/25': '-',
        '28/08/25': 288,
        '25/09/25': 60,
        '27/10/25': 20,
        '27/11/25': 210,
        '26/02/26': '-',
        '27/04/26': 249,
        '28/05/26': '-',
        TOTAL: 1426,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'SNIM',
        '26/06/25': 600,
        '31/07/25': 500,
        '28/08/25': '-',
        '25/09/25': 380,
        '27/10/25': '-',
        '27/11/25': 230,
        '26/02/26': '-',
        '27/04/26': '-',
        '28/05/26': 100,
        TOTAL: 1810.0,
        Répartition: '63%',
      },
      {
        'Nom du soumissionnaire': 'DAMANE SA',
        '26/06/25': '-',
        '31/07/25': '-',
        '28/08/25': '-',
        '25/09/25': 20,
        '27/10/25': '-',
        '27/11/25': '-',
        '26/02/26': '-',
        '27/04/26': '-',
        '28/05/26': '-',
        TOTAL: 20.0,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'MAURIPOST',
        '26/06/25': '-',
        '31/07/25': '-',
        '28/08/25': 40,
        '25/09/25': 40,
        '27/10/25': 60,
        '27/11/25': '-',
        '26/02/26': '-',
        '27/04/26': '-',
        '28/05/26': '-',
        TOTAL: 140.0,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'RCR',
        '26/06/25': 50,
        '31/07/25': '-',
        '28/08/25': 50,
        '25/09/25': '-',
        '27/10/25': '-',
        '27/11/25': '-',
        '26/02/26': 6,
        '27/04/26': '-',
        '28/05/26': '-',
        TOTAL: 106.0,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'RCR2018',
        '26/06/25': '-',
        '31/07/25': '-',
        '28/08/25': 2.5,
        '25/09/25': '-',
        '27/10/25': '-',
        '27/11/25': '-',
        '26/02/26': '-',
        '27/04/26': 15.4,
        '28/05/26': '-',
        TOTAL: 17.9,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'RCRP',
        '26/06/25': 20,
        '31/07/25': '-',
        '28/08/25': 60,
        '25/09/25': '-',
        '27/10/25': 120,
        '27/11/25': '-',
        '26/02/26': 100,
        '27/04/26': 65,
        '28/05/26': '-',
        TOTAL: 365.0,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'Sous -total (non bancaires)',
        '26/06/25': 670,
        '31/07/25': 500,
        '28/08/25': 113,
        '25/09/25': 440,
        '27/10/25': 160,
        '27/11/25': 290,
        '26/02/26': 100,
        '27/04/26': 86,
        '28/05/26': 100,
        TOTAL: 2459,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'TOTAL',
        '26/06/25': 1270,
        '31/07/25': 500,
        '28/08/25': 400,
        '25/09/25': 500,
        '27/10/25': 180,
        '27/11/25': 500,
        '26/02/26': 100,
        '27/04/26': 335,
        '28/05/26': 100,
        TOTAL: 3885.0,
        Répartition: '',
      },
    ],
    [],
  )

  const otData = useMemo(
    () => [
      { value: 0, name: 'DAMANE SA' },
      { value: 4, name: 'MAURIPOST' },
      { value: 0, name: 'RCR2018' },
      { value: 3, name: 'RCR' },
      { value: 10, name: 'RCRP' },
      { value: 34, name: 'BPM' },
      { value: 49, name: 'SNIM' },
    ],
    [],
  )

  const columnsTable = useMemo(
    () => [
      { Header: 'Nom du soumissionnaire', accessor: 'Nom du soumissionnaire' },
      { Header: '26/06/25', accessor: '26/06/25' },
      { Header: '31/07/25', accessor: '31/07/25' },
      { Header: '28/08/25', accessor: '28/08/25' },
      { Header: '25/09/25', accessor: '25/09/25' },
      { Header: '27/10/25', accessor: '27/10/25' },
      { Header: '27/11/25', accessor: '27/11/25' },
      { Header: '26/02/26', accessor: '26/02/26' },
      { Header: '27/04/26', accessor: '27/04/26' },
      { Header: '28/05/26', accessor: '28/05/26' },
      { Header: 'TOTAL', accessor: 'TOTAL' },
      { Header: 'Répartition', accessor: 'Répartition' },
    ],
    [],
  )

  const tableInstance = useTable(
    {
      columns: columnsTable,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 12 },
    },
    usePagination,
  )

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } = tableInstance

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
                {/* <input
                  placeholder="Soumissionaire ..."
                  type="text"
                  list="système"
                  value={system}
                  onChange={(e) => setSystem(e.target.value)}
                  style={{ padding: '6px 10px' }}
                />
                <datalist id="système">
                  {systems.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist> */}

                <input
                  placeholder="De"
                  selected={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  style={{ padding: '6px 10px' }}
                />

                <input
                  placeholder="À"
                  selected={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  style={{ padding: '6px 10px' }}
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
                  title="Détails BIT En Cours"
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
      {shownData === 'graph' ? (
        <Card
          title="Répartition de l'encours des Bons Islamiques du Trésor en %"
          isCardOpen={cardStates.dashboard}
          setIsCardOpen={() => toggleCard('dashboard')}
          content={<PieChart subtext="" data={otData} height="var(--chart-300)" />}
        />
      ) : shownData === 'table' ? (
        <Card
          title="BIT en Cours"
          isCardOpen={cardStates.table}
          setIsCardOpen={() => toggleCard('table')}
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                    const { key, ...rowProps } = row.getRowProps()
                    const rowLabel = row.original['Nom du soumissionnaire']
                    const rowClass = rowLabel?.includes('Sous -total')
                      ? 'bg-light-gray'
                      : rowLabel === 'TOTAL'
                        ? 'bg-light-green'
                        : ''

                    return (
                      <React.Fragment key={row.id || rowIndex}>
                        <tr key={key} {...rowProps} className={rowClass}>
                          {row.cells.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell.render('Cell')}</td>
                          ))}
                        </tr>
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          }
        />
      ) : (
        <CSpinner />
      )}
    </div>
  )
}

export default BitInProgress
