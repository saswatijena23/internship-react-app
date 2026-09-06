import MovieCard from '../../components/MovieCard/MovieCard'
import type { Movie } from '../../types'
import './HomeView.css'

type HomeViewProps = {
  movies: Movie[]
  loading: boolean
  error: string | null
  onFavourite: (movie: Movie) => void
}

function HomeView({ movies, loading, error, onFavourite }: HomeViewProps) {
  return (
    <main className="home">
      {loading && <p className="home__status">Loading...</p>}

      {error && <p className="home__error">{error}</p>}

      <ul className="home__grid">
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <MovieCard movie={movie} onFavouriteClick={onFavourite} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default HomeView
