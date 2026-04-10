const { redisClient } = require('../config/redis')
const { generateOTP, getOTPKey } = require('../utils/otp.utils')
const { generateToken } = require('../utils/jwt.utils')
const { pool } = require('../config/db')

const sendOTP = async (phone) => {
  const otp = generateOTP()
  const key = getOTPKey(phone)

  await redisClient.setEx(key, 300, otp)

  console.log(`OTP for ${phone}: ${otp}`)

  return { 
    message: 'OTP sent successfully',
    otp: process.env.NODE_ENV === 'production' ? otp : otp
  }
}

const verifyOTP = async (phone, otp) => {
  const key = getOTPKey(phone)
  const storedOTP = await redisClient.get(key)

  if (!storedOTP) {
    throw { statusCode: 400, message: 'OTP expired. Please request a new one.' }
  }

  if (storedOTP !== otp) {
    throw { statusCode: 400, message: 'Invalid OTP.' }
  }

  await redisClient.del(key)

  const existing = await pool.query(
    'SELECT * FROM users WHERE phone = $1', [phone]
  )

  let user
  if (existing.rows.length > 0) {
    user = existing.rows[0]
  } else {
    const result = await pool.query(
      'INSERT INTO users (phone, created_at) VALUES ($1, NOW()) RETURNING *',
      [phone]
    )
    user = result.rows[0]
  }

  const token = generateToken(user.id)

  return { token, user }
}

module.exports = { sendOTP, verifyOTP }