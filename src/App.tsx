
import { useEffect, useState } from 'react'
import './App.css'
import { HeroBanner } from './components/heroBanner'
import Search from './components/Search'
import Spinner from './components/Spinner'
import Moviecard from './components/Moviecard'
import type { Movie } from './types'
import {useDebounce} from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite'
// import { motion } from 'framer-motion';

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: 'application/json',
    authorization: `bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")


  useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm])

  const fetchMovies = async (query = "") => {
    setIsLoading(true)
    setErrorMessage("")

    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error("Failed to fetch movies")
      }
      const data = await response.json()
      
      if (data.success === false) {
        setErrorMessage(data.Error || "Failed to fetch movies")
        setMovieList([])
        return;
      }
      setMovieList(data.results || [])

      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0])
      }
  
    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()

      setTrendingMovies(movies)
    } catch (error) {
      console.error(`Error fetching trending movies ${error}`)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])
  
  return(
    <>
    <div className='pattern'/>
    <div className='wrapper'>
      <header >
        <HeroBanner/>
        <h2>Find <span className='text-gradient'>movies</span> you'll enjoy <br/> without the hassle </h2>
      </header>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      {trendingMovies.length > 0 && (
        <section className='trending'>
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt= {movie.title} />
              </li>
            ))}
          </ul>
        </section>
      )}
      
      <section className='all-movies'>
        <h2>ALL MOVIES</h2>

        {isLoading?(<Spinner/>): 
        errorMessage? (<p className='text-red-500'>{errorMessage}</p>):
        <ul>
          {movieList.map((movie) => (
            <Moviecard key={movie.id} movie={movie}/>
          ))}
        </ul>}
      </section>
    </div>


    </>
  )
}

export default App
