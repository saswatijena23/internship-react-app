import MovieCard from '../../components/MovieCard/MovieCard'
import { useFavouritesViewModel } from './useFavouritesViewModel'
import './FavouritesView.css'

function FavouritesView() {
  const { favourites, loading, error, removeMovie } = useFavouritesViewModel()

  return (
    <main className="favourites">
      {loading && <p className="favourites__status">Loading...</p>}

      {error && <p className="favourites__error">{error}</p>}

      {!loading && !error && favourites.length === 0 && (
        <p className="favourites__empty">
          No favourites yet. Add movies from the Home screen to see them here.
        </p>
      )}

      <ul className="favourites__grid">
        {favourites.map((movie) => (
          <li key={movie.imdbID}>
            <MovieCard
              movie={movie}
              favouriteLabel="Remove"
              onFavouriteClick={() => {
                void removeMovie(movie.imdbID)
              }}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default FavouritesView
