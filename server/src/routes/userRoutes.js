const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

// 公开路由
router.post('/register', userController.register)
router.post('/login', userController.login)

// 需要认证的路由
router.get('/profile', auth, userController.getProfile)
router.post('/balance', auth, userController.updateBalance)

module.exports = router
