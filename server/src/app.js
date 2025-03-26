const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// 中间件
app.use(cors())
app.use(express.json())

// 路由
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something broke!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
