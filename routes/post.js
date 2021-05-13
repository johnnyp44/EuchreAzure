const express = require('express')
const { getAllPosts } = require('../controllers/post')

const router = express.Router()

router.get('/', getAllPosts)

module.exports = router
