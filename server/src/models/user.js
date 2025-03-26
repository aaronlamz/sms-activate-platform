const db = require('../config/database')
const bcrypt = require('bcryptjs')

class User {
  static async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve({ id: this.lastID, username })
          }
        }
      )
    })
  }

  static async findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  static async updateBalance(userId, amount) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE users SET balance = balance + ? WHERE id = ?',
        [amount, userId],
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve({ success: true })
          }
        }
      )
    })
  }
}

module.exports = User
