<template>
  <div id="app">
    <!-- 导航栏 -->
    <el-header>
      <div class="header-left">
        <div class="logo">来金绩效考核系统</div>
        <el-menu mode="horizontal" :default-active="activeMenu" class="el-menu-demo" @select="handleSelect">
          <el-menu-item index="dashboard">仪表盘</el-menu-item>
          <el-menu-item index="department-rules">部门规则</el-menu-item>
          <el-menu-item index="position-rules">岗位规则</el-menu-item>
          <el-menu-item index="employee-rules">员工规则</el-menu-item>
          <el-menu-item index="assessment-program">考核方案</el-menu-item>
          <el-menu-item index="performance-task">指标任务下发</el-menu-item>
          <el-menu-item index="performance-form">绩效责任书</el-menu-item>
          <el-menu-item index="score-task">评分任务下发</el-menu-item>
          <el-menu-item index="performance-score">绩效评分</el-menu-item>
          <el-menu-item index="report-management">报表管理</el-menu-item>
          <el-menu-item index="feedback-center">反馈中心</el-menu-item>
          <el-menu-item index="profile">个人中心</el-menu-item>
        </el-menu>
      </div>
      <div class="header-right">
        <!-- 添加问候语 -->
        <div class="greeting">{{ greeting }}</div>
        <!-- 用户下拉菜单 -->
        <el-dropdown class="user-dropdown">
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 内容区域 -->
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const store = useMainStore();

    const activeMenu = ref('');
    const username = computed(() => store.user.username || '游客');

    const handleSelect = (index) => {
      activeMenu.value = index;
      router.push(`/${index}`);
    };

    const logout = () => {
      store.logout();
      router.push('/login');
    };

    // 添加问候语
    const greeting = ref('');

    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 6) {
        greeting.value = '深夜了，注意休息，';
      } else if (hour < 9) {
        greeting.value = '早上好，';
      } else if (hour < 12) {
        greeting.value = '上午好，';
      } else if (hour < 14) {
        greeting.value = '中午好，';
      } else if (hour < 18) {
        greeting.value = '下午好，';
      } else if (hour < 22) {
        greeting.value = '晚上好，';
      } else {
        greeting.value = '夜深了，注意休息，';
      }
      greeting.value += `${username.value}！`;
    };

    onMounted(() => {
      updateGreeting();
    });

    return {
      activeMenu,
      handleSelect,
      username,
      logout,
      greeting,
    };
  },
};
</script>

<style scoped>
#app {
  min-height: 100vh;
}

.el-header {
  display: flex;
  align-items: center;
  background-color: #409eff;
  color: #fff;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.header-right {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
}

.el-menu-demo {
  flex: 1;
}

.greeting {
  margin-right: 20px;
}

.user-dropdown {
  cursor: pointer;
}
</style>
