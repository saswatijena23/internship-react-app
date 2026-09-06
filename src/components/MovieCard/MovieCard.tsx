import type { Movie } from '../../types'
import './MovieCard.css'

type MovieCardProps = {
  movie: Movie
  favouriteLabel?: string
  onFavouriteClick?: (movie: Movie) => void
}

function MovieCard({
  movie,
  favouriteLabel = 'Favourite',
  onFavouriteClick,
}: MovieCardProps) {
  return (
    <article className="movie-card">
      {movie.Poster !== 'N/A' ? (
        <img
          className="movie-card__poster"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
      ) : (
        <div className="movie-card__poster movie-card__poster--placeholder">
          No poster
        </div>
      )}
      <div className="movie-card__body">
        <h2 className="movie-card__title">{movie.Title}</h2>
        <p className="movie-card__meta">{movie.Year}</p>
        <p className="movie-card__meta">{movie.Type}</p>
        <button
          className="movie-card__favourite"
          type="button"
          onClick={() => onFavouriteClick?.(movie)}
        >
          {favouriteLabel}
        </button>
      </div>
    </article>
  )
}

export default MovieCard
