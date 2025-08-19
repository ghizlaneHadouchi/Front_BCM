// StatusBadge.jsx / .tsx
import React from 'react'
import PropTypes from 'prop-types'
import { getStatusStyle, getStatusConfig, getStatusLabel } from '../config/statusConfig'
import { CTooltip } from '@coreui/react'
import { useTranslation } from 'react-i18next'

/**
 *  `align` = 'center' | 'start' | 'end'
 *  ────────────────────────────────────
 *  Defaults to center so existing screens stay untouched.
 */
const StatusBadge = ({
  status,
  type = 'processing',
  className = '',
  align = 'center', // ← NEW
}) => {
  const style = getStatusStyle(status, type)
  const config = getStatusConfig(status, type)

  const Icon = config.icon
  const { t } = useTranslation()

  // Tailwind can’t read dynamic strings, so whitelist the possibilities:
  const alignMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  }
  const wrapperJustify = alignMap[align] ?? 'justify-center'

  const isShortText = config.label.length < 8

  const badgeContent = (
    <div
      className={`
        inline-flex items-center
        px-1.5 py-1.5 rounded-md w-32
        justify-center select-none
        ${className}
      `}
      style={style}
    >
      <Icon className="flex-shrink-0" size={14} />
      <span className={`text-xs font-medium ml-1 ${!isShortText ? 'truncate' : ''}`}>
        {getStatusLabel(status, type, t)}
      </span>
    </div>
  )

  return (
    <div className={`flex ${wrapperJustify} w-full`}>
      {isShortText ? (
        badgeContent
      ) : (
        <CTooltip content={t(config.label)} placement="top">
          {badgeContent}
        </CTooltip>
      )}
    </div>
  )
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['processing', 'bkam', 'batch', 'cron', 'smpBkam', 'smpWorkflow']),
  className: PropTypes.string,
  align: PropTypes.oneOf(['center', 'start', 'end']), // ← NEW
}

export default StatusBadge
