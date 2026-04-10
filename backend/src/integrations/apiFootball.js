const axios = require('axios')

const sportsDB = axios.create({
  baseURL: 'https://www.thesportsdb.com/api/v1/json/3'
})

const getLiveMatches = async () => {
  try {
    const response = await sportsDB.get('/livescore.php')
    return response.data.events || []
  } catch (error) {
    return []
  }
}

const getFixtures = async () => {
  try {
    const response = await sportsDB.get('/eventsnextleague.php?id=4328')
    if (response.data.events) return response.data.events

    const response2 = await sportsDB.get('/eventsnextleague.php?id=4396')
    return response2.data.events || []
  } catch (error) {
    return []
  }
}

const getStandings = async () => {
  try {
    const response = await sportsDB.get('/lookuptable.php?l=4328&s=2024-2025')
    return response.data.standings || []
  } catch (error) {
    return []
  }
}

module.exports = { getLiveMatches, getFixtures, getStandings }