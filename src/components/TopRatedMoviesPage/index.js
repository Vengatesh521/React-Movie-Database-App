// components/TopRatedMoviesPage.js
import React from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination'
import './index.css'

class TopRatedMoviesPage extends React.Component {
  state = {
    isLoading: true,
    topRatedMovieResponse: {
      totalPages: 0,
      totalResults: 0,
      results: [],
    },
  }

  componentDidMount() {
    this.getTopRatedMoviesResponse()
  }

  getUpdateData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getTopRatedMoviesResponse = async (page = 1) => {
    const API_KEY = '253f43a52ae817ca16ff416024ce3301'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      const newData = this.getUpdateData(data)
      this.setState({isLoading: false, topRatedMovieResponse: newData})
    } catch (error) {
      console.error('Error fetching top rated movies:', error)
      this.setState({isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderTopRatedMoviesList = () => {
    const {topRatedMovieResponse} = this.state
    const {results} = topRatedMovieResponse

    return (
      <div className="container movie-container">
        <div className="row row-cols-lg-6 row-cols-md-4 row-cols-sm-3 row-cols-2 g-3">
          {results.map(movie => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              style={{textDecoration: 'none'}}
            >
              <div className="col">
                <div className="movie-card">
                  <img
                    className="movie-image"
                    src={movie.posterPath}
                    alt={movie.title}
                  />
                  <h1 className="movie-title">{movie.title}</h1>
                  <p className="movie-release">Rating: {movie.voteAverage}</p>
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

  render() {
    const {isLoading, topRatedMovieResponse} = this.state

    return (
      <div className="container">
        {isLoading ? this.renderLoadingView() : this.renderTopRatedMoviesList()}
        <Pagination
          totalPages={topRatedMovieResponse.totalPages}
          apiCallback={this.getTopRatedMoviesResponse}
        />
      </div>
    )
  }
}

export default TopRatedMoviesPage
