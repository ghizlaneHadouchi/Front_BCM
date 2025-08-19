import React from 'react'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

const FilterCard = ({
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isOpen,
  toggleOpen,
  isLocked,
}) => {
  const formatToDateString = (date) => {
    if (!date) return ''
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return format(utcDate, 'yyyy-MM-dd')
  }
  const setEndDateWithTime = (date) => {
    if (!date) return ''
    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)
    return format(endDate, 'yyyy-MM-dd')
  }
  // Prevent toggling the card when it is locked
  const handleToggle = () => {
    if (!isLocked) {
      toggleOpen()
    }
  }
  const { t } = useTranslation()

  return (
    <div className="card-container">
      <div
        className="card-header"
        onClick={handleToggle}
        style={{
          display: isLocked ? 'none' : '',
        }}
      >
        <h6>{t('Filter')}</h6>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="var(--cui-body-color)"
          style={{
            marginLeft: 'auto',
            transition: 'transform 1s',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
          }}
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </div>

      <div
        className={`card-content ${isOpen ? 'open' : ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            gap: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <input
            type="text"
            placeholder={t('Search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '6px 10px', border: '1px solid black' }}
          />
          <DatePicker
            placeholderText={t('De')}
            showIcon={true}
            selected={startDate ? new Date(startDate) : null}
            onChange={(date) => setStartDate(formatToDateString(date))}
            dateFormat="dd/MM/yyyy"
          />
          <DatePicker
            placeholderText={t('À')}
            showIcon={true}
            selected={endDate ? new Date(endDate) : null}
            onChange={(date) => setEndDate(setEndDateWithTime(date))}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
    </div>
  )
}

// PropTypes validation
FilterCard.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  startDate: PropTypes.string,
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.string,
  setEndDate: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  isLocked: PropTypes.bool,
}

export default FilterCard
