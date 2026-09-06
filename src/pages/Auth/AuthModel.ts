import type { User } from 'firebase/auth'
import { loginUser, logoutUser, registerUser } from '../../services/authService'

function normalizeCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail) {
    throw new Error('Email is required')
  }

  if (!password) {
    throw new Error('Password is required')
  }

  if (password.length < 6) {
    throw new Error('Password must contain at least six characters')
  }

  return {
    email: normalizedEmail,
    password,
  }
}

export async function register(
  email: string,
  password: string,
): Promise<User> {
  const credentials = normalizeCredentials(email, password)
  return registerUser(credentials.email, credentials.password)
}

export async function login(email: string, password: string): Promise<User> {
  const credentials = normalizeCredentials(email, password)
  return loginUser(credentials.email, credentials.password)
}

export async function logout(): Promise<void> {
  return logoutUser()
}
