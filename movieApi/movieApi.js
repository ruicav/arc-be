const axios = require('axios')
const genreIdToNameMap = require('../constants/genres')
axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.params = {}
axios.defaults.params['api_key'] = ''

const mapGenreIdToName = genreId => genreIdToNameMap.get(genreId)

const movieApi = {
  upcoming: () => {
    return axios.get(
      '/movie/upcoming'
    )
      .then(response => {
        return response.data
      })
  },
  details: (movieId) => {
    return axios.get(
      `/movie/${movieId}`
    )
      .then(response => response.data)
  },
  search: (query) => {
    return axios.get(
      `/search/movie`,
      {
        params: {
          'query': query
        }
      }
    )
      .then(response => response.data)
  },
  mapGenreIdToName,
  mapMoviesGenres: movies =>
    [...movies].map(movie => ({
      ...movie,
      genres: [...movie.genre_ids].map(id=> mapGenreIdToName(id))
    }))
}

module.exports = movieApi