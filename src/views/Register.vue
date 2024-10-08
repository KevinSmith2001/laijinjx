<!-- src/views/Register.vue -->
<template>
  <div class="register-page">
    <div class="register-container">
      <h1 class="register-title">📝 注册来金绩效考核系统</h1>
      <el-form :model="registerForm" :rules="rules" ref="registerFormRef" label-position="left">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱" prefix-icon="el-icon-message">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="registerForm.password"
              placeholder="请输入密码"
              show-password
              prefix-icon="el-icon-lock"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
              v-model="registerForm.confirmPassword"
              placeholder="请确认密码"
              show-password
              prefix-icon="el-icon-lock"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              round
              @click="handleRegister"
              :loading="loading"
              class="register-button"
          >
            注册 ✨
          </el-button>
        </el-form-item>
        <div class="login-link">
          已有账号？<router-link to="/login">立即登录</router-link>
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
  name: 'Register',
  setup() {
    const router = useRouter();
    const registerForm = reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const rules = {
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
          validator: (rule, value, callback) => {
            if (value !== registerForm.password) {
              callback(new Error('两次输入的密码不一致'));
            } else {
              callback();
            }
          },
          trigger: 'blur',
        },
      ],
    };
    const registerFormRef = ref(null);
    const loading = ref(false);

    const handleRegister = () => {
      registerFormRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          setTimeout(() => {
            loading.value = false;
            ElMessage.success('注册成功，请登录！ 🎉');
            router.push('/login');
          }, 1000);
        }
      });
    };

    return {
      registerForm,
      rules,
      registerFormRef,
      loading,
      handleRegister,
    };
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  height: 100vh;
}

.register-container {
  width: 400px;
  padding: 40px 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.register-title {
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

.el-button.register-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
  border-radius: 30px;
}

.login-link {
  text-align: center;
  margin-top: 10px;
}

.login-link a {
  color: #3498db;
}
</style>
