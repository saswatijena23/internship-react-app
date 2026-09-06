import { Route, Routes } from 'react-router-dom'
import { GuestRoute, ProtectedRoute } from './components/AuthRoute'
import Header from './components/Header'
import AuthView from './pages/Auth/AuthView'
import FavouritesView from './pages/Favourites/FavouritesView'
import HomeView from './pages/Home/HomeView'
import { useHomeViewModel } from './pages/Home/useHomeViewModel'

function App() {
  const {
    query,
    setQuery,
    movies,
    loading,
    error,
    handleSearch,
    handleFavourite,
    loadInitialMovies,
  } = useHomeViewModel()

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onHomeClick={loadInitialMovies}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              movies={movies}
              loading={loading}
              error={error}
              onFavourite={handleFavourite}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <FavouritesView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <GuestRoute>
              <AuthView />
            </GuestRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
