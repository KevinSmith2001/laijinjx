<!-- src/views/AssessmentProgram.vue -->
<template>
  <div class="assessment-program">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="clearfix">
          <span class="card-title">📋 考核方案管理</span>
          <el-button type="primary" @click="openDialog" class="create-button">
            新建考核方案 ➕
          </el-button>
        </div>
      </template>
      <el-table :data="programs" stripe border class="rounded-table" style="width: 100%">
        <el-table-column prop="ProgramName" label="方案名称"></el-table-column>
        <el-table-column prop="Creator" label="创建者"></el-table-column>
        <el-table-column prop="CreateDate" label="创建日期"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="editProgram(row)">编辑 ✏️</el-button>
            <el-button type="text" @click="deleteProgram(row)">删除 🗑️</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新建/编辑考核方案对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px">
      <el-form :model="currentProgram" label-width="100px" ref="programFormRef">
        <el-form-item label="方案名称" prop="ProgramName">
          <el-input v-model="currentProgram.ProgramName"></el-input>
        </el-form-item>
        <el-form-item label="方案描述" prop="Description">
          <el-input type="textarea" v-model="currentProgram.Description"></el-input>
        </el-form-item>
        <!-- 添加指标配置 -->
        <el-form-item label="指标配置">
          <el-button type="primary" @click="addIndicator">添加指标</el-button>
          <el-table :data="currentProgram.Indicators" style="margin-top: 10px;">
            <el-table-column prop="Content" label="指标内容"></el-table-column>
            <el-table-column prop="Weight" label="权重"></el-table-column>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button type="text" @click="removeIndicator(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProgram">保存</el-button>
      </template>
    </el-dialog>

    <!-- 添加指标对话框 -->
    <el-dialog title="添加指标" :visible.sync="indicatorDialogVisible" width="500px">
      <el-form :model="currentIndicator" label-width="100px">
        <el-form-item label="指标内容" prop="Content">
          <el-input v-model="currentIndicator.Content"></el-input>
        </el-form-item>
        <el-form-item label="权重" prop="Weight">
          <el-input-number v-model="currentIndicator.Weight" :min="0" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="indicatorDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveIndicator">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  name: 'AssessmentProgram',
  setup() {
    const programs = ref([
      {
        GUID: '1',
        ProgramName: '技术部考核方案',
        Description: '针对技术部员工的考核方案',
        Creator: '张三',
        CreateDate: '2023-09-01',
        Indicators: [
          { Content: '完成项目A', Weight: 50 },
          { Content: '提升代码质量', Weight: 50 },
        ],
      },
      {
        GUID: '2',
        ProgramName: '人事部考核方案',
        Description: '针对人事部员工的考核方案',
        Creator: '李四',
        CreateDate: '2023-09-05',
        Indicators: [
          { Content: '完成招聘任务', Weight: 60 },
          { Content: '员工满意度调查', Weight: 40 },
        ],
      },
      // 更多方案数据
    ]);

    const dialogVisible = ref(false);
    const dialogTitle = ref('新建考核方案');
    const currentProgram = reactive({
      GUID: '',
      ProgramName: '',
      Description: '',
      Creator: '当前用户', // 可替换为实际的用户名
      CreateDate: '',
      Indicators: [],
    });
    const programFormRef = ref(null);

    const openDialog = () => {
      dialogTitle.value = '新建考核方案';
      currentProgram.GUID = '';
      currentProgram.ProgramName = '';
      currentProgram.Description = '';
      currentProgram.CreateDate = '';
      currentProgram.Indicators = [];
      dialogVisible.value = true;
    };

    const editProgram = (row) => {
      dialogTitle.value = '编辑考核方案';
      Object.assign(currentProgram, JSON.parse(JSON.stringify(row)));
      dialogVisible.value = true;
    };

    const saveProgram = () => {
      programFormRef.value.validate((valid) => {
        if (valid) {
          if (currentProgram.GUID) {
            // 编辑
            const index = programs.value.findIndex((p) => p.GUID === currentProgram.GUID);
            if (index !== -1) {
              programs.value.splice(index, 1, { ...currentProgram });
            }
          } else {
            // 新建
            currentProgram.GUID = Date.now().toString();
            currentProgram.CreateDate = new Date().toLocaleDateString();
            programs.value.push({ ...currentProgram });
          }
          dialogVisible.value = false;
          // 清空表单
          currentProgram.GUID = '';
          currentProgram.ProgramName = '';
          currentProgram.Description = '';
          currentProgram.CreateDate = '';
          currentProgram.Indicators = [];
        }
      });
    };

    const deleteProgram = (row) => {
      programs.value = programs.value.filter((p) => p.GUID !== row.GUID);
      ElMessage.success('删除成功 🗑️');
    };

    // 指标相关
    const indicatorDialogVisible = ref(false);
    const currentIndicator = reactive({
      Content: '',
      Weight: 0,
    });

    const addIndicator = () => {
      currentIndicator.Content = '';
      currentIndicator.Weight = 0;
      indicatorDialogVisible.value = true;
    };

    const saveIndicator = () => {
      if (currentIndicator.Content && currentIndicator.Weight > 0) {
        currentProgram.Indicators.push({ ...currentIndicator });
        indicatorDialogVisible.value = false;
      } else {
        ElMessage.warning('请填写完整的指标信息');
      }
    };

    const removeIndicator = (row) => {
      currentProgram.Indicators = currentProgram.Indicators.filter((i) => i !== row);
    };

    return {
      programs,
      dialogVisible,
      dialogTitle,
      currentProgram,
      programFormRef,
      openDialog,
      editProgram,
      saveProgram,
      deleteProgram,
      indicatorDialogVisible,
      currentIndicator,
      addIndicator,
      saveIndicator,
      removeIndicator,
    };
  },
};
</script>

<style scoped>
.assessment-program {
  padding: 20px;
}

.box-card {
  border-radius: 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #9b59b6, #8e44ad);
  -webkit-background-clip: text;
  color: transparent;
}

.create-button {
  float: right;
}

.rounded-table {
  border-radius: 10px;
  overflow: hidden;
}
</style>
