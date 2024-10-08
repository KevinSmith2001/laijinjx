// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import DepartmentRules from '@/views/DepartmentRules.vue';
import PositionRules from '@/views/PositionRules.vue';
import EmployeeRules from '@/views/EmployeeRules.vue';
import AssessmentProgram from '@/views/AssessmentProgram.vue';
import PerformanceTask from '@/views/PerformanceTask.vue';
import PerformanceForm from '@/views/PerformanceForm.vue';
import ScoreTask from '@/views/ScoreTask.vue';
import PerformanceScore from '@/views/PerformanceScore.vue';
import ReportManagement from '@/views/ReportManagement.vue';
import FeedbackCenter from '@/views/FeedbackCenter.vue';
import Profile from '@/views/Profile.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login, meta: { guest: true } },
  { path: '/register', name: 'Register', component: Register, meta: { guest: true } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/department-rules', name: 'DepartmentRules', component: DepartmentRules, meta: { requiresAuth: true } },
  { path: '/position-rules', name: 'PositionRules', component: PositionRules, meta: { requiresAuth: true } },
  { path: '/employee-rules', name: 'EmployeeRules', component: EmployeeRules, meta: { requiresAuth: true } },
  { path: '/assessment-program', name: 'AssessmentProgram', component: AssessmentProgram, meta: { requiresAuth: true } },
  { path: '/performance-task', name: 'PerformanceTask', component: PerformanceTask, meta: { requiresAuth: true } },
  { path: '/performance-form', name: 'PerformanceForm', component: PerformanceForm, meta: { requiresAuth: true } },
  { path: '/score-task', name: 'ScoreTask', component: ScoreTask, meta: { requiresAuth: true } },
  { path: '/performance-score', name: 'PerformanceScore', component: PerformanceScore, meta: { requiresAuth: true } },
  { path: '/report-management', name: 'ReportManagement', component: ReportManagement, meta: { requiresAuth: true } },
  { path: '/feedback-center', name: 'FeedbackCenter', component: FeedbackCenter, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫，判断登录状态
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.guest && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
