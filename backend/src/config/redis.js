const { createClient } = require('redis')
const env = require('./env')

const redisClient = createClient({
  url: env.redisUrl,
})

redisClient.on('error', (err) => {
  console.error('Redis error:', err.message)
})

redisClient.on('connect', () => {
  console.log('Redis connected')
})

const connectRedis = async () => {
  try {
    await redisClient.connect()
  } catch (error) {
    console.error('Redis connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = { redisClient, connectRedis }