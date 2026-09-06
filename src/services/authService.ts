import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type Unsubscribe,
} from 'firebase/auth'
import { auth } from './firebaseService'

function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists'
      case 'auth/invalid-email':
        return 'Please enter a valid email address'
      case 'auth/weak-password':
        return 'Password should be at least 6 characters'
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password'
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection'
      default:
        break
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

export async function registerUser(
  email: string,
  password: string,
): Promise<User> {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    return credential.user
  } catch (error) {
    throw new Error(getAuthErrorMessage(error, 'Failed to register'))
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (error) {
    throw new Error(getAuthErrorMessage(error, 'Failed to log in'))
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(getAuthErrorMessage(error, 'Failed to log out'))
  }
}

export function subscribeToAuthChanges(
  callback: (user: User | null) => void,
): Unsubscribe {
  return onAuthStateChanged(auth, callback)
}
