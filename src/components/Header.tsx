import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

type HeaderProps = {
  query: string
  setQuery: (query: string) => void
  onSearch: () => void
  onHomeClick: () => void
}

function Header({ query, setQuery, onSearch, onHomeClick }: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__link" to="/" onClick={onHomeClick}>
          Home
        </Link>
        <Link className="header__link" to="/favourites">
          Favourites
        </Link>
        {user ? (
          <button
            className="header__link header__logout"
            type="button"
            onClick={() => {
              void logout()
            }}
          >
            Logout
          </button>
        ) : (
          <Link className="header__link" to="/auth">
            Login
          </Link>
        )}
      </nav>
      <form
        className="header__search"
        onSubmit={(event) => {
          event.preventDefault()
          onSearch()
        }}
      >
        <input
          className="header__search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          aria-label="Search"
        />
        <button className="header__search-button" type="submit">
          Search
        </button>
      </form>
    </header>
  )
}

export default Header
