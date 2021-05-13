const express = require('express')
const { getAllGames } = require('../controllers/game')

const router = express.Router()

router.get('/', getAllGames)

module.exports = router
