<!-- src/views/PositionRules.vue -->
<template>
  <div class="position-rules">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="clearfix">
          <span class="card-title">💼 岗位考核规则设置</span>
          <el-input
              v-model="search"
              placeholder="搜索岗位"
              prefix-icon="el-icon-search"
              class="search-input"
              clearable
          ></el-input>
        </div>
      </template>
      <el-table :data="filteredPositions" stripe border class="rounded-table" style="width: 100%">
        <el-table-column prop="PositionName" label="岗位名称"></el-table-column>
        <el-table-column prop="OrgName" label="所属部门"></el-table-column>
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
  name: 'PositionRules',
  data() {
    return {
      search: '',
      positions: [
        {
          GUID: '1',
          PositionName: '软件工程师',
          OrgName: '技术部',
          AssessState: true,
          AppraisalProgramGUID: '1',
        },
        {
          GUID: '2',
          PositionName: '人事专员',
          OrgName: '人事部',
          AssessState: false,
          AppraisalProgramGUID: '2',
        },
        // 更多岗位数据
      ],
    };
  },
  computed: {
    filteredPositions() {
      return this.positions.filter((pos) => pos.PositionName.includes(this.search));
    },
  },
  methods: {
    handleAssessStateChange(row) {
      this.$message.success(`已将${row.PositionName}的考核状态设置为${row.AssessState ? '参与' : '不参与'}考核 🎉`);
    },
  },
};
</script>

<style scoped>
.position-rules {
  padding: 20px;
}

.box-card {
  border-radius: 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #e67e22, #e74c3c);
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
