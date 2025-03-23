<template>
  <div class="register-page">
    <!-- 注册卡片 -->
    <div class="form-container">
      <el-card class="register-card" shadow="never">
        <el-form
          :model="registerForm"
          :rules="rules"
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
          <el-form-item style="margin-bottom: 10px">
            <el-button type="primary" style="width: 100%" @click="handleRegister">注册</el-button>
          </el-form-item>
          <!-- 返回登录链接 -->
          <div class="bottom-link">
            <router-link to="/login" class="login-link">返回登录</router-link>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
      registerForm: {
        username: '',
        password: '',
        password2: '',
      },
      rules: {
        username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        password2: [{ required: true, validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    async handleRegister() {
      try {
        await this.$refs.registerForm.validate()
        // TODO: 调用注册接口
        this.$message.success('注册成功')
        this.$router.push('/login')
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
.register-page {
  min-height: calc(100vh - 260px);
  padding-top: 20px;
  background-color: #f5f5f5;
}

/* 注册卡片 */
.form-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.register-card {
  width: 380px;
  background: #fff;
  border: none;
}
.register-card :deep(.el-card__body) {
  padding: 30px 35px;
}
.bottom-link {
  text-align: center;
  margin-top: 15px;
}
.login-link {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}
.login-link:hover {
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
:deep(.el-button--primary) {
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
