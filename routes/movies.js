const express = require('express')
const router = express.Router()

const movieApi = require('../movieApi/movieApi')

router.get('/upcoming', (req, res, next) => {
  movieApi.upcoming()
    .then(result => ({...result, results: movieApi.mapMoviesGenres(result.results)}))
    .then(result => movieApi.includeImagePath(result.results))
    .then(movies => res.status(200).json(movies))
})

router.get('/search', (req, res, next) => {
  movieApi.search(req.query.query)
    .then(result => ({...result, results: [...result.results].filter(m => m.poster_path)}))
    .then(result => ({...result, results: movieApi.mapMoviesGenres(result.results)}))
    .then(result => movieApi.includeImagePath(result.results))
    .then(movies => res.status(200).json(movies))
})

router.get('/:id', (req, res, next) => {
  movieApi.details(req.params.id)
    .then(movie => res.status(200).json(movie))
})

module.exports = router