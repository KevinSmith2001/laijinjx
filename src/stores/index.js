// src/stores/index.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: {
      username: '',
      isAuthenticated: false,
    },
  }),
  actions: {
    login(username) {
      this.user.username = username;
      this.user.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout() {
      this.user.username = '';
      this.user.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', 'false');
    },
  },
});
