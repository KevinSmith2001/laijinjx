<!-- src/views/Profile.vue -->
<template>
  <div class="profile">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="card-title">👤 个人中心</span>
      </template>
      <el-form :model="user" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="user.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="user.employeeNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="user.department" disabled></el-input>
        </el-form-item>
        <el-form-item label="岗位">
          <el-input v-model="user.position" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改密码">
          <el-button type="primary" @click="openChangePasswordDialog">
            修改密码 🔒
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px">
      <el-form :model="passwordForm" :rules="rules" ref="passwordFormRef" label-width="100px">
        <el-form-item label="当前密码" prop="currentPassword">
          <el-input type="password" v-model="passwordForm.currentPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="passwordForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="changePassword">确认修改</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        name: '张三',
        employeeNumber: '1001',
        department: '技术部',
        position: '软件工程师',
      },
      dialogVisible: false,
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        currentPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.passwordForm.newPassword) {
                callback(new Error('两次输入的新密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    openChangePasswordDialog() {
      this.dialogVisible = true;
      this.passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      };
    },
    changePassword() {
      this.$refs.passwordFormRef.validate((valid) => {
        if (valid) {
          // 模拟修改密码操作
          this.$message.success('密码修改成功 🔒');
          this.dialogVisible = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.profile {
  padding: 20px;
}

.box-card {
  border-radius: 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #f39c12, #d35400);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
