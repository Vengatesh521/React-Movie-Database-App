// components/PopularMoviesPage.js
import React from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination'
import useMovies from '../useMovies'
import './index.css'

const PopularMoviesPage = () => {
  const {
    movies,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
  } = useMovies('popular')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container movie-container">
      <div className="row row-cols-lg-6 row-cols-md-4 row-cols-sm-3 row-cols-2 g-3">
        {movies.map(movie => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            style={{textDecoration: 'none'}}
          >
            <div className="col">
              <div className="movie-card">
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h1 className="movie-title">{movie.title}</h1>
                <p className="movie-release">Rating: {movie.vote_average}</p>
                <button type="button" className="movie-button">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default PopularMoviesPage
