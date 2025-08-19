import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import PropTypes from 'prop-types'

const DoubleBarChart = ({ xAxisData, data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom)

    const emphasisStyle = {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.3)',
      },
    }

    const series = data.map((dataset, index) => ({
      name: dataset.name,
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: dataset.values,
      itemStyle: {
        color: dataset.color || `hsl(${index * 60}, 70%, 50%)`,
      },
    }))

    const toolbox =
      data.length > 1
        ? {
            feature: {
              magicType: {
                type: ['stack'],
              },
            },
          }
        : null

    const option = {
      legend: {
        data: data.map((dataset) => dataset.name),
        left: '10%',
      },
      toolbox,
      tooltip: {},
      xAxis: {
        data: xAxisData,
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false },
        axisLabel: { rotate: 45 },
      },
      yAxis: {},
      grid: {
        bottom: 100,
      },
      series,
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
  }, [xAxisData, data])

  return <div ref={chartRef} style={{ width: '100%', height: 'var(--chart-300)' }} />
}

DoubleBarChart.propTypes = {
  xAxisData: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      values: PropTypes.array.isRequired,
      color: PropTypes.string,
    }),
  ).isRequired,
}

export default DoubleBarChart
