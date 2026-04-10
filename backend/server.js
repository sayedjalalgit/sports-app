require('dotenv').config()

const http = require('http')
const { Server } = require('socket.io')
const app = require('./app')
const { connectDB } = require('./src/config/db')
const { connectRedis } = require('./src/config/redis')
const { startScorePoller } = require('./src/jobs/scorePoller.job')
const env = require('./src/config/env')

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
})

global.io = io

const startServer = async () => {
  try {
    await connectDB()
    await connectRedis()
    startScorePoller()

    server.listen(env.port, '0.0.0.0', () => {
      console.log(`Server running on port ${env.port}`)
      console.log(`Health check: http://localhost:${env.port}/health`)
    })
    
  } catch (error) {
    console.error('Server failed to start:', error.message)
    process.exit(1)
  }
}

startServer()