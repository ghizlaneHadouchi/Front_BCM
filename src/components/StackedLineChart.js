import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import PropTypes from 'prop-types'

const StackedLineChart = ({ title, legendData, xAxisData, seriesData }) => {
  const chartRef = useRef()

  useEffect(() => {
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom)

    const option = {
      title: {
        text: title || '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: legendData,
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '30%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          restore: { show: true },
        },
        top: '10%',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData,
    }

    myChart.setOption(option)

    myChart.on('legendselectchanged', (params) => {
      const name = params.name
      const selected = params.selected

      if (selected[name]) {
        myChart.dispatchAction({
          type: 'legendSelect',
          name: name,
        })
      } else {
        myChart.dispatchAction({
          type: 'legendInverseSelect',
        })
      }
    })

    const handleResize = () => {
      myChart.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (myChart) {
        myChart.dispose()
      }
    }
  }, [title, legendData, xAxisData, seriesData])

  return <div ref={chartRef} style={{ width: '100%', height: 'var(--chart-300)' }} />
}

StackedLineChart.propTypes = {
  title: PropTypes.string,
  legendData: PropTypes.arrayOf(PropTypes.string),
  xAxisData: PropTypes.arrayOf(PropTypes.string),
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ),
}

export default StackedLineChart
