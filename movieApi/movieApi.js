const axios = require('axios')
const genreIdToNameMap = require('../constants/genreIdToNameMap')
const { baseImageURL, quality } = require('../constants/imagePath')
axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.params = {}
axios.defaults.params['api_key'] = '1f54bd990f1cdfb230adb312546d765d'


const mapGenreIdToName = genreId => genreIdToNameMap.get(String(genreId))
const formatImagePath = movie => ({ ...movie, image_path: `${baseImageURL+quality+movie.poster_path}`})

const movieApi = {
  upcoming: (page) => {
    return axios.get(
      '/movie/upcoming',
      {
        params: {page}
      }
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
  search: (query, page) => {
    return axios.get(
      `/search/movie`,
      {
        params: {
          'query': query,
          'page': page
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
    })),
  formatImagePath,
  includeImagePath: movies => 
    [...movies].map(movie => formatImagePath(movie))
}

module.exports = movieApi