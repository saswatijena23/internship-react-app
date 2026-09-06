import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { Movie } from '../../types'
import { addMovieToFavourites, getMovies, initialMovies } from './HomeModel'

export function useHomeViewModel() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadInitialMovies() {
    setLoading(true)
    setError(null)
    setQuery('')

    try {
      const results = await initialMovies()
      setMovies(results)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while loading movies'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadInitialMovies()
  }, [])

  async function handleSearch() {
    setLoading(true)
    setError(null)

    try {
      const results = await getMovies(query)
      setMovies(results)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong while searching'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleFavourite(movie: Movie) {
    if (!user) {
      navigate('/favourites')
      return
    }

    setError(null)

    try {
      await addMovieToFavourites(user.uid, movie)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while adding favourite'
      setError(message)
    }
  }

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    handleSearch,
    handleFavourite,
    loadInitialMovies,
  }
}
