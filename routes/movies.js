const express = require('express')
const router = express.Router()

const movieApi = require('../movieApi/movieApi')

router.get('/upcoming', (req, res, next) => {
  movieApi.upcoming()
    .then(movies => res.status(200).json(movies))
})

router.get('/search', (req, res, next) => {
  movieApi.search(req.query.query)
    .then(movies => res.status(200).json(movies))
})

router.get('/:id', (req, res, next) => {
  movieApi.details(req.params.id)
    .then(movie => res.status(200).json(movie))
})

module.exports = router