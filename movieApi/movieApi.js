const axios = require('axios')

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.params = {}
axios.defaults.params['api_key'] = ''

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
  }
}

module.exports = movieApi