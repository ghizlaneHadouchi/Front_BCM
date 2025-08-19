import React, { useMemo } from 'react'
import Kpi from '../../components/Kpi'
import { RxHamburgerMenu } from 'react-icons/rx'
import { CiCalendar } from 'react-icons/ci'
import { HiArrowTrendingUp } from 'react-icons/hi2'
import { IoMdApps } from 'react-icons/io'
import BasicLineChart from '../../components/BasicLineChart'

const Transactions = () => {
  const tags = [
    'DEPOSIT',
    'INVOICE',
    'OTHER',
    'PAYMENT',
    'RECHARGE',
    'TAX',
    'TRANSFER',
    'WITHDRAWAL',
  ]

  const barData = [
    { name: 'bankily', width: 'w-[80%]' },
    { name: 'masrvi', width: 'w-[45%]' },
    { name: 'sedad', width: 'w-[30%]' },
    { name: 'click', width: 'w-[25%]' },
    { name: 'bci-pay', width: 'w-[20%]' },
    { name: 'amanty', width: 'w-[10%]' },
    { name: 'bamis-digital', width: 'w-[5%]' },
  ]

  const seriesData = useMemo(() => [20, 14, 22, 15, 16, 21, 4, 13, 2], [])

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-6">Transactions</h2>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Kpi
          title="Montant Total des Transactions"
          data="101,43Md"
          Icon={IoMdApps}
          iconProps={{ color: 'blue', size: 16 }}
        />
        <Kpi
          title="Montant Total des Transactions / Jour"
          data="6,76Md"
          Icon={HiArrowTrendingUp}
          iconProps={{ color: 'blue', size: 16 }}
        />
        <Kpi
          title="Nombre Total de Transactions"
          data="31,65M"
          Icon={RxHamburgerMenu}
          iconProps={{ color: 'blue', size: 16 }}
        />
        <Kpi
          title="Nombre Total de Transactions / Jour"
          data="2,11M"
          Icon={CiCalendar}
          iconProps={{ color: 'blue', size: 16 }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side: Chart and Bars */}
        <div className="flex-1 space-y-6">
          {/* Line Chart Placeholder */}
          <div className="pt-2 bg-white rounded shadow flex flex-col items-center justify-center text-gray-400 text-sm">
            <div className="w-full flex justify-around">
              {tags.map((tag) => (
                <span key={tag} className="text-gray-500 px-1 py-1 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <BasicLineChart
              seriesData={seriesData}
              isXAxisShown={false}
              isYAxisShown={false}
              height="260px"
            />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded shadow space-y-3">
            {barData.map((item) => (
              <div key={item.name}>
                <div className="text-sm text-gray-600 mb-1">{item.name}</div>
                <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className={`bg-blue-600 h-full ${item.width} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Filters */}
        <div className="w-full lg:w-80 bg-white rounded shadow p-4 space-y-4">
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold">
              Montant
            </button>
            <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded">Nombre</button>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Jours Antérieurs</label>
            <input
              type="text"
              readOnly
              value="01/05/2025 - 13/05/2025"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Montant</label>
            <input type="range" min="0" max="100" className="w-full" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Type de transaction</label>
            <select className="w-full border border-gray-300 rounded px-2 py-2 text-sm">
              <option>Tout</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Wallet</label>
            <select className="w-full border border-gray-300 rounded px-2 py-2 text-sm">
              <option>Tout</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions
