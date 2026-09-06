import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { get, getDatabase, ref, remove, set } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import type { Movie } from '../types'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

const database = getDatabase(app)

function requireUserId(userId: string): string {
  if (!userId.trim()) {
    throw new Error('User ID is required')
  }

  return userId
}

function favouritesPath(userId: string, imdbID?: string): string {
  const basePath = `users/${userId}/favourites`
  return imdbID ? `${basePath}/${imdbID}` : basePath
}

export async function addFavourite(
  userId: string,
  movie: Movie,
): Promise<void> {
  const validatedUserId = requireUserId(userId)

  try {
    await set(
      ref(database, favouritesPath(validatedUserId, movie.imdbID)),
      movie,
    )
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Failed to add favourite: ${error.message}`
        : 'Failed to add favourite',
    )
  }
}

export async function removeFavourite(
  userId: string,
  imdbID: string,
): Promise<void> {
  const validatedUserId = requireUserId(userId)

  try {
    await remove(ref(database, favouritesPath(validatedUserId, imdbID)))
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Failed to remove favourite: ${error.message}`
        : 'Failed to remove favourite',
    )
  }
}

export async function getFavourites(userId: string): Promise<Movie[]> {
  const validatedUserId = requireUserId(userId)

  try {
    const snapshot = await get(ref(database, favouritesPath(validatedUserId)))

    if (!snapshot.exists()) {
      return []
    }

    const favourites = snapshot.val() as Record<string, Movie>
    return Object.values(favourites)
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Failed to load favourites: ${error.message}`
        : 'Failed to load favourites',
    )
  }
}
