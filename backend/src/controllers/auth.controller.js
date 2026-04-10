const authService = require('../services/auth.service')
const { sendSuccess, sendError } = require('../utils/response.utils')

const sendOTP = async (req, res, next) => {
  try {
    const { phone } = req.body
    if (!phone) return sendError(res, 'Phone number is required', 400)

    const result = await authService.sendOTP(phone)
    sendSuccess(res, result, 'OTP sent')
  } catch (error) {
    next(error)
  }
}

const verifyOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body
    if (!phone || !otp) return sendError(res, 'Phone and OTP are required', 400)

    const result = await authService.verifyOTP(phone, otp)
    sendSuccess(res, result, 'Login successful')
  } catch (error) {
    next(error)
  }
}

module.exports = { sendOTP, verifyOTP }