import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'

const RoleRoute = ({children, allow}) => {
    const {user,loading} = useAuth()
    if(loading) return <p>Checking...</p>
    if(!user) return <Navigate to='/login' replace/>
    if(!allow.includes(user.role)) return <Navigate to='/unauthorized' replace/>
  return children
}

export default RoleRoute