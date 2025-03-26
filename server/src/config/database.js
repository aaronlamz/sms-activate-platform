const sqlite3 = require('sqlite3').verbose()
const path = require('path')
require('dotenv').config()

const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to database:', err)
  } else {
    console.log('Connected to SQLite database')
    initDatabase()
  }
})

function initDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    balance REAL DEFAULT 0,
    vip BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)
}

module.exports = db
