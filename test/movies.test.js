const movieApi = require('../movieApi/movieApi') 
const nock = require('nock')
const assert = require('assert')

const mockUpcomingMovies = require('./constants/mockUpcomingMovies.json')
const mockMovieDetails = require('./constants/mockMovieDetails.json')
const mockMoviesSearchResult = require('./constants/mockMovieSearch.json')

describe('Movies Controller API', function() {
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

  it('GET Upcoming movies', () => {
    return movieApi.upcoming()
      .then(movies => {
        assert.deepEqual(movies, mockUpcomingMovies)
      })
  })

  it('GET movie details', () => {
    return movieApi.details(mockMovieId)
      .then(movie => {
        assert.deepEqual(movie, mockMovieDetails)
      })
  })

  it('GET movies by name', () => {
    return movieApi.search(mockMoviesSearch)
      .then(movies => {
        assert.deepEqual(movies, mockMoviesSearchResult)
      })
  })
})