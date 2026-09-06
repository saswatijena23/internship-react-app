// This file will contain communication with the OMDb API.

import type { Movie, OmdbSearchResponse } from '../types'

const API_URL = 'https://www.omdbapi.com/'

export async function searchMovies(query: string): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  const url = `${API_URL}?apikey=${apiKey}&s=${encodeURIComponent(query)}`

  console.log('[OMDb] Searching for:', query)
  console.log('[OMDb] Request URL:', url)

  const response = await fetch(url)

  if (!response.ok) {
    console.error('[OMDb] HTTP error:', response.status, response.statusText)
    throw new Error(
      `Failed to search movies: ${response.status} ${response.statusText}`,
    )
  }

  const data: OmdbSearchResponse = await response.json()
  console.log('[OMDb] Response:', data)

  if (data.Response === 'False') {
    console.error('[OMDb] API error:', data.Error)
    throw new Error(data.Error ?? 'Movie search failed')
  }

  console.log('[OMDb] Movies found:', data.Search)
  return data.Search as Movie[]
}
