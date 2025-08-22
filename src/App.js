import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'
import Cookies from 'js-cookie'
import './scss/style.scss'
import PrivateRoute from './utils/PrivateRoute'
import { setupAutoRefresh } from './components/autoRefresh';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
setupAutoRefresh();

const App = () => {
  const { currentUser } = useSelector((state) => state.user) || {}
  const dispatch = useDispatch()

  useEffect(() => {
    const checkForTokenValidation = async () => {
      try {
        const res = await fetch('/api/auth/checkToken', { method: 'GET', credentials: 'include' })
        const data = await res.json()
         if (data.success) {
  dispatch({ type: 'signIn', payload: { user: data.user } })
 } else {
   dispatch({ type: 'signOut' })
 }
      } catch (error) {
        console.log(error)
      }
    }
    checkForTokenValidation()
  }, [dispatch])

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/reporting/ach/virement" replace /> : <Login />}
          />
          <Route path="/*" element={<PrivateRoute element={DefaultLayout} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
