import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

type RouteGuardProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: RouteGuardProps) {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return <p>Loading authentication...</p>
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return children
}

export function GuestRoute({ children }: RouteGuardProps) {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return <p>Loading authentication...</p>
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}
