import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import PropTypes from 'prop-types'

const MixedLineBarChart = ({
  xAxisData,
  barData,
  lineData,
  barName,
  lineName,
  barYAxis,
  lineYAxis,
  firstChartType,
  secondChartType,
}) => {
  const chartRef = useRef()

  useEffect(() => {
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom)

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          crossStyle: {
            color: '#999',
          },
        },
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
        },
      },
      legend: {
        data: [barName, lineName],
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: barYAxis.name,
          min: barYAxis.min,
          max: barYAxis.max,
          interval: barYAxis.interval,
          axisLabel: {
            formatter: '{value}',
          },
        },
        {
          type: 'value',
          name: lineYAxis.name,
          min: lineYAxis.min,
          max: lineYAxis.max,
          interval: lineYAxis.interval,
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: barName,
          type: firstChartType || 'bar',
          data: barData,
          tooltip: {
            valueFormatter: function (value) {
              return value
            },
          },
        },
        {
          name: lineName,
          type: secondChartType || 'line',
          yAxisIndex: 1,
          data: lineData,
          tooltip: {
            valueFormatter: function (value) {
              return value
            },
          },
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
  }, [xAxisData, barData, lineData, barName, lineName, barYAxis, lineYAxis])

  return <div ref={chartRef} style={{ width: '100%', height: 'var(--chart-300)' }} />
}

MixedLineBarChart.propTypes = {
  xAxisData: PropTypes.arrayOf(PropTypes.string).isRequired,
  barData: PropTypes.arrayOf(PropTypes.number).isRequired,
  lineData: PropTypes.arrayOf(PropTypes.number).isRequired,
  barName: PropTypes.string.isRequired,
  lineName: PropTypes.string.isRequired,
  barYAxis: PropTypes.shape({
    name: PropTypes.string,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    interval: PropTypes.number.isRequired,
  }).isRequired,
  lineYAxis: PropTypes.shape({
    name: PropTypes.string,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    interval: PropTypes.number.isRequired,
  }).isRequired,
  firstChartType: PropTypes.oneOf(['bar', 'line']),
  secondChartType: PropTypes.oneOf(['bar', 'line']),
}

export default MixedLineBarChart
