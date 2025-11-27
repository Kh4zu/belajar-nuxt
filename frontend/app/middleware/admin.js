export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("current_user") || "null");
    
    if (!user) {
      return navigateTo("/");
    }

    if (user.Role !== "admin") {
      alert("Akses ditolak! Hanya administrator yang bisa mengakses halaman ini.");
      return navigateTo("/unauthorized");
    }
  }
});