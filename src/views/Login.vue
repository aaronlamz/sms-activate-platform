<template>
  <div class="login-page">
    <!-- 登录卡片 -->
    <div class="form-container">
      <el-card class="login-card" shadow="never">
        <!-- 登录表单 -->
        <el-form
          v-show="isLoginMode"
          :model="loginForm"
          :rules="loginRules"
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
          <div class="remember-box">
            <el-checkbox v-model="loginForm.remember">
              记住登录状态
              <small style="color: #999">(在公共设备上请勿勾选)</small>
            </el-checkbox>
          </div>
          <el-button type="primary" class="submit-btn" @click="handleLogin">登录</el-button>
          <div class="switch-mode">
            <span>还没有账号？</span>
            <a @click="switchMode">立即注册</a>
          </div>
        </el-form>

        <!-- 注册表单 -->
        <el-form
          v-show="!isLoginMode"
          :model="registerForm"
          :rules="registerRules"
          ref="registerForm"
          label-width="90px"
          @submit.native.prevent="handleRegister"
        >
          <el-form-item label="登录账号" prop="username">
            <el-input v-model="registerForm.username" placeholder="登录账号" clearable />
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="登录密码"
              clearable
              show-password
            />
          </el-form-item>
          <el-form-item label="再次输入" prop="password2">
            <el-input
              v-model="registerForm.password2"
              type="password"
              placeholder="再次输入"
              clearable
              show-password
            />
          </el-form-item>
          <el-button type="primary" class="submit-btn" @click="handleRegister">注册</el-button>
          <div class="switch-mode">
            <span>已有账号？</span>
            <a @click="switchMode">立即登录</a>
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
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      isLoginMode: true,
      loginForm: {
        username: '',
        password: '',
        remember: false,
      },
      registerForm: {
        username: '',
        password: '',
        password2: '',
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      registerRules: {
        username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        password2: [{ required: true, validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    switchMode() {
      this.isLoginMode = !this.isLoginMode
      // 切换时重置表单
      if (this.isLoginMode) {
        this.$refs.loginForm?.resetFields()
      } else {
        this.$refs.registerForm?.resetFields()
      }
    },
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        const res = await loginApi({
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        this.$message.success('登录成功')
        localStorage.setItem('smsToken', res.token)
        this.$router.push('/')
      } catch (error) {
        if (error === false) {
          // 表单验证失败
          return
        }
        console.error('登录错误：', error)
      }
    },
    async handleRegister() {
      try {
        await this.$refs.registerForm.validate()
        // TODO: 调用注册接口
        this.$message.success('注册成功')
        this.isLoginMode = true // 注册成功后切换到登录
      } catch (error) {
        if (error === false) {
          // 表单验证失败
          return
        }
        console.error('注册错误：', error)
      }
    },
  },
}
</script>

<style scoped>
/* 登录注册卡片 */
.form-container {
  width: 400px;
  margin: 0 auto;
  margin-top: 50px;
  transition: width 0.3s ease;
}

@media screen and (max-width: 1000px) {
  .form-container {
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
  }
}
.login-card {
  background: #fff;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.login-card :deep(.el-card__body) {
  padding: 30px 20px;
}
.remember-box {
  margin-bottom: 22px;
  margin-left: 15px;
}
.submit-btn {
  width: 100%;
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
  margin-bottom: 15px;
}
.switch-mode {
  text-align: center;
  color: #606266;
  font-size: 14px;
  touch-action: manipulation;
}
.switch-mode a {
  color: #409eff;
  cursor: pointer;
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: inline-block;
}
.switch-mode a:hover {
  color: #66b1ff;
  background-color: rgba(64, 158, 255, 0.1);
}
.switch-mode a:active {
  background-color: rgba(64, 158, 255, 0.2);
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
  color: #606266;
  font-size: 14px;
}
</style>
