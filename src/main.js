// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由
import { createPinia } from 'pinia'; // 引入 Pinia
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/styles/global.css'; // 引入全局样式

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(ElementPlus);

app.mount('#app');
