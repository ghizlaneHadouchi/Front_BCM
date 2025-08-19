import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilContrast, cilMenu, cilMoon, cilSun, cilBell, cilLanguage } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes()
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.theme.sidebarShow)
  const notification = useSelector((state) => state.user.notification) || 0
  const [isNotificationCardShown, setIsNotificationCardShown] = useState(false)
  const { currentUser } = useSelector((state) => state.user) || {}
  const notificationRef = useRef(null)
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  // useEffect(() => {
  //   if (currentUser) {
  //     setActiveNotifications()
  //   }
  // }, [dispatch, currentUser, activeNotifications])

  const handleClick = () => {
    setIsNotificationCardShown(!isNotificationCardShown)
  }

  // const setActiveNotifications = async () => {
  //   dispatch({
  //     type: 'setNotifications',
  //     payload: {
  //       notifications: activeNotifications.length,
  //       notificationMessage: activeNotifications,
  //     },
  //   })
  // }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isNotificationCardShown &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        dispatch({
          type: 'clearNotification',
        })
        setIsNotificationCardShown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isNotificationCardShown, dispatch])

  const handleChange = (lang) => {
    setSelectedLanguage(lang)
    // dispatch({ type: 'SET_LANGUAGE', payload: lang })
    i18n.changeLanguage(lang).catch((error) => {
      console.error('Failed to change language:', error)
    })
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{
            marginInlineStart: '-14px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex "></CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink
              ref={notificationRef}
              onClick={handleClick}
              style={{ position: 'relative', cursor: 'pointer' }}
            >
              <CIcon icon={cilBell} size="lg" />
              {notification && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: -4,
                    backgroundColor: 'var(--redAirbnb)',
                    padding: '1px 5px',
                    borderRadius: 999,
                  }}
                >
                  <span style={{ fontWeight: 900 }}>{notification}</span>
                </div>
              )}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CIcon icon={cilLanguage} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={selectedLanguage === 'en'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => handleChange('en')}
              >
                En
              </CDropdownItem>
              <CDropdownItem
                active={selectedLanguage === 'fr'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => handleChange('fr')}
              >
                Fr
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
