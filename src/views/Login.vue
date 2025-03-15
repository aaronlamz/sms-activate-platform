<template>
  <div class="login-page">
    <!-- 顶部蓝色Banner -->
    <header class="header-banner">
      <div class="banner-content">
        <!-- 顶部图标，可替换为你的实际图标 -->
        <img class="icon" src="https://via.placeholder.com/60x60.png?text=Shield" alt="icon" />
        <h1>闪电接码</h1>
        <p>接码短信平台集合实卡短信接码</p>
      </div>
    </header>

    <!-- 登录卡片 -->
    <div class="form-container">
      <el-card class="login-card">
        <el-form :model="loginForm" label-width="0px" @submit.native.prevent="handleLogin">
          <el-form-item>
            <el-input v-model="loginForm.username" placeholder="账号" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" type="password" placeholder="密码" clearable />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.remember">
              记住登录状态
              <small style="color: #999">(在公共设备上请勿勾选)</small>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" block @click="handleLogin"> 登录 </el-button>
          </el-form-item>
          <!-- 注册账号链接 -->
          <div class="bottom-link">
            <router-link to="/register">注册账号</router-link>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        remember: false,
      },
    }
  },
  methods: {
    async handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.error('请输入账号和密码')
        return
      }
      try {
        const res = await loginApi({
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        this.$message.success('登录成功')
        // 例如保存 token
        localStorage.setItem('token', res.token)
        this.$router.push('/')
      } catch (error) {
        // 错误已在 request.js 拦截器中处理，也可以在此处进一步处理
        console.error('登录错误：', error)
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 顶部蓝色Banner */
.header-banner {
  background: #0052d9;
  color: #fff;
  text-align: center;
  padding: 40px 20px;
}
.banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}
.banner-content h1 {
  margin: 0;
  font-size: 24px;
}
.banner-content p {
  margin: 8px 0 0;
  font-size: 14px;
}

/* 登录卡片 */
.form-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.login-card {
  width: 320px;
  padding: 20px;
}
.bottom-link {
  text-align: right;
  margin-top: 8px;
  font-size: 14px;
}
</style>
