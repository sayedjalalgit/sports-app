require('dotenv').config({ path: require('path').join(__dirname, '../../.env') })
const { Pool } = require('pg')

const isSupabase = process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isSupabase ? { rejectUnauthorized: false } : false
})

const connectDB = async () => {
  try {
    const client = await pool.connect()
    await client.query('SELECT 1')
    client.release()
    console.log('PostgreSQL connected')
  } catch (error) {
    console.error('PostgreSQL connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = { pool, connectDB }