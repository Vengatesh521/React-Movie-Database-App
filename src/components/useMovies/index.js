// hooks/useMovies.js
import {useState, useEffect} from 'react'

const useMovies = (endpoint, initialPage = 1) => {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_KEY = '253f43a52ae817ca16ff416024ce3301'
  const BASE_URL = 'https://api.themoviedb.org/3/movie/'

  const fetchMovies = async page => {
    try {
      setLoading(true)
      const response = await fetch(
        `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=${page}`,
      )
      if (!response.ok) throw new Error('Failed to fetch movies')
      const data = await response.json()
      setMovies(data.results)
      setTotalPages(data.total_pages)
      setCurrentPage(page) // Ensure currentPage is updated
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(currentPage)
  }, [currentPage])

  return {movies, totalPages, currentPage, setCurrentPage, loading, error}
}

export default useMovies
