import React, { useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { CSpinner } from '@coreui/react'
import Card from '../../components/Card.js'
import { BsTable } from 'react-icons/bs'
import { GoGraph } from 'react-icons/go'
import PieChart from '../../components/PieChart.js'
import TypeButton from '../../components/TypeButton.js'
import SearchButton from '../../components/SearchButton.js'

const OtInProgress = () => {
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
        '02/11/25': 60,
        '27/06/26': 60,
        '17/10/26': 100,
        '29/08/27': 220,
        '13/03/28': 74,
        '13/03/29': 0,
        '13/03/30': 0,
        TOTAL: 220,
        Répartition: '74%',
      },
      {
        'Nom du soumissionnaire': 'BEA',
        '02/11/25': 0,
        '27/06/26': 25,
        '17/10/26': 0,
        '29/08/27': 0,
        '13/03/28': 0,
        '13/03/29': 0,
        '13/03/30': 25,
        TOTAL: 25,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'BMI',
        '02/11/25': 240,
        '27/06/26': 100,
        '17/10/26': 0,
        '29/08/27': 340,
        '13/03/28': 0,
        '13/03/29': 0,
        '13/03/30': 0,
        TOTAL: 340,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'BNM',
        '02/11/25': 175,
        '27/06/26': 100,
        '17/10/26': 0,
        '29/08/27': 275,
        '13/03/28': 0,
        '13/03/29': 0,
        '13/03/30': 0,
        TOTAL: 275,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'BPM',
        '02/11/25': 500,
        '27/06/26': 1500,
        '17/10/26': 1500,
        '29/08/27': 0,
        '13/03/28': 3500,
        '13/03/29': 0,
        '13/03/30': 0,
        TOTAL: 3500,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'Sous -total (bancaires)',
        '02/11/25': 0,
        '27/06/26': 500,
        '17/10/26': 1500,
        '29/08/27': 1500,
        '13/03/28': 500,
        '13/03/29': 260,
        '13/03/30': 100,
        TOTAL: 4360,
        Répartition: '74%',
      },
      {
        'Nom du soumissionnaire': 'CNAM',
        '02/11/25': 300,
        '27/06/26': 0,
        '17/10/26': 0,
        '29/08/27': 0,
        '13/03/28': 0,
        '13/03/29': 400,
        '13/03/30': 0,
        TOTAL: 700,
        Répartition: '26%',
      },
      {
        'Nom du soumissionnaire': 'CNSS',
        '02/11/25': 100,
        '27/06/26': 0,
        '17/10/26': 0,
        '29/08/27': 0,
        '13/03/28': 0,
        '13/03/29': 0,
        '13/03/30': 0,
        TOTAL: 100,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'CDD',
        '02/11/25': 0,
        '27/06/26': 0,
        '17/10/26': 0,
        '29/08/27': 0,
        '13/03/28': 0,
        '13/03/29': 200,
        '13/03/30': 0,
        TOTAL: 200,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'SNIM',
        '02/11/25': 0,
        '27/06/26': 0,
        '17/10/26': 0,
        '29/08/27': 0,
        '13/03/28': 500,
        '13/03/29': 0,
        '13/03/30': 0,
        TOTAL: 500,
        Répartition: '',
      },
      {
        'Nom du soumissionnaire': 'Sous -total (non bancaires)',
        '02/11/25': 400,
        '27/06/26': 0,
        '17/10/26': 0,
        '29/08/27': 0,
        '13/03/28': 0,
        '13/03/29': 200,
        '13/03/30': 900,
        TOTAL: 1500,
        Répartition: '26%',
      },
      {
        'Nom du soumissionnaire': 'TOTAL',
        '02/11/25': 400,
        '27/06/26': 500,
        '17/10/26': 1500,
        '29/08/27': 1500,
        '13/03/28': 500,
        '13/03/29': 460,
        '13/03/30': 1000,
        TOTAL: 5860,
        Répartition: '',
      },
    ],
    [],
  )

  const otData = useMemo(
    () => [
      { value: 12, name: 'CNAM' },
      { value: 2, name: 'CNSS' },
      { value: 3, name: 'CDD' },
      { value: 8, name: 'SNIM' },
      { value: 4, name: 'BAMIS' },
      { value: 0, name: 'BEA' },
      { value: 6, name: 'BMI' },
      { value: 5, name: 'BNM' },
      { value: 60, name: 'BPM' },
    ],
    [],
  )

  const columnsTable = useMemo(
    () => [
      { Header: 'Nom du soumissionnaire', accessor: 'Nom du soumissionnaire' },
      { Header: '02/11/25', accessor: '02/11/25' },
      { Header: '27/06/26', accessor: '27/06/26' },
      { Header: '17/10/26', accessor: '17/10/26' },
      { Header: '29/08/27', accessor: '29/08/27' },
      { Header: '13/03/28', accessor: '13/03/28' },
      { Header: '13/03/29', accessor: '13/03/29' },
      { Header: '13/03/30', accessor: '13/03/30' },
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
                  title="Détails OT En Cours"
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
          title="Répartition de l'encours des Obligations du Trésor en %"
          isCardOpen={cardStates.dashboard}
          setIsCardOpen={() => toggleCard('dashboard')}
          content={<PieChart subtext="" data={otData} height="var(--chart-300)" />}
        />
      ) : shownData === 'table' ? (
        <Card
          title="OT en Cours"
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

export default OtInProgress
