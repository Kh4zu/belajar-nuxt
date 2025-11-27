export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const userData = localStorage.getItem("current_user");
    
    if (!userData) {
      return navigateTo("/");
    }

    try {
      const user = JSON.parse(userData);
      
      if (user.role !== "user") {
        return navigateTo("/unauthorized");
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      return navigateTo("/");
    }
  }
});