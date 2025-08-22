import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import PropTypes from 'prop-types'

export default function StackedLineChart({ legendData, xAxisData, seriesData, height = 300 }) {
  const domRef = useRef(null)
  const chartRef = useRef(null)

  const safeLegend = Array.isArray(legendData) ? legendData.filter(Boolean) : []
  const safeXAxis  = Array.isArray(xAxisData) ? xAxisData.filter(Boolean) : []
  const safeSeries = Array.isArray(seriesData)
    ? seriesData.filter(s => s && s.name) // drop invalid series (no name)
    : []

  useEffect(() => {
    if (!domRef.current) return

    // Reuse instance if exists (avoids "already initialized")
    chartRef.current = echarts.getInstanceByDom(domRef.current) || echarts.init(domRef.current)

    const option = {
      tooltip: { trigger: 'axis' },
      legend: { data: safeLegend.length ? safeLegend : safeSeries.map(s => s.name) },
      grid: { left: 24, right: 24, top: 40, bottom: 24, containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: safeXAxis },
      yAxis: { type: 'value' },
      series: safeSeries
    }

    // setOption only inside effect (avoids "main process" warning)
    chartRef.current.setOption(option, true)

    const onResize = () => chartRef.current?.resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (chartRef.current) {
        chartRef.current.dispose()
        chartRef.current = null
      }
    }
  }, [safeLegend, safeXAxis, safeSeries])

  return <div ref={domRef} style={{ width: '100%', height }} />
}

StackedLineChart.propTypes = {
  legendData: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  xAxisData:  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
      stack: PropTypes.string,
    })
  ),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
