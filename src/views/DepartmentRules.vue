<!-- src/views/DepartmentRules.vue -->
<template>
  <div class="department-rules">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="clearfix">
          <span class="card-title">🏢 部门考核规则设置</span>
          <el-input
              v-model="search"
              placeholder="搜索部门"
              prefix-icon="el-icon-search"
              class="search-input"
              clearable
          ></el-input>
        </div>
      </template>
      <el-table :data="filteredDepartments" stripe border class="rounded-table" style="width: 100%">
        <el-table-column prop="OrgName" label="部门名称"></el-table-column>
        <el-table-column label="考核状态">
          <template #default="{ row }">
            <el-switch
                v-model="row.AssessState"
                active-text="参与"
                inactive-text="不参与"
                @change="handleAssessStateChange(row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="考核方案">
          <template #default="{ row }">
            <el-select v-model="row.AppraisalProgramGUID" placeholder="请选择考核方案">
              <el-option
                  v-for="program in assessmentPrograms"
                  :key="program.GUID"
                  :label="program.ProgramName"
                  :value="program.GUID"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'DepartmentRules',
  setup() {
    const search = ref('');
    const departments = ref([
      {
        GUID: '1',
        OrgName: '技术部',
        AssessState: true,
        AppraisalProgramGUID: '1',
      },
      {
        GUID: '2',
        OrgName: '人事部',
        AssessState: false,
        AppraisalProgramGUID: '2',
      },
      // 更多部门数据
    ]);

    const assessmentPrograms = ref([
      {
        GUID: '1',
        ProgramName: '技术部考核方案',
      },
      {
        GUID: '2',
        ProgramName: '人事部考核方案',
      },
      // 更多考核方案
    ]);

    const filteredDepartments = computed(() => {
      return departments.value.filter((dept) => dept.OrgName.includes(search.value));
    });

    const handleAssessStateChange = (row) => {
      this.$message.success(`已将${row.OrgName}的考核状态设置为${row.AssessState ? '参与' : '不参与'}考核 🎉`);
    };

    return {
      search,
      departments,
      assessmentPrograms,
      filteredDepartments,
      handleAssessStateChange,
    };
  },
};
</script>

<style scoped>
.department-rules {
  padding: 20px;
}

.box-card {
  border-radius: 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #16a085, #27ae60);
  -webkit-background-clip: text;
  color: transparent;
}

.search-input {
  float: right;
  width: 300px;
  margin-bottom: 10px;
}

.rounded-table {
  border-radius: 10px;
  overflow: hidden;
}
</style>
