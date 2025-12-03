export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware untuk halaman login
  if (to.path === '/login') {
    return;
  }

  // Cek apakah user sudah login
  if (process.client) {
    const userData = localStorage.getItem('current_user');
    if (!userData) {
      return navigateTo('/login');
    }
  }
});