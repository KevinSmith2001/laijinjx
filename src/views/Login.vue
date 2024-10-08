<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">🌟 欢迎登录来金绩效考核系统 🌟</h1>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-position="left">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
              prefix-icon="el-icon-lock"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              round
              @click="handleLogin"
              :loading="loading"
              class="login-button"
          >
            登录 🚀
          </el-button>
        </el-form-item>
        <div class="register-link">
          还没有账号？<router-link to="/register">立即注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const loginForm = reactive({
      username: '',
      password: '',
    });
    const rules = {
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    };
    const loginFormRef = ref(null);
    const loading = ref(false);

    const handleLogin = () => {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          setTimeout(() => {
            loading.value = false;
            if (loginForm.username === 'root' && loginForm.password === 'root') {
              localStorage.setItem('isAuthenticated', 'true');
              router.push('/dashboard');
            } else {
              ElMessage.error('用户名或密码错误，请重试 😢');
            }
          }, 1000);
        }
      });
    };

    return {
      loginForm,
      rules,
      loginFormRef,
      loading,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #81ecec, #74b9ff);
  height: 100vh;
}

.login-container {
  width: 400px;
  padding: 40px 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #e74c3c, #8e44ad);
  -webkit-background-clip: text;
  color: transparent;
}

.el-input .el-input__inner {
  border-radius: 30px;
  height: 45px;
}

.el-button.login-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
  border-radius: 30px;
}

.register-link {
  text-align: center;
  margin-top: 10px;
}

.register-link a {
  color: #3498db;
}
</style>
