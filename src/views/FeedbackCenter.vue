<!-- src/views/FeedbackCenter.vue -->
<template>
  <div class="feedback-center">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="card-title">💬 即时反馈中心</span>
      </template>
      <div class="feedback-list">
        <el-list>
          <el-list-item v-for="feedback in feedbacks" :key="feedback.id">
            <el-list-item-content>
              <el-list-item-title>
                <strong>{{ feedback.sender }}</strong>：
                {{ feedback.content }}
              </el-list-item-title>
              <el-list-item-description>{{ feedback.time }}</el-list-item-description>
            </el-list-item-content>
          </el-list-item>
        </el-list>
      </div>
      <el-form :model="newFeedback" class="feedback-form">
        <el-form-item>
          <el-input
              type="textarea"
              v-model="newFeedback.content"
              placeholder="请输入反馈内容"
              rows="3"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendFeedback">发送反馈 🚀</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'FeedbackCenter',
  data() {
    return {
      feedbacks: [
        {
          id: 1,
          sender: '张三',
          content: '本月的绩效指标需要调整一下。',
          time: '2023-10-01 10:00',
        },
        {
          id: 2,
          sender: '李四',
          content: '好的，我会尽快处理。',
          time: '2023-10-01 10:05',
        },
        // 更多反馈
      ],
      newFeedback: {
        content: '',
      },
    };
  },
  methods: {
    sendFeedback() {
      if (!this.newFeedback.content.trim()) {
        this.$message.warning('反馈内容不能为空');
        return;
      }
      // 模拟发送反馈
      const newId = this.feedbacks.length + 1;
      this.feedbacks.push({
        id: newId,
        sender: '我',
        content: this.newFeedback.content,
        time: new Date().toLocaleString(),
      });
      this.newFeedback.content = '';
      this.$message.success('反馈已发送 🎉');
    },
  },
};
</script>

<style scoped>
.feedback-center {
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

.feedback-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.feedback-form {
  display: flex;
  align-items: flex-start;
}

.feedback-form .el-form-item {
  flex: 1;
  margin-right: 10px;
}

.feedback-form .el-button {
  flex-shrink: 0;
}
</style>
