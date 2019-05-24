const movieApi = require('../movieApi/movieApi') 
const nock = require('nock')
const assert = require('assert')

const mockUpcomingMovies = require('./constants/mockUpcomingMovies.json')
const mockMovieDetails = require('./constants/mockMovieDetails.json')
const mockMoviesSearchResult = require('./constants/mockMovieSearch.json')

describe('Movies API', function() {
  const movieDbURL = 'https://api.themoviedb.org/3'

  const mockMovieId = 458156
  const mockMoviesSearch = 'godfather'

  beforeEach(() => {
    nock(movieDbURL)
      .get(`/movie/upcoming`)
      .query(true)
      .reply(200, mockUpcomingMovies)
    
    nock(movieDbURL)
      .get(`/movie/${mockMovieId}`)
      .query(true)
      .reply(200, mockMovieDetails)
      
    nock(movieDbURL)
      .get(`/search/movie`)
      .query(queryObj => {
        return queryObj.query === mockMoviesSearch
      })
      .reply(200, mockMoviesSearchResult)
  })

  it('should get upcoming movies', () => {
    return movieApi.upcoming()
      .then(movies => {
        assert.deepEqual(movies, mockUpcomingMovies)
      })
  })

  it('should get movie details', () => {
    return movieApi.details(mockMovieId)
      .then(movie => {
        assert.deepEqual(movie, mockMovieDetails)
      })
  })

  it('should search movies by name', () => {
    return movieApi.search(mockMoviesSearch)
      .then(movies => {
        assert.deepEqual(movies, mockMoviesSearchResult)
      })
  })

  it('should map genres ids to genres names', () => {
    return movieApi.upcoming()
      .then(result => movieApi.mapMoviesGenres(result.results))
      .then(movies => {
        [...movies]
          .forEach(movie => 
            [...movie.genre_ids]
              .forEach(
                genreId=>assert([...movie.genres].includes(movieApi.mapGenreIdToName(genreId)
                ))))
      })
  })

  it('should include image_pat in movies', () => {
    return movieApi.upcoming()
      .then(result => movieApi.includeImagePath(result.results))
      .then(movies => [...movies].forEach(movie => assert(movieApi.formatImagePath(movie))))
  })
})