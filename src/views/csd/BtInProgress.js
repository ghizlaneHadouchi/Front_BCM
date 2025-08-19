import React, { useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { CSpinner } from '@coreui/react'
import Card from '../../components/Card.js'
import { BsTable } from 'react-icons/bs'
import { GoGraph } from 'react-icons/go'
import PieChart from '../../components/PieChart.js'
import TypeButton from '../../components/TypeButton.js'
import SearchButton from '../../components/SearchButton.js'

const BtInProgress = () => {
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
        'Nom du soumissionnaire': 'BAMIS',
        '05/06/25': 107,
        '12/06/25': 40,
        '19/06/25': 310.0,
        '26/06/25': '-',
        '03/07/25': 200.0,
        '10/07/25': '-',
        '17/07/25': 70,
        '24/07/25': '-',
        '31/07/25': 200,
        '07/08/25': 100.0,
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': 100,
        '18/09/25': 100,
        '25/09/25': 100,
        '16/10/25': 100,
        '06/11/25': 100,
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 1526.6,
        Répartition: '70.4%',
      },
      {
        'Nom du soumissionnaire': 'AUB',
        '05/06/25': 247,
        '12/06/25': 80,
        '19/06/25': 450,
        '26/06/25': 93,
        '03/07/25': '-',
        '10/07/25': '-',
        '17/07/25': '-',
        '24/07/25': '-',
        '31/07/25': '-',
        '07/08/25': '-',
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 870,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'ABM',
        '05/06/25': '-',
        '12/06/25': '-',
        '19/06/25': 100,
        '26/06/25': '-',
        '03/07/25': 200,
        '10/07/25': '-',
        '17/07/25': '-',
        '24/07/25': 20,
        '31/07/25': 100,
        '07/08/25': '-',
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 420,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'BMCI',
        '05/06/25': 706.7,
        '12/06/25': '-',
        '19/06/25': 953.0,
        '26/06/25': 173,
        '03/07/25': 200,
        '10/07/25': '-',
        '17/07/25': 300,
        '24/07/25': 320,
        '31/07/25': 240,
        '07/08/25': 113,
        '14/08/25': 250,
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': 200,
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 3456.1,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'BNM',
        '05/06/25': 100,
        '12/06/25': 100,
        '19/06/25': 110,
        '26/06/25': 100,
        '03/07/25': '-',
        '10/07/25': '-',
        '17/07/25': '-',
        '24/07/25': '-',
        '31/07/25': '-',
        '07/08/25': '-',
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 410,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'BMI',
        '05/06/25': 140,
        '12/06/25': '-',
        '19/06/25': 200,
        '26/06/25': 53,
        '03/07/25': '-',
        '10/07/25': '-',
        '17/07/25': 280,
        '24/07/25': '-',
        '31/07/25': '-',
        '07/08/25': '-',
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 673.3,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'SGM',
        '05/06/25': '-',
        '12/06/25': '-',
        '19/06/25': 300,
        '26/06/25': '-',
        '03/07/25': '-',
        '10/07/25': '-',
        '17/07/25': '-',
        '24/07/25': '-',
        '31/07/25': '-',
        '07/08/25': '-',
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 300,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'Sous -total (bancaires)',
        '05/06/25': 1300,
        '12/06/25': 220,
        '19/06/25': 2323,
        '26/06/25': 520,
        '03/07/25': 200,
        '10/07/25': 400,
        '17/07/25': '-',
        '24/07/25': '-',
        '31/07/25': 370,
        '07/08/25': 620,
        '14/08/25': 440,
        '21/08/25': 313,
        '28/08/25': 250,
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': 300,
        '13/11/25': 100,
        '20/11/25': 100,
        '11/12/25': '-',
        '14/05/26': 100,
        '28/05/26': 100,
        TOTAL: 7656,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'SNIM',
        '05/06/25': '-',
        '12/06/25': '-',
        '19/06/25': 300,
        '26/06/25': 200,
        '03/07/25': '-',
        '10/07/25': '-',
        '17/07/25': 140,
        '24/07/25': '-',
        '31/07/25': '-',
        '07/08/25': '-',
        '14/08/25': 200,
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 840,
        Répartition: '29.6%',
      },
      {
        'Nom du soumissionnaire': 'CNAM',
        '05/06/25': '-',
        '12/06/25': '-',
        '19/06/25': 150,
        '26/06/25': '-',
        '03/07/25': '-',
        '10/07/25': '-',
        '17/07/25': 30,
        '24/07/25': 130,
        '31/07/25': '-',
        '07/08/25': '-',
        '14/08/25': 111,
        '21/08/25': 100,
        '28/08/25': 80,
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 601,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'CNSS',
        '05/06/25': '-',
        '12/06/25': 70,
        '19/06/25': '-',
        '26/06/25': '-',
        '03/07/25': 100,
        '10/07/25': 20,
        '17/07/25': '-',
        '24/07/25': '-',
        '31/07/25': 100,
        '07/08/25': '-',
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': 200,
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 490,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'DAMANE SA',
        '05/06/25': '-',
        '12/06/25': 20,
        '19/06/25': '-',
        '26/06/25': '-',
        '03/07/25': '-',
        '10/07/25': 30,
        '17/07/25': '-',
        '24/07/25': '-',
        '31/07/25': '-',
        '07/08/25': '-',
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 50,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'CDD',
        '05/06/25': '-',
        '12/06/25': 60,
        '19/06/25': 20,
        '26/06/25': '-',
        '03/07/25': 200,
        '10/07/25': '-',
        '17/07/25': '-',
        '24/07/25': '-',
        '31/07/25': '-',
        '07/08/25': '-',
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 280,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'FGM',
        '05/06/25': '-',
        '12/06/25': '-',
        '19/06/25': 200,
        '26/06/25': '-',
        '03/07/25': '-',
        '10/07/25': '-',
        '17/07/25': '-',
        '24/07/25': '-',
        '31/07/25': '-',
        '07/08/25': '-',
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 200,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'FDG',
        '05/06/25': 257,
        '12/06/25': '-',
        '19/06/25': 100,
        '26/06/25': '-',
        '03/07/25': '-',
        '10/07/25': '-',
        '17/07/25': 287,
        '24/07/25': '-',
        '31/07/25': '-',
        '07/08/25': 120,
        '14/08/25': '-',
        '21/08/25': '-',
        '28/08/25': '-',
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 764,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'Sous -total (non bancaires)',
        '05/06/25': 574,
        '12/06/25': 150,
        '19/06/25': 820,
        '26/06/25': 200,
        '03/07/25': 200,
        '10/07/25': 30,
        '17/07/25': 457,
        '24/07/25': '-',
        '31/07/25': 100,
        '07/08/25': 120,
        '14/08/25': 311,
        '21/08/25': 100,
        '28/08/25': 280,
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': '-',
        '13/11/25': '-',
        '20/11/25': '-',
        '11/12/25': '-',
        '14/05/26': '-',
        '28/05/26': '-',
        TOTAL: 3180,
        Répartition: '-',
      },
      {
        'Nom du soumissionnaire': 'TOTAL',
        '05/06/25': 1874,
        '12/06/25': 370,
        '19/06/25': 3143,
        '26/06/25': 720,
        '03/07/25': 400,
        '10/07/25': 430,
        '17/07/25': 457,
        '24/07/25': '-',
        '31/07/25': 470,
        '07/08/25': 740,
        '14/08/25': 751,
        '21/08/25': 413,
        '28/08/25': 530,
        '11/09/25': '-',
        '18/09/25': '-',
        '25/09/25': '-',
        '16/10/25': '-',
        '06/11/25': 300,
        '13/11/25': 100,
        '20/11/25': 100,
        '11/12/25': '-',
        '14/05/26': 100,
        '28/05/26': 100,
        TOTAL: 10836,
        Répartition: '-',
      },
    ],
    [],
  )

  const otData = useMemo(
    () => [
      { value: 4, name: 'BNM' },
      { value: 6, name: 'MAURIPOST' },
      { value: 3, name: 'RCR2018' },
      { value: 8, name: 'RCR' },
      { value: 5, name: 'RCRP' },
      { value: 4, name: 'BPM' },
      { value: 0, name: 'SNIM' },
      { value: 3, name: 'BNM' },
      { value: 2, name: 'MAURIPOST' },
      { value: 7, name: 'RCR2018' },
      { value: 14, name: 'RCR' },
      { value: 8, name: 'RCRP' },
      { value: 4, name: 'BPM' },
      { value: 32, name: 'SNIM' },
    ],
    [],
  )

  const columnsTable = useMemo(
    () => [
      { Header: 'Nom du soumissionnaire', accessor: 'Nom du soumissionnaire' },
      { Header: '05/06/25', accessor: '05/06/25' },
      { Header: '12/06/25', accessor: '12/06/25' },
      { Header: '19/06/25', accessor: '19/06/25' },
      { Header: '26/06/25', accessor: '26/06/25' },
      { Header: '03/07/25', accessor: '03/07/25' },
      { Header: '10/07/25', accessor: '10/07/25' },
      { Header: '17/07/25', accessor: '17/07/25' },
      { Header: '24/07/25', accessor: '24/07/25' },
      { Header: '31/07/25', accessor: '31/07/25' },
      { Header: '07/08/25', accessor: '07/08/25' },
      { Header: '14/08/25', accessor: '14/08/25' },
      { Header: '21/08/25', accessor: '21/08/25' },
      { Header: '28/08/25', accessor: '28/08/25' },
      { Header: '11/09/25', accessor: '11/09/25' },
      { Header: '18/09/25', accessor: '18/09/25' },
      { Header: '25/09/25', accessor: '25/09/25' },
      { Header: '16/10/25', accessor: '16/10/25' },
      { Header: '06/11/25', accessor: '06/11/25' },
      { Header: '13/11/25', accessor: '13/11/25' },
      { Header: '20/11/25', accessor: '20/11/25' },
      { Header: '11/12/25', accessor: '11/12/25' },
      { Header: '14/05/26', accessor: '14/05/26' },
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
                  title="Détails BT En Cours"
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
          title="Répartition de l'encours des Bons du Trésor en %"
          isCardOpen={cardStates.dashboard}
          setIsCardOpen={() => toggleCard('dashboard')}
          content={<PieChart subtext="" data={otData} height="var(--chart-300)" />}
        />
      ) : shownData === 'table' ? (
        <Card
          title="BT en Cours"
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

export default BtInProgress
