import React from 'react'
import PropTypes from 'prop-types'

const TimeFrameSelector = ({ timeFrame, setTimeFrame }) => {
  const buttonStyle = {
    border: 'none',
    borderRadius: '5px',
    padding: '4px 8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    margin: '10px 0',
  }

  const activeStyle = {
    backgroundColor: 'var(--nup-mid-blue)',
    color: 'white',
    fontWeight: 'bold',
    border: '1px solid var(--nup-dark-blue)',
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
      <button
        style={{
          ...buttonStyle,
          ...(timeFrame === 'monthly' ? activeStyle : {}),
        }}
        onClick={() => setTimeFrame('monthly')}
      >
        Mensuelle
      </button>
      <button
        style={{
          ...buttonStyle,
          ...(timeFrame === 'quarterly' ? activeStyle : {}),
        }}
        onClick={() => setTimeFrame('quarterly')}
      >
        Quarterly
      </button>
      <button
        style={{
          ...buttonStyle,
          ...(timeFrame === 'annually' ? activeStyle : {}),
        }}
        onClick={() => setTimeFrame('annually')}
      >
        Annuelle
      </button>
    </div>
  )
}

TimeFrameSelector.propTypes = {
  timeFrame: PropTypes.string.isRequired,
  setTimeFrame: PropTypes.func.isRequired,
}

export default TimeFrameSelector
