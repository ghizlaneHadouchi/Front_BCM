import PropTypes from 'prop-types'
import React from 'react'

const LabeledField = ({
  label,
  name,
  type = 'text',
  isTextArea = false,
  isSelect = false,
  options = [],
  value,
  onChange,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor={name}>{label}</label>
      {isTextArea ? (
        <textarea name={name} value={value} onChange={onChange} style={{ width: 200 }} />
      ) : isSelect ? (
        <select name={name} value={value} onChange={onChange} style={{ width: 200, padding: 3 }}>
          {options.map((option, index) => (
            <option key={index} value={option.value} disabled={option.disabled || false}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} style={{ width: 200 }} />
      )}
    </div>
  )
}

LabeledField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  isTextArea: PropTypes.bool,
  isSelect: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
  ),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default LabeledField
