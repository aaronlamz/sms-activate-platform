const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userController = {
  // 注册
  async register(req, res) {
    try {
      const { username, password } = req.body
      console.log('Register request:', { username })

      // 检查用户是否已存在
      const existingUser = await User.findByUsername(username)
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' })
      }

      // 创建新用户
      const user = await User.create(username, password)

      // 生成 JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      })

      res.json({ token, user: { id: user.id, username: user.username } })
    } catch (err) {
      console.error('Register error:', err)
      res.status(500).json({ error: 'Error registering user' })
    }
  },

  // 登录
  async login(req, res) {
    try {
      const { username, password } = req.body
      console.log('Login request:', { username })

      // 查找用户
      const user = await User.findByUsername(username)
      if (!user) {
        console.log('User not found:', username)
        return res.status(400).json({ error: 'User not found' })
      }

      // 验证密码
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        console.log('Invalid password for user:', username)
        return res.status(400).json({ error: 'Invalid credentials' })
      }

      // 生成 JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      })

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          balance: user.balance,
          vip: user.vip,
        },
      })
    } catch (err) {
      console.error('Login error:', err)
      res.status(500).json({ error: 'Error logging in' })
    }
  },

  // 获取用户信息
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json({
        id: user.id,
        username: user.username,
        balance: user.balance,
        vip: user.vip,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error getting user profile' })
    }
  },

  // 更新余额
  async updateBalance(req, res) {
    try {
      const { amount } = req.body
      await User.updateBalance(req.user.id, amount)
      const user = await User.findById(req.user.id)
      res.json({ balance: user.balance })
    } catch (err) {
      res.status(500).json({ error: 'Error updating balance' })
    }
  },
}

module.exports = userController
