import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user) || {}
  return currentUser ? <Component {...rest} /> : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
}

export default PrivateRoute
