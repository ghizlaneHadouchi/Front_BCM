import PropTypes from 'prop-types'
import React from 'react'

const Kpi = ({ title, data, Icon, iconProps }) => {
  return (
    <div
      className={`card-container flex items-center p-4 rounded-md shadow-sm ${
        Icon ? 'justify-between' : 'justify-center'
      }`}
    >
      <div className={`flex flex-col ${!Icon ? 'justify-center items-center' : ''}`}>
        <span className="text-sm text-gray-600">{title}</span>
        <span className="text-lg font-bold">{data}</span>
      </div>
      {Icon && (
        <div
          className="bg-blue-300 p-2 rounded-md flex items-center justify-center"
          style={{ width: 36, height: 36 }}
        >
          <Icon {...iconProps} />
        </div>
      )}
    </div>
  )
}

Kpi.propTypes = {
  title: PropTypes.string,
  data: PropTypes.string,
  Icon: PropTypes.elementType,
  iconProps: PropTypes.object,
}
export default Kpi
