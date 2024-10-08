<!-- src/views/PerformanceTask.vue -->
<template>
  <div class="performance-task">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="clearfix">
          <span class="card-title">📩 绩效指标制定任务下发</span>
          <el-button type="primary" @click="releaseTasks" class="release-button">
            批量下发任务 🚀
          </el-button>
        </div>
      </template>
      <el-table
          :data="tasks"
          stripe
          border
          class="rounded-table"
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="OrganisationName" label="部门名称"></el-table-column>
        <el-table-column prop="AppraisalProgramName" label="考核方案"></el-table-column>
        <el-table-column prop="ReleaseDate" label="任务下达日期"></el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-tag :type="row.FinishedState ? 'success' : 'info'">
              {{ row.FinishedState ? '已下发' : '未下发' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="releaseTask(row)" :disabled="row.FinishedState">
              下发任务 📤
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
  name: 'PerformanceTask',
  setup() {
    const tasks = ref([
      {
        GUID: '1',
        OrganisationName: '技术部',
        AppraisalProgramName: '技术部考核方案',
        ReleaseDate: '',
        FinishedState: false,
      },
      {
        GUID: '2',
        OrganisationName: '人事部',
        AppraisalProgramName: '人事部考核方案',
        ReleaseDate: '',
        FinishedState: false,
      },
      // 更多假数据
    ]);

    const multipleSelection = ref([]);

    const handleSelectionChange = (val) => {
      multipleSelection.value = val;
    };

    const releaseTask = (row) => {
      ElMessageBox.confirm(`确定要下发 ${row.OrganisationName} 的制定任务吗？`, '提示', {
        type: 'warning',
      })
          .then(() => {
            row.ReleaseDate = new Date().toLocaleDateString();
            row.FinishedState = true;
            ElMessage.success(`已下发 ${row.OrganisationName} 的制定任务 🎉`);
          })
          .catch(() => {});
    };

    const releaseTasks = () => {
      if (multipleSelection.value.length === 0) {
        ElMessage.warning('请先选择要下发的任务');
        return;
      }
      ElMessageBox.confirm('确定要下发选中的任务吗？', '提示', {
        type: 'warning',
      })
          .then(() => {
            multipleSelection.value.forEach((row) => {
              if (!row.FinishedState) {
                row.ReleaseDate = new Date().toLocaleDateString();
                row.FinishedState = true;
              }
            });
            ElMessage.success('批量下发任务成功 🎉');
          })
          .catch(() => {});
    };

    return {
      tasks,
      multipleSelection,
      handleSelectionChange,
      releaseTask,
      releaseTasks,
    };
  },
};
</script>

<style scoped>
.performance-task {
  padding: 20px;
}

.box-card {
  border-radius: 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  color: transparent;
}

.release-button {
  float: right;
}

.rounded-table {
  border-radius: 10px;
  overflow: hidden;
}
</style>
