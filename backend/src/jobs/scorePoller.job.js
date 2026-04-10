const cron = require('node-cron')
const { redisClient } = require('../config/redis')
const { getLiveMatches } = require('../integrations/apiFootball')

const startScorePoller = () => {
  cron.schedule('*/30 * * * * *', async () => {
    try {
      const matches = await getLiveMatches()
      await redisClient.setEx('live:matches', 30, JSON.stringify(matches))

      if (global.io) {
        global.io.emit('scores:updated', matches)
      }

      console.log(`Score poller: ${matches.length} live matches broadcast`)
    } catch (error) {
      console.error('Score poller error:', error.message)
    }
  })

  console.log('Score poller started')
}

module.exports = { startScorePoller }