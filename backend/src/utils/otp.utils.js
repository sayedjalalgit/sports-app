const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const getOTPKey = (phone) => {
  return `otp:${phone}`
}

module.exports = { generateOTP, getOTPKey }