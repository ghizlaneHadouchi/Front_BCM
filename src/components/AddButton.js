import React from 'react'
import { CButton } from '@coreui/react'
import { FaPlus } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/prop-types
const AddButton = ({ onClick, label = 'Add', icon = <FaPlus />, style, className }) => {
  const { t } = useTranslation()

  const translatedLabel = t(label)

  return (
    <CButton
      onClick={onClick}
      style={{
        color: 'white',
        backgroundColor: 'var(--nup-mid-blue)',
        textAlign: 'center',
        gap: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 6px',
        ...style,
      }}
      className={className}
    >
      {icon}
      <span>{translatedLabel}</span>
    </CButton>
  )
}

export default AddButton
