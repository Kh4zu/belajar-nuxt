// stores/userStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    role: "",
    isLoggedIn: false,
  }),

  actions: {
    login(username, password, role) {
      this.username = username;
      this.role = role;
      this.isLoggedIn = true;
      
      if (process.client) {
        localStorage.setItem("user", JSON.stringify({
          username: username,
          role: role,
          isLoggedIn: true
        }));
      }
      return true;
    },

    logout() {
      this.username = "";
      this.role = "";
      this.isLoggedIn = false;
      if (process.client) {
        localStorage.removeItem("user");
      }
    }
  },
});