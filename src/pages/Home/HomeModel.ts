import { searchMovies } from '../../services/omdbMovieService'
import type { Movie } from '../../types'
import { saveFavourite } from '../Favourites/FavouritesModel'

const SEED_KEYWORDS = [
  'Batman',
  'Avengers',
  'Harry Potter',
  'Star Wars',
  'Spider-Man',
  'Marvel',
  'Disney',
  'Matrix',
  'Lord of the Rings',
  'Fast',
  'Mission Impossible',
  'Pixar',
  'Horror',
  'Comedy',
  'Action',
]

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

export async function getMovies(query: string): Promise<Movie[]> {
  const cleanedQuery = query.trim()

  if (cleanedQuery.length < 2) {
    throw new Error('Search query must contain at least two characters')
  }

  return searchMovies(cleanedQuery)
}

export async function initialMovies(): Promise<Movie[]> {
  const selectedKeywords = shuffle(SEED_KEYWORDS).slice(0, 6)

  const results = await Promise.all(
    selectedKeywords.map(async (keyword) => {
      try {
        return await searchMovies(keyword)
      } catch {
        return [] as Movie[]
      }
    }),
  )

  const merged = results.flat()
  const uniqueMovies = [
    ...new Map(merged.map((movie) => [movie.imdbID, movie])).values(),
  ]
  const shuffledMovies = shuffle(uniqueMovies)

  return shuffledMovies.slice(0, 20)
}

export async function addMovieToFavourites(
  userId: string,
  movie: Movie,
): Promise<void> {
  return saveFavourite(userId, movie)
}
