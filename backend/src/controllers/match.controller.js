const matchService = require('../services/match.service')
const { sendSuccess } = require('../utils/response.utils')

const getLiveMatches = async (req, res, next) => {
  try {
    const matches = await matchService.getCachedLiveMatches()
    sendSuccess(res, matches, 'Live matches fetched')
  } catch (error) {
    next(error)
  }
}

const getFixtures = async (req, res, next) => {
  try {
    const fixtures = await matchService.getCachedFixtures()
    sendSuccess(res, fixtures, 'Fixtures fetched')
  } catch (error) {
    next(error)
  }
}

const getStandings = async (req, res, next) => {
  try {
    const standings = await matchService.getCachedStandings()
    sendSuccess(res, standings, 'Standings fetched')
  } catch (error) {
    next(error)
  }
}

module.exports = { getLiveMatches, getFixtures, getStandings }