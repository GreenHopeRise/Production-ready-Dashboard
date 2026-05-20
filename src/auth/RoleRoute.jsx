import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'
import { can } from '@/lib/can'

const RoleRoute = ({children, allow}) => {
    const {user,loading} = useAuth()
    if(loading) return <p>Checking...</p>
    if(!user) return <Navigate to='/login' replace/>
    if(!can(user.role, perm))
  return children
}

export default RoleRoute