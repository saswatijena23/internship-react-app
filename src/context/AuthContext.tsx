import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { logout as logoutUser } from '../pages/Auth/AuthModel'
import { subscribeToAuthChanges } from '../services/authService'
import type { AuthContextValue, AuthProviderProps } from '../types'

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((nextUser) => {
      setUser(nextUser)
      setAuthLoading(false)
    })

    return unsubscribe
  }, [])

  async function logout() {
    await logoutUser()
  }

  if (authLoading) {
    return <p>Loading authentication...</p>
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
