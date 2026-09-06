import { useState } from 'react'
import type { AuthMode } from '../../types'
import { login, register } from './AuthModel'

export function useAuthViewModel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }

      setPassword('')
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong during authentication'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  function toggleMode() {
    setMode((current) => (current === 'login' ? 'register' : 'login'))
    setError(null)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  }
}
