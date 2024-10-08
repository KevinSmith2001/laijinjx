<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <el-card class="box-card" shadow="hover">
      <div class="dashboard-header">
        <h2>📊 仪表盘</h2>
      </div>
      <div class="dashboard-content">
        <!-- 您可以在此添加图表、统计数据等 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card class="data-card">
              <div class="data-title">总员工数</div>
              <div class="data-value">{{ totalEmployees }}</div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="data-card">
              <div class="data-title">待审批任务</div>
              <div class="data-value">{{ pendingTasks }}</div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="data-card">
              <div class="data-title">绩效平均分</div>
              <div class="data-value">{{ averageScore }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      totalEmployees: 120,
      pendingTasks: 15,
      averageScore: 85,
    };
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.box-card {
  border-radius: 15px;
}

.dashboard-header h2 {
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  color: transparent;
}

.data-card {
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
}

.data-title {
  font-size: 16px;
  color: #7f8c8d;
  margin-bottom: 10px;
}

.data-value {
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
