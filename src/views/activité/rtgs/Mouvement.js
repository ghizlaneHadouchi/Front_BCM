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
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'
import Kpi from '../../../components/Kpi.js'
import {
  createMvsRTGS,
  getMvsResByMonth,
  getMvsResByParticipantsAndMonth,
  getMvsResByParticipantsAndStatus,
  getParticipantsStats,
  getRTGS,
  getRTGSForTable,
} from '../../../hooks/rtgs.js'
import { BsTable } from 'react-icons/bs'
import { GoGraph } from 'react-icons/go'
import { TbListDetails } from 'react-icons/tb'
import { FaSearch } from 'react-icons/fa'
import Card from '../../../components/Card.js'
import BasicLineChart from '../../../components/BasicLineChart.js'
import StackedLineChart from '../../../components/StackedLineChart.js'
import DoubleBarChart from '../../../components/DoubleBarChart.js'
import PieChart from '../../../components/PieChart.js'
import LabeledField from '../../../components/LabeledField.js'
import Table from '../../../components/Table.js'
import TypeButton from '../../../components/TypeButton.js'
import SearchButton from '../../../components/SearchButton.js'

const Mouvement = () => {
  const [isMainCardOpen, setIsMainCardOpen] = useState(true)
  const [cardStates, setCardStates] = useState({
    filter: true,
    table: true,
    recap: true,
    dashboard: true,
    totalMvsRes: true,
    mvsResByParticipant: true,
    pieChart: true,
    barChart: true,
  })
  const [startDate, setStartDate] = useState('2023-11-24')
  const [endDate, setEndDate] = useState('2024-12-31')
  const [shownData, setShownData] = useState('table')
  const [formData, setFormData] = useState({
    amount: '',
    businessdate: '',
    currencycode: '',
    t_from: '',
    processingstatus: '',
    t_to: '',
  })
  const [filterData, setFilterData] = useState({
    t_from: '',
    status: '',
    id: '',
  })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [filteredMvs, setFilteredMvs] = useState([])
  const { events: data, isDashboardloading } = getRTGS()
  const mvsResByParticipantsAndMonth = getMvsResByParticipantsAndMonth()
  const mvsResByMonth = getMvsResByMonth()
  const mvsResByParticipantsAndStatus = getMvsResByParticipantsAndStatus()
  const { mvsResForTable, isTableLoading } = getRTGSForTable()
  const { participantsStats, isParticipantsStatsLoading } = getParticipantsStats(startDate, endDate)

  useEffect(() => {
    setFilteredMvs(mvsResForTable)
  }, [mvsResForTable])

  const t_from = Array.from(new Set(mvsResForTable.map((m) => m.t_from)))
  const status = Array.from(new Set(mvsResForTable.map((m) => m.processingstatus)))

  const toggleCard = (card) => setCardStates((prev) => ({ ...prev, [card]: !prev[card] }))

  const [sortedData, setSortedData] = useState([])
//change that 
  useEffect(() => {
    if (data.length > 0 && !isDashboardloading) {
      const transformedData = data.map((item) => ({
        ...item,
             pctNbrTransactions: `${Number(item.pctNbrTransactions ?? 0).toFixed(1)}%`,
     pctVolumeTransactions: `${Number(item.pctVolumeTransactions ?? 0).toFixed(1)}%`,
      pctTransactionsRejected: `${Number(item.pctTransactionsRejected ?? 0).toFixed(1)}%`,

      }))

      const sortedData = transformedData.sort(
        (a, b) => new Date(b.month_date) - new Date(a.month_date),
      )
      setSortedData(sortedData)
    }
  }, [data])

  const titleStyle = {
    textAlign: 'center',
    flex: 1,
  }

  /*const formatCurrency = (num) => {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2) + ' B'
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + ' Mrd'
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + ' M'
    } else {
      return num.toString()
    }
  }*/
 const formatCurrency = (num) => {
 const n = Number(num)
  if (!Number.isFinite(n)) return '-'
  if (n >= 1e12) {
   return (n / 1e12).toFixed(2) + ' B'
  } else if (n >= 1e9) {
    return (n / 1e9).toFixed(2) + ' Mrd'
  } else if (n >= 1e6) {
    return (n / 1e6).toFixed(2) + ' M'
   } else {
 }
 }
  /*const metrics = useMemo(() => {
    if (isDashboardloading) {
      return
    }
    const latestData = data[0] || {}
    return {
      avgTransactionPerMonth: String(Math.round(latestData.avg_transactions_per_month)),
      avgAmountPerTransaction: formatCurrency(parseFloat(latestData.avg_amount_per_transaction)),
      percentageFailed: parseFloat(latestData.pct_failed_transactions).toFixed(1),
      totalTransactions: latestData.total_transactions,
      totalVolume: formatCurrency(latestData.total_volume),
      totalRejected: latestData.total_rejected,
    }
  }, [data, isDashboardloading])*/
  const metrics = useMemo(() => {
 if (isDashboardloading || !Array.isArray(sortedData) || sortedData.length === 0) {
    return {
      avgTransactionPerMonth: '0',
      avgAmountPerTransaction: '0',
      percentageFailed: '0.0',
      totalTransactions: 0,
      totalVolume: '0',
      totalRejected: 0,
    }
  }
  const totalTransactions = sortedData.reduce(
    (sum, r) => sum + Number(r.nbrTransactions ?? 0), 0
  )
  const totalRejected = sortedData.reduce(
    (sum, r) => sum + Number(r.nbrTransactionsRejected ?? 0), 0
  )
  const totalVolumeNum = sortedData.reduce(
    (sum, r) => sum + Number(r.volumeTransactions ?? 0), 0
  )
  const months = sortedData.length
  const avgTxPerMonth = months ? Math.round(totalTransactions / months) : 0
  const avgAmtPerTx = totalTransactions ? (totalVolumeNum / totalTransactions) : 0
  const pctFailed = totalTransactions ? (totalRejected / totalTransactions) * 100 : 0

  return {
    avgTransactionPerMonth: String(avgTxPerMonth),
    avgAmountPerTransaction: formatCurrency(avgAmtPerTx),
    percentageFailed: pctFailed.toFixed(1),
    totalTransactions,
    totalVolume: formatCurrency(totalVolumeNum),
    totalRejected,
  }
}, [sortedData, isDashboardloading])

  //chnage that 
  const columnsDashboard = useMemo(
    () => [
      { Header: 'Mois', accessor: 'monthDate' },
    { Header: 'Nbr Transactions', accessor: 'nbrTransactions' },
    { Header: '% Nbr Transactions', accessor: 'pctNbrTransactions' },
    { Header: 'Volume Transactions (RMU)', accessor: 'volumeTransactions' },
    { Header: '% Volume Transactions', accessor: 'pctVolumeTransactions' },
    { Header: 'Nbr Transactions Rejetées', accessor: 'nbrTransactionsRejected' },
    { Header: '% Transactions Rejetées', accessor: 'pctTransactionsRejected' },
    ],
    [],
  )

  const columnsTable = useMemo(
    () => [
      { Header: 'Id', accessor: 'id' },
      { Header: 'Montant', accessor: 'amount' },
      { Header: 'Business Date', accessor: 'businessdate' },
      { Header: 'Code Devise', accessor: 'currencycode' },
      { Header: 'Emetteur', accessor: 't_from' },
      { Header: 'Status de Traitement', accessor: 'processingstatus' },
      { Header: 'Bénéficiaire', accessor: 't_to' },
    ],
    [],
  )

  const columnsRecap = useMemo(
    () => [
      { Header: 'Emetteur', accessor: 'participant' },
      { Header: 'Nbr Transactions', accessor: 'nbr_transactions' },
      { Header: '% Transactions', accessor: 'pct_transactions' },
      { Header: 'Volume Transactions', accessor: 'volume_transactions' },
      { Header: '% Volume Transactions', accessor: 'pct_volume_transactions' },
      { Header: 'Nbr Transactions Echouées', accessor: 'nbr_failed_transactions' },
      { Header: '% Transactions Echouées', accessor: 'pct_failed_transactions' },
      { Header: 'Volume Transactions Echouées', accessor: 'volume_failed_transactions' },
    ],
    [],
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
  } = useTable(
    {
      columns:
        shownData === 'table'
          ? columnsTable
          : shownData === 'graph'
            ? columnsDashboard
            : columnsRecap,
      data:
        shownData === 'table'
          ? filteredMvs
          : shownData === 'graph'
            ? sortedData
            : participantsStats,
      initialState: { pageIndex: 0, pageSize: 12 },
    },
    usePagination,
  )

  const handleFilter = (e) => {
    e && e.preventDefault()

    const filtered = mvsResForTable.filter((item) => {
      const matchesId = filterData.id ? filterData.id === String(item.id) : true
      const matchesParticipant = filterData.t_from ? filterData.t_from === item.t_from : true
      const matchesStatus = filterData.status ? filterData.status === item.processingstatus : true

      const matchesDateRange =
        startDate && endDate
          ? new Date(item.businessdate) >= new Date(startDate) &&
            new Date(item.businessdate) <= new Date(endDate)
          : true

      return matchesId && matchesParticipant && matchesStatus && matchesDateRange
    })

    setFilteredMvs(filtered)
  }

  const basicLineChartData = useMemo(
    () => ({
      xAxisData: mvsResByMonth.map((d) => d.month_year).sort((a, b) => new Date(a) - new Date(b)),
      seriesData: mvsResByMonth.map((d) => d.count),
    }),
    [mvsResByMonth],
  )

  const stackedLineData = useMemo(() => {
    const xAxisData = [...new Set(mvsResByParticipantsAndMonth.map((d) => d.month_year))].sort(
      (a, b) => new Date(a) - new Date(b),
    )

    const legendData = [...new Set(mvsResByParticipantsAndMonth.map((i) => i.t_from))]

    const seriesData = legendData.map((t_from) => ({
      name: t_from,
      type: 'line',
      stack: 'Total',
      data: xAxisData.map((month_year) =>
        mvsResByParticipantsAndMonth
          .filter((i) => i.t_from === t_from && i.month_year === month_year)
          .reduce((sum, i) => sum + i.count, 0),
      ),
    }))

    return { xAxisData, legendData, seriesData }
  }, [mvsResByParticipantsAndMonth])

  const { xAxisData1, data1 } = useMemo(() => {
    const xAxisData = mvsResByParticipantsAndStatus.map((i) => i.t_from)

    const data = ['total_item_count', 'non_resolved_count'].map((key, index) => ({
      name: ['Total Mouvement de Réserve', 'Mouvement de Réserve Non Résolus'][index],
      values: mvsResByParticipantsAndStatus.map((i) => i[key]),
      color: ['#5c74cc', '#e66a68'][index],
    }))

    return { xAxisData1: xAxisData, data1: data }
  }, [mvsResByParticipantsAndStatus])

  const pieChartData = useMemo(
    () =>
      mvsResByParticipantsAndStatus.map((i) => {
        return {
          value: i.total_item_count,
          name: i.t_from,
        }
      }),
    [mvsResByParticipantsAndStatus],
  )

  const clearInputs = () => {
    setFormData({
      amount: '',
      businessdate: '',
      currencycode: '',
      t_from: '',
      processingstatus: '',
      t_to: '',
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    await createMvsRTGS(formData)
    setIsAddModalOpen(false)
    clearInputs()
  }

  const handleChangeFilter = (e) => {
    const { name, value } = e.target
    setFilterData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
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
              }}
            >
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  placeholder="Id ..."
                  name="id"
                  value={filterData.id}
                  onChange={handleChangeFilter}
                />

                <input
                  placeholder="Emetteur ..."
                  type="text"
                  list="t_from"
                  name="t_from"
                  value={filterData.t_from}
                  onChange={handleChangeFilter}
                  style={{ padding: '6px 10px' }}
                />
                <datalist id="t_from">
                  {t_from.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>

                <input
                  placeholder="Statut ..."
                  type="text"
                  list="status"
                  name="status"
                  value={filterData.status}
                  onChange={handleChangeFilter}
                  style={{ padding: '6px 10px' }}
                />
                <datalist id="status">
                  {status.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>

                <input
                  placeholder="De"
                  type="date"
                  selected={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
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
                  Icon={<TbListDetails size={16} />}
                  onClick={() => setShownData('table')}
                  isSelected={shownData === 'table'}
                  title="Détails Mouvements"
                />
                <TypeButton
                  Icon={<BsTable size={16} />}
                  onClick={() => setShownData('recap')}
                  isSelected={shownData === 'recap'}
                  title="Récapitulatif"
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
          <div className="card-container">
            <div className="card-header" onClick={() => setIsMainCardOpen((prev) => !prev)}>
              <h6 style={titleStyle}>Vue Globale</h6>
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
              <CRow>
                <CCol xs={4}>
                  <Kpi
                    title="Transactions moyennes par mois"
                    data={metrics.avgTransactionPerMonth}
                  />
                  <Kpi title="Total Transactions" data={metrics.totalTransactions} />
                </CCol>
                <CCol xs={4}>
                  <Kpi
                    title="Montant moyen par transaction"
                    data={`${metrics.avgAmountPerTransaction} RMU`}
                  />
                  <Kpi title="Volume Transactions" data={`${metrics.totalVolume} RMU`} />
                </CCol>
                <CCol xs={4}>
                  <Kpi title="Transactions échouées" data={`${metrics.percentageFailed} %`} />
                  <Kpi title="Total Rejetés" data={metrics.totalRejected} />
                </CCol>
              </CRow>
              <div>
                <Table
                  getTableProps={getTableProps}
                  headerGroups={headerGroups}
                  getTableBodyProps={getTableBodyProps}
                  page={page}
                  prepareRow={prepareRow}
                  previousPage={previousPage}
                  canPreviousPage={canPreviousPage}
                  pageIndex={pageIndex}
                  pageOptions={pageOptions}
                  nextPage={nextPage}
                  canNextPage={canNextPage}
                />
              </div>
            </div>
          </div>
          <Card
            title="Total Mouvements de Réserve"
            isCardOpen={cardStates.totalMvsRes}
            setIsCardOpen={() => toggleCard('totalMvsRes')}
            content={
              <BasicLineChart
                xAxisData={basicLineChartData.xAxisData}
                seriesData={basicLineChartData.seriesData}
              />
            }
          />
          <Card
            title="Total Mouvements de Réserve par Participants"
            isCardOpen={cardStates.mvsResByParticipant}
            setIsCardOpen={() => toggleCard('mvsResByParticipant')}
            content={
              <StackedLineChart
                legendData={stackedLineData.legendData}
                xAxisData={stackedLineData.xAxisData}
                seriesData={stackedLineData.seriesData}
              />
            }
          />
          <Card
            title="Total Mouvements de Réserve et Mouvements de Réserve Non Résolus par Participants"
            isCardOpen={cardStates.barChart}
            setIsCardOpen={() => toggleCard('barChart')}
            content={<DoubleBarChart xAxisData={xAxisData1} data={data1} />}
          />
          <Card
            title="Répartition des Mouvements de Réserve par Participants"
            isCardOpen={cardStates.pieChart}
            setIsCardOpen={() => toggleCard('pieChart')}
            content={<PieChart subtext="" data={pieChartData} height="var(--chart-300)" />}
          />
        </>
      ) : !isTableLoading && shownData === 'table' ? (
        <Card
          title="Liste Des Mouvements"
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
              <Table
                getTableProps={getTableProps}
                headerGroups={headerGroups}
                getTableBodyProps={getTableBodyProps}
                page={page}
                prepareRow={prepareRow}
                previousPage={previousPage}
                canPreviousPage={canPreviousPage}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                nextPage={nextPage}
                canNextPage={canNextPage}
              />
            </div>
          }
        />
      ) : !isParticipantsStatsLoading && shownData === 'recap' ? (
        <Card
          title="Récapitulatifs Des Enregistrements RTGS"
          isCardOpen={cardStates.recap}
          setIsCardOpen={() => toggleCard('recap')}
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Table
                getTableProps={getTableProps}
                headerGroups={headerGroups}
                getTableBodyProps={getTableBodyProps}
                page={page}
                prepareRow={prepareRow}
                previousPage={previousPage}
                canPreviousPage={canPreviousPage}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                nextPage={nextPage}
                canNextPage={canNextPage}
              />
            </div>
          }
        />
      ) : (
        <div className="d-flex justify-content-center">
          <CSpinner />
        </div>
      )}
      <CModal size="lg" visible={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <CModalHeader>
          <CModalTitle>Ajout Mouvement de Réserve</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <LabeledField
              label="Montant"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />
            <LabeledField
              label="Business Date"
              name="businessdate"
              type="datetime-local"
              value={formData.businessdate}
              onChange={handleChange}
            />
            <LabeledField
              label="Status de Traitement"
              name="processingstatus"
              isSelect={true}
              options={[
                { label: '', value: '', disabled: true },
                {
                  label: 'Annulé',
                  value: 'CANCELLED',
                },
                {
                  label: 'Completé',
                  value: 'COMPLETE',
                },
              ]}
              value={formData.processingstatus}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <LabeledField
              label="Code Devise"
              name="currencycode"
              isSelect={true}
              options={[
                { label: '', value: '', disabled: true },
                {
                  label: 'MRU',
                  value: 'COMPLETE',
                },
              ]}
              value={formData.currencycode}
              onChange={handleChange}
            />
            <LabeledField
              label="Emetteur"
              name="t_from"
              value={formData.t_from}
              onChange={handleChange}
            />
            <LabeledField
              label="Récepteur"
              name="t_to"
              value={formData.t_to}
              onChange={handleChange}
            />
          </div>
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
    </div>
  )
}

Mouvement.propTypes = {
  row: PropTypes.object,
}

export default Mouvement
