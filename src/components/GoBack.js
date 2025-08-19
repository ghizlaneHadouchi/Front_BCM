import { CButton } from '@coreui/react'
import React from 'react'
import { IoIosArrowDropleftCircle } from 'react-icons/io'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const GoBack = ({ to }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleClick = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <CButton
      style={{
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        backgroundColor: 'var(--nup-mid-blue)',
        width: '90px',
        height: '30px',
      }}
      size="sm"
      onClick={handleClick}
    >
      <IoIosArrowDropleftCircle size={16} color="white" />
      <span style={{ color: 'white' }}>{t('Back')}</span>
    </CButton>
  )
}

GoBack.propTypes = {
  to: PropTypes.string,
}
