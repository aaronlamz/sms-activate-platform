<template>
  <div class="register-page">
    <!-- 注册卡片 -->
    <div class="form-container">
      <el-card class="register-card">
        <el-form :model="registerForm" label-width="0px" @submit.native.prevent="handleRegister">
          <el-form-item>
            <el-input v-model="registerForm.username" placeholder="登录账号" clearable />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="登录密码"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="registerForm.password2"
              type="password"
              placeholder="再次输入"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" block @click="handleRegister"> 注册 </el-button>
          </el-form-item>
          <!-- 返回登录链接 -->
          <div class="bottom-link">
            <router-link to="/login">返回登录</router-link>
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
    return {
      registerForm: {
        username: '',
        password: '',
        password2: '',
      },
    }
  },
  methods: {
    handleRegister() {
      if (
        !this.registerForm.username ||
        !this.registerForm.password ||
        !this.registerForm.password2
      ) {
        this.$message.error('请填写完整信息')
        return
      }
      if (this.registerForm.password !== this.registerForm.password2) {
        this.$message.error('两次密码不一致')
        return
      }
      // TODO: 调用注册接口
      this.$message.success('注册成功')
      // this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
}

/* 注册卡片 */
.form-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.register-card {
  width: 320px;
  padding: 20px;
}
.bottom-link {
  text-align: right;
  margin-top: 8px;
  font-size: 14px;
}
</style>
