const { redisClient } = require('../config/redis')
const { getLiveMatches, getFixtures, getStandings } = require('../integrations/apiFootball')

const getCachedLiveMatches = async () => {
  const cached = await redisClient.get('live:matches')
  if (cached) return JSON.parse(cached)
  const matches = await getLiveMatches()
  await redisClient.setEx('live:matches', 30, JSON.stringify(matches))
  return matches
}

const getCachedFixtures = async () => {
  const cached = await redisClient.get('fixtures:epl')
  if (cached) return JSON.parse(cached)
  const fixtures = await getFixtures()
  await redisClient.setEx('fixtures:epl', 3600, JSON.stringify(fixtures))
  return fixtures
}

const getCachedStandings = async () => {
  const cached = await redisClient.get('standings:epl')
  if (cached) return JSON.parse(cached)
  const standings = await getStandings()
  await redisClient.setEx('standings:epl', 3600, JSON.stringify(standings))
  return standings
}

module.exports = { getCachedLiveMatches, getCachedFixtures, getCachedStandings }