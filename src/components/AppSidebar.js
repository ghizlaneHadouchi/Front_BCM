import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CCloseButton, CSidebar, CSidebarHeader } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import BCMLogo from '../assets/svg/bcm.svg'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.theme.sidebarShow)

  return (
    <CSidebar
      colorScheme="dark"
      position="fixed"
      // unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader
        style={{
          borderBottom: 'var(--cui-border-width) var(--cui-border-style) #DBDFE6',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ color: '#646464', fontWeight: 'bold' }}>BCM</span>
          <img src={BCMLogo} alt="BCM" style={{ height: 30 }} />
        </div>
        <CCloseButton onClick={() => dispatch({ type: 'set', sidebarShow: false })} />
      </CSidebarHeader>
      <AppSidebarNav items={navigation()} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
