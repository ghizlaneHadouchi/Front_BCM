/** @type EChartsOption */

import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import PropTypes from 'prop-types'

const BasicLineChart = ({
  xAxisData,
  seriesData,
  isXAxisShown = true,
  isYAxisShown = true,
  height = 'var(--chart-300)',
}) => {
  const chartRef = useRef()

  useEffect(() => {
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom)

    const option = {
      grid: {
        left: '5%',
        right: '5%',
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        boundaryGap: false,
        axisLabel: {
          rotate: 45,
          show: isXAxisShown,
        },
        axisTick: {
          show: isXAxisShown,
        },
        axisLine: {
          show: isXAxisShown,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: isYAxisShown,
        },
        axisTick: {
          show: isYAxisShown,
        },
        axisLine: {
          show: isYAxisShown,
        },
      },
      series: [
        {
          data: seriesData,
          type: 'line',
        },
      ],
    }

    myChart.setOption(option)

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
  }, [xAxisData, seriesData])

  return <div ref={chartRef} style={{ width: '100%', height }} />
}

BasicLineChart.propTypes = {
  xAxisData: PropTypes.arrayOf(PropTypes.string).isRequired,
  seriesData: PropTypes.arrayOf(PropTypes.number).isRequired,
  isXAxisShown: PropTypes.bool,
  isYAxisShown: PropTypes.bool,
  height: PropTypes.string,
}

export default BasicLineChart
