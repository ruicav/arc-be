const express = require('express')
const router = express.Router()

const movieApi = require('../movieApi/movieApi')

router.get('/upcoming', (req, res) => {
  movieApi.upcoming(req.query.page)
    .then(result => ({...result, results: movieApi.mapMoviesGenres(result.results)}))
    .then(result => ({...result, results: movieApi.includeImagePath(result.results)}))
    .then(response => res.status(200).json(response))
})

router.get('/search', (req, res) => {
  movieApi.search(req.query.query, req.query.page)
    .then(result => ({...result, results: [...result.results].filter(m => m.poster_path)}))
    .then(result => ({...result, results: movieApi.mapMoviesGenres(result.results)}))
    .then(result => ({...result, results: movieApi.includeImagePath(result.results)}))
    .then(response => res.status(200).json(response))
})

router.get('/:id', (req, res, next) => {
  movieApi.details(req.params.id)
    .then(movie => res.status(200).json(movie))
})

module.exports = router