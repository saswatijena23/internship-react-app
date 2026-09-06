import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import type { Movie } from '../../types'
import { deleteFavourite, loadFavourites } from './FavouritesModel'

export function useFavouritesViewModel() {
  const { user } = useAuth()
  const [favourites, setFavourites] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadMovies() {
    if (!user) {
      setError('User ID is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const results = await loadFavourites(user.uid)
      setFavourites(results)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while loading favourites'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function removeMovie(imdbID: string) {
    if (!user) {
      setError('User ID is required')
      return
    }

    setError(null)

    try {
      await deleteFavourite(user.uid, imdbID)
      setFavourites((current) =>
        current.filter((movie) => movie.imdbID !== imdbID),
      )
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while removing favourite'
      setError(message)
    }
  }

  useEffect(() => {
    void loadMovies()
  }, [user?.uid])

  return {
    favourites,
    loading,
    error,
    loadMovies,
    removeMovie,
  }
}
