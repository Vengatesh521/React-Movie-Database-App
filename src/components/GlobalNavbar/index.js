import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './index.css'

const GlobalNavbar = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
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

      <div className="search-container">
        <input type="text" placeholder="Search..." />
        <button className="search-button" type="button">
          🔍
        </button>
      </div>
    </nav>
  )
}

export default GlobalNavbar
