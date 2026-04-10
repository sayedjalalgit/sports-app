const express = require('express')
const router = express.Router()
const { getLiveMatches, getFixtures, getStandings } = require('../controllers/match.controller')
const { protect } = require('../middlewares/auth.middleware')

router.get('/live', protect, getLiveMatches)
router.get('/fixtures', protect, getFixtures)
router.get('/standings', protect, getStandings)

module.exports = router