import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
  }),

  actions: {
    login(username, role) {
      this.user = { username, role };
    },
    logout() {
      this.user = null;
    },
  },

  persist: true,
});
