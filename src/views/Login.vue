<template>
  <div class="login-page">
    <!-- 登录卡片 -->
    <div class="form-container">
      <el-card class="login-card" shadow="never">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="60px"
          @submit.native.prevent="handleLogin"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username" placeholder="账号" clearable />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              clearable
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.remember">
              记住登录状态
              <small style="color: #999">(在公共设备上请勿勾选)</small>
            </el-checkbox>
          </el-form-item>
          <el-form-item style="margin-bottom: 10px">
            <el-button type="primary" style="width: 100%" @click="handleLogin">登录</el-button>
          </el-form-item>
          <!-- 注册账号链接 -->
          <div class="bottom-link">
            <router-link to="/register" class="register-link">注册账号</router-link>
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
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        const res = await loginApi({
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        this.$message.success('登录成功')
        localStorage.setItem('token', res.token)
        this.$router.push('/')
      } catch (error) {
        if (error === false) {
          // 表单验证失败
          return
        }
        console.error('登录错误：', error)
      }
    },
  },
}
</script>

<style scoped>
/* .login-page { */
/* min-height: calc(100vh - 260px);
  padding-top: 20px;
  background-color: #f5f5f5; */
/* } */

/* 登录卡片 */
.form-container {
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
}
.login-card {
  background: #fff;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.login-card :deep(.el-card__body) {
  padding: 30px 20px;
}
.bottom-link {
  text-align: center;
  margin-top: 15px;
}
.register-link {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}
.register-link:hover {
  color: #66b1ff;
}

/* 调整 Element UI 的默认样式 */
:deep(.el-form-item__label) {
  font-weight: normal;
  color: #606266;
  font-size: 14px;
  padding-right: 8px;
}
:deep(.el-input__inner) {
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
:deep(.el-input__inner):hover {
  border-color: #c0c4cc;
}
:deep(.el-input__inner):focus {
  border-color: #409eff;
}
:deep(.el-form-item) {
  margin-bottom: 22px;
}
:deep(.el-form-item__error) {
  padding-top: 4px;
}
:deep(.el-checkbox) {
  margin-left: 60px;
  color: #606266;
  font-size: 14px;
}
:deep(.el-button--primary) {
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
