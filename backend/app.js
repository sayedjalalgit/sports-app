const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { errorHandler, notFound } = require('./src/middlewares/error.middleware')

const app = express()

app.use(helmet())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRoutes = require('./src/routes/auth.routes')
const matchRoutes = require('./src/routes/match.routes')
const { protect } = require('./src/middlewares/auth.middleware')

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Sports app server is running',
    timestamp: new Date().toISOString(),
  })
})

app.get('/api/test-protected', protect, (req, res) => {
  res.json({ success: true, message: `Hello user ${req.userId}` })
})

app.use('/api/auth', authRoutes)
app.use('/api/matches', matchRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app