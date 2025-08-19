import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'

const SimpleBarChart = ({ data, barColor }) => {
  const [chartOption, setChartOption] = useState(null)

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const xAxisData = data.map((item) => item.x)
      const seriesData = data.map((item) => item.y)

      const option = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            smooth: true,
            itemStyle: {
              color: barColor,
            },
          },
        ],
      }

      setChartOption(option)
    } else {
      setChartOption({
        xAxis: {
          type: 'category',
          data: ['No Data'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [0],
            type: 'line',
          },
        ],
      })
    }
  }, [data, barColor])

  return <div>{chartOption ? <ReactEcharts option={chartOption} /> : <p>Loading chart...</p>}</div>
}

SimpleBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ),
  barColor: PropTypes.string,
}

export default SimpleBarChart
