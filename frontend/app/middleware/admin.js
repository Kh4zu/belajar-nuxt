export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("current_user") || "null");
    
    console.log('🛡️ Admin Middleware - User data:', user);
    
    if (!user) {
      return navigateTo("/login");
    }

    if (user.role !== "admin") {
      alert("Akses ditolak! Hanya administrator yang bisa mengakses halaman ini.");
      return navigateTo("/");
    }

    console.log('✅ Admin access granted');
  }
});