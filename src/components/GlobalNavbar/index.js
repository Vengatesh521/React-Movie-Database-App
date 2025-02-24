import {useState} from 'react'
import {Link, useLocation, useHistory} from 'react-router-dom'
import './index.css'

const GlobalNavbar = () => {
  const location = useLocation()
  const history = useHistory()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      history.push(`/searched?query=${searchQuery}`)
      setSearchOpen(false)
    }
  }

  return (
    <>
      <nav className="nav">
        <h1 className="h1">movieDB</h1>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${
              location.pathname === '/' ? 'active-tab' : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Popular
          </Link>
          <Link
            to="/top-rated"
            className={`nav-link ${
              location.pathname === '/top-rated' ? 'active-tab' : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Top Rated
          </Link>
          <Link
            to="/upcoming"
            className={`nav-link ${
              location.pathname === '/upcoming' ? 'active-tab' : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Upcoming
          </Link>
        </div>

        {/* Search Button */}
        <button
          type="button"
          className="search-toggle-button"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          🔍
        </button>
      </nav>

      {/* Search Input Below Navbar */}
      {searchOpen && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button
            className="search-button"
            type="button"
            onClick={handleSearch}
          >
            🔍
          </button>
        </div>
      )}
    </>
  )
}

export default GlobalNavbar
