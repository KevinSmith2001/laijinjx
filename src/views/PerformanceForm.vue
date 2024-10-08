<!-- src/views/PerformanceForm.vue -->
<template>
  <div class="performance-form">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="card-title">📝 编制个人绩效责任书</span>
      </template>
      <el-button type="primary" @click="addIndicator" class="add-button">
        新增指标 ➕
      </el-button>
      <el-button type="primary" @click="openKpiLibrary" class="add-button">
        从指标库选择 📚
      </el-button>
      <div class="weight-total">
        总权重：{{ totalWeight }}%
      </div>
      <el-table :data="indicators" stripe border class="rounded-table" style="width: 100%">
        <el-table-column prop="KPIContent" label="指标内容"></el-table-column>
        <el-table-column prop="WeightScore" label="权重"></el-table-column>
        <el-table-column prop="ScoringStandards" label="评分标准"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="editIndicator(row)">编辑 ✏️</el-button>
            <el-button type="text" @click="deleteIndicator(row)">删除 🗑️</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="submitForm" class="submit-button">
        提交责任书 📤
      </el-button>
    </el-card>

    <!-- 新增/编辑指标对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px">
      <el-form :model="currentIndicator" label-width="100px" ref="indicatorFormRef">
        <el-form-item label="指标内容" prop="KPIContent">
          <el-input v-model="currentIndicator.KPIContent"></el-input>
        </el-form-item>
        <el-form-item label="权重" prop="WeightScore">
          <el-input-number v-model="currentIndicator.WeightScore" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="评分标准" prop="ScoringStandards">
          <el-input type="textarea" v-model="currentIndicator.ScoringStandards"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveIndicator">保存</el-button>
      </template>
    </el-dialog>

    <!-- KPI 指标库弹窗 -->
    <el-dialog title="KPI 指标库" :visible.sync="kpiDialogVisible" width="800px">
      <el-table
          :data="kpiLibrary"
          stripe
          highlight-current-row
          @row-dblclick="selectKpi"
          style="width: 100%"
      >
        <el-table-column prop="KPIContent" label="指标内容"></el-table-column>
        <el-table-column prop="Description" label="描述"></el-table-column>
        <el-table-column prop="WeightScore" label="建议权重"></el-table-column>
      </el-table>
      <template #footer>
        <el-button @click="kpiDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  name: 'PerformanceForm',
  setup() {
    const indicators = ref([
      {
        GUID: '1',
        KPIContent: '完成季度销售目标',
        WeightScore: 50,
        ScoringStandards: '完成率达100%',
      },
      {
        GUID: '2',
        KPIContent: '提升客户满意度',
        WeightScore: 30,
        ScoringStandards: '满意度达90%以上',
      },
      // 更多指标
    ]);

    const totalWeight = computed(() => {
      return indicators.value.reduce((sum, item) => sum + item.WeightScore, 0);
    });

    const dialogVisible = ref(false);
    const dialogTitle = ref('新增指标');
    const currentIndicator = reactive({
      GUID: '',
      KPIContent: '',
      WeightScore: 0,
      ScoringStandards: '',
    });
    const indicatorFormRef = ref(null);

    const addIndicator = () => {
      dialogTitle.value = '新增指标';
      currentIndicator.GUID = '';
      currentIndicator.KPIContent = '';
      currentIndicator.WeightScore = 0;
      currentIndicator.ScoringStandards = '';
      dialogVisible.value = true;
    };

    const editIndicator = (row) => {
      dialogTitle.value = '编辑指标';
      Object.assign(currentIndicator, row);
      dialogVisible.value = true;
    };

    const saveIndicator = () => {
      indicatorFormRef.value.validate((valid) => {
        if (valid) {
          const newTotalWeight =
              totalWeight.value - (currentIndicator.GUID ? currentIndicator.WeightScore : 0) + currentIndicator.WeightScore;
          if (newTotalWeight > 100) {
            ElMessage.warning('总权重不能超过100%');
            return;
          }
          if (currentIndicator.GUID) {
            // 编辑
            const index = indicators.value.findIndex((i) => i.GUID === currentIndicator.GUID);
            if (index !== -1) {
              indicators.value.splice(index, 1, { ...currentIndicator });
            }
          } else {
            // 新增
            currentIndicator.GUID = Date.now().toString();
            indicators.value.push({ ...currentIndicator });
          }
          dialogVisible.value = false;
          // 清空表单
          currentIndicator.GUID = '';
          currentIndicator.KPIContent = '';
          currentIndicator.WeightScore = 0;
          currentIndicator.ScoringStandards = '';
        }
      });
    };

    const deleteIndicator = (row) => {
      indicators.value = indicators.value.filter((i) => i.GUID !== row.GUID);
      ElMessage.success('指标已删除 🗑️');
    };

    const submitForm = () => {
      if (indicators.value.length === 0) {
        ElMessage.warning('请先添加指标');
        return;
      }
      if (totalWeight.value !== 100) {
        ElMessage.warning('总权重必须等于100%');
        return;
      }
      // 模拟提交操作
      ElMessage.success('绩效责任书已提交 🎉');
    };

    // KPI 指标库相关
    const kpiDialogVisible = ref(false);
    const kpiLibrary = ref([
      {
        GUID: '1',
        KPIContent: '提升客户满意度',
        Description: '通过优化服务流程，提高客户满意度至90%以上',
        WeightScore: 20,
      },
      {
        GUID: '2',
        KPIContent: '降低产品缺陷率',
        Description: '将产品缺陷率控制在1%以下',
        WeightScore: 30,
      },
      // 更多指标
    ]);

    const openKpiLibrary = () => {
      kpiDialogVisible.value = true;
    };

    const selectKpi = (row) => {
      currentIndicator.KPIContent = row.KPIContent;
      currentIndicator.WeightScore = row.WeightScore;
      currentIndicator.ScoringStandards = row.Description;
      dialogTitle.value = '新增指标';
      dialogVisible.value = true;
      kpiDialogVisible.value = false;
    };

    return {
      indicators,
      totalWeight,
      dialogVisible,
      dialogTitle,
      currentIndicator,
      indicatorFormRef,
      addIndicator,
      editIndicator,
      saveIndicator,
      deleteIndicator,
      submitForm,
      kpiDialogVisible,
      kpiLibrary,
      openKpiLibrary,
      selectKpi,
    };
  },
};
</script>

<style scoped>
.performance-form {
  padding: 20px;
}

.box-card {
  border-radius: 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #e74c3c, #e67e22);
  -webkit-background-clip: text;
  color: transparent;
}

.add-button {
  margin-right: 10px;
}

.submit-button {
  margin-top: 20px;
}

.rounded-table {
  border-radius: 10px;
  overflow: hidden;
}

.weight-total {
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
}
</style>
