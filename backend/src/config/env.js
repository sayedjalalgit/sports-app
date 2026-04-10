require('dotenv').config()

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  apiFootballKey: process.env.API_FOOTBALL_KEY,
  scorebatToken: process.env.SCOREBAT_TOKEN,
}

const required = ['databaseUrl', 'redisUrl', 'jwtSecret']

required.forEach((key) => {
  if (!env[key]) {
    console.error(`Missing required env variable: ${key}`)
    process.exit(1)
  }
})

module.exports = env