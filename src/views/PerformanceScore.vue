<!-- src/views/PerformanceScore.vue -->
<template>
  <div class="performance-score">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="clearfix">
          <span class="card-title">📊 360 度绩效评分</span>
          <el-button type="primary" @click="submitScores" class="submit-button">
            提交评分结果 📤
          </el-button>
        </div>
      </template>
      <el-form :model="evaluator" label-width="100px" class="evaluator-form">
        <el-form-item label="评价者类型">
          <el-select v-model="evaluator.type" placeholder="请选择评价者类型">
            <el-option label="上级" value="上级"></el-option>
            <el-option label="同级" value="同级"></el-option>
            <el-option label="下级" value="下级"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table :data="employees" stripe border class="rounded-table" style="width: 100%">
        <el-table-column prop="Name" label="姓名"></el-table-column>
        <el-table-column prop="PersonalNum" label="工号"></el-table-column>
        <el-table-column prop="PositionName" label="岗位"></el-table-column>
        <el-table-column label="绩效评分">
          <template #default="{ row }">
            <el-select v-model="row.ScoreLevel" placeholder="请选择评分等级">
              <el-option label="A" value="A"></el-option>
              <el-option label="B" value="B"></el-option>
              <el-option label="C" value="C"></el-option>
              <el-option label="D" value="D"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="评分意见">
          <template #default="{ row }">
            <el-input type="textarea" v-model="row.Feedback" placeholder="请输入评分意见"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PerformanceScore',
  data() {
    return {
      evaluator: {
        type: '',
      },
      employees: [
        {
          GUID: '1',
          Name: '张三',
          PersonalNum: '1001',
          PositionName: '软件工程师',
          ScoreLevel: '',
          Feedback: '',
        },
        {
          GUID: '2',
          Name: '李四',
          PersonalNum: '1002',
          PositionName: '测试工程师',
          ScoreLevel: '',
          Feedback: '',
        },
        // 更多员工数据
      ],
    };
  },
  methods: {
    submitScores() {
      if (!this.evaluator.type) {
        this.$message.warning('请先选择评价者类型');
        return;
      }
      const incomplete = this.employees.some((emp) => !emp.ScoreLevel);
      if (incomplete) {
        this.$message.warning('请先为所有员工打分');
        return;
      }
      // 模拟提交操作
      this.$message.success('提交评分结果成功 🎉');
      console.log('评价者类型：', this.evaluator.type);
      console.log('评分数据：', this.employees);
    },
  },
};
</script>

<style scoped>
.performance-score {
  padding: 20px;
}

.box-card {
  border-radius: 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #e74c3c, #f1c40f);
  -webkit-background-clip: text;
  color: transparent;
}

.submit-button {
  float: right;
}

.rounded-table {
  border-radius: 10px;
  overflow: hidden;
}

.evaluator-form {
  margin-bottom: 20px;
}
</style>
