<!-- src/views/EmployeeRules.vue -->
<template>
  <div class="employee-rules">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="clearfix">
          <span class="card-title">👥 员工考核规则设置</span>
          <el-input
              v-model="search"
              placeholder="搜索员工"
              prefix-icon="el-icon-search"
              class="search-input"
              clearable
          ></el-input>
        </div>
      </template>
      <el-table :data="filteredEmployees" stripe border class="rounded-table" style="width: 100%">
        <el-table-column prop="Name" label="姓名"></el-table-column>
        <el-table-column prop="PersonalNum" label="工号"></el-table-column>
        <el-table-column prop="OrgName" label="部门"></el-table-column>
        <el-table-column prop="PositionName" label="岗位"></el-table-column>
        <el-table-column label="考核状态">
          <template #default="{ row }">
            <el-select v-model="row.AssessState" placeholder="请选择">
              <el-option label="参与" value="参与"></el-option>
              <el-option label="不参与" value="不参与"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="考核方案">
          <template #default="{ row }">
            <el-select v-model="row.AppraisalProgramGUID" placeholder="请选择考核方案">
              <el-option label="技术部考核方案" value="1"></el-option>
              <el-option label="人事部考核方案" value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'EmployeeRules',
  data() {
    return {
      search: '',
      employees: [
        {
          GUID: '1',
          Name: '张三',
          PersonalNum: '1001',
          OrgName: '技术部',
          PositionName: '软件工程师',
          AssessState: '参与',
          AppraisalProgramGUID: '1',
        },
        {
          GUID: '2',
          Name: '李四',
          PersonalNum: '1002',
          OrgName: '人事部',
          PositionName: '人事专员',
          AssessState: '不参与',
          AppraisalProgramGUID: '2',
        },
        // 更多员工数据
      ],
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter((emp) => emp.Name.includes(this.search));
    },
  },
};
</script>

<style scoped>
.employee-rules {
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
