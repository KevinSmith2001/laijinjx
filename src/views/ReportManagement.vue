<!-- src/views/ReportManagement.vue -->
<template>
  <div class="report-management">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="card-title">📈 报表管理</span>
      </template>
      <el-form :model="form" label-width="100px" class="report-form">
        <el-form-item label="报表类型">
          <el-select v-model="form.reportType" placeholder="请选择报表类型">
            <el-option label="员工绩效汇总" value="employeePerformance"></el-option>
            <el-option label="部门绩效汇总" value="departmentPerformance"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
              v-model="form.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出 Excel 📊</el-button>
          <el-button type="primary" @click="exportPDF">导出 PDF 📄</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  name: 'ReportManagement',
  data() {
    return {
      form: {
        reportType: '',
        dateRange: [],
      },
      reportData: [
        // 模拟报表数据
        { Name: '张三', Score: 90, Department: '技术部' },
        { Name: '李四', Score: 85, Department: '人事部' },
        // 更多数据
      ],
    };
  },
  methods: {
    getReportData() {
      // 根据报表类型和时间范围，过滤并返回数据
      // 这里简单返回模拟数据
      return this.reportData;
    },
    exportExcel() {
      if (!this.form.reportType || this.form.dateRange.length === 0) {
        this.$message.warning('请先选择报表类型和时间范围');
        return;
      }
      const data = this.getReportData();
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '报表');
      XLSX.writeFile(wb, '报表.xlsx');
      this.$message.success('报表已导出为 Excel 文件 📊');
    },
    exportPDF() {
      if (!this.form.reportType || this.form.dateRange.length === 0) {
        this.$message.warning('请先选择报表类型和时间范围');
        return;
      }
      const data = this.getReportData();
      const doc = new jsPDF();
      doc.autoTable({
        head: [['姓名', '得分', '部门']],
        body: data.map((item) => [item.Name, item.Score, item.Department]),
      });
      doc.save('报表.pdf');
      this.$message.success('报表已导出为 PDF 文件 📄');
    },
  },
};
</script>

<style scoped>
.report-management {
  padding: 20px;
}

.box-card {
  border-radius: 15px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(45deg, #1abc9c, #16a085);
  -webkit-background-clip: text;
  color: transparent;
}

.report-form {
  margin-top: 20px;
}
</style>
