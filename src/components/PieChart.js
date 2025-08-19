import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import PropTypes from 'prop-types'

const PieChart = ({
  title,
  subtext,
  data,
  isLegendShown = true,
  colors,
  height = '200px',
  isLabelShown = false,
}) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const myChart = echarts.init(chartRef.current)

    const legend = isLegendShown
      ? {
          orient: 'horizontal',
          left: 'center',
          type: 'scroll',
        }
      : {
          show: false,
        }

    const label = isLabelShown
      ? {
          show: true,
          formatter: '{b}: {d}%',
        }
      : {}

    const seriesData = data?.map((item, index) => ({
      ...item,
      itemStyle: {
        color: colors && colors[index % colors.length],
      },
    }))

    const option = {
      title: {
        text: title || '',
        subtext: subtext || '',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend,
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '60%',
          data: seriesData || [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label,
        },
      ],
    }

    myChart.setOption(option)

    const resizeObserver = new ResizeObserver(() => {
      myChart.resize()
    })
    resizeObserver.observe(chartRef.current)

    return () => {
      resizeObserver.disconnect()
      myChart.dispose()
    }
  }, [title, subtext, data, colors])

  return <div ref={chartRef} style={{ width: '100%', height: height }} />
}

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  subtext: PropTypes.string,
  isLegendShown: PropTypes.bool,
  height: PropTypes.string,
  colors: PropTypes.array,
  isLabelShown: PropTypes.bool,
}

export default PieChart
