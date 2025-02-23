import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const TopRatedMoviesPage = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/top_rated?api_key=253f43a52ae817ca16ff416024ce3301&language=en-US&page=1',
        )
        if (!response.ok) throw new Error('Failed to fetch movies')
        const data = await response.json()
        setMovies(data.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <div className="container movie-container">
      <div className="row  row-cols-lg-6 row-cols-md-4 row-cols-sm-3 row-cols-2 g-3">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} style={{textDecoration: 'none'}}>
            <div className="col " key={movie.id}>
              {' '}
              {/* Use .movie-card */}
              <div className="movie-card">
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h1 className="movie-title">{movie.title}</h1>
                <h1 className="movie-release">{movie.vote_average}</h1>
                <button type="button" className="movie-button">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default TopRatedMoviesPage
