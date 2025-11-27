export default defineNuxtRouteMiddleware((to, from) => {
  // Cek apakah user sudah login
  const userData = localStorage.getItem('current_user');
  
  if (userData) {
    const user = JSON.parse(userData);
    
    // Jika user sudah login sebagai manager dan mencoba akses halaman login, redirect ke dashboard manager
    if (user.Role === 'manager' && to.path === '/login') {
      return navigateTo('/manager');
    }
    
    // Jika user sudah login tapi bukan manager, redirect ke halaman sesuai role
    if (user.Role !== 'manager') {
      const routes = {
        'admin': '/admin',
        'staff': '/staff',
        'user': '/'
      };
      return navigateTo(routes[user.Role] || '/');
    }
    
    // Jika user adalah manager dan mengakses halaman manager, biarkan lanjut
    return;
  }
  
  // Jika belum login dan mencoba akses halaman manager, redirect ke login
  if (!userData && to.path.startsWith('/manager')) {
    return navigateTo('/login');
  }
});