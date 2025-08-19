import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const TypeButton = ({ Icon, onClick, isSelected, title }) => {
  const buttonStyle = useMemo(
    () => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      border: 'none',
      backgroundColor: 'transparent',
      transition: 'all 0.5s ease',
    }),
    [],
  )

  const selectedStyle = useMemo(
    () => ({
      ...buttonStyle,
      color: '#007bff',
    }),
    [buttonStyle],
  )

  return (
    <button onClick={onClick} style={isSelected ? selectedStyle : buttonStyle}>
      {Icon}
      <span>{title}</span>
    </button>
  )
}

TypeButton.propTypes = {
  Icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
}

export default TypeButton
