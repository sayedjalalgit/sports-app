const jwt = require('jsonwebtoken')
const env = require('../config/env')

const generateToken = (userId) => {
  return jwt.sign({ userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, env.jwtSecret)
}

module.exports = { generateToken, verifyToken }