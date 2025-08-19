import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="/" rel="noopener noreferrer">
          BCM
        </a>
        <span className="ms-1">&copy; {new Date().getFullYear()}</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
