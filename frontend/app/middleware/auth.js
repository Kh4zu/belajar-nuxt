export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return
  
  const user = JSON.parse(localStorage.getItem('current_user') || '{}');
  
  // Public routes yang bisa diakses tanpa login
  const publicRoutes = ['/', '/login', '/register', '/about', '/galeri', '/kontak'];
  
  // Jika tidak ada user dan mencoba akses protected route, redirect ke login
  if (!user.id && !publicRoutes.includes(to.path)) {
    return navigateTo('/login');
  }

  // Jika sudah login dan mencoba akses login page, redirect berdasarkan role
  if (user.id && to.path === '/login') {
    if (user.role === 'admin') {
      return navigateTo('/admin');
    } else {
      return navigateTo('/');
    }
  }

  // Cek akses berdasarkan role
  const customerRoutes = ['/keranjang', '/pembayaran', '/payment-gateway'];
  const adminRoutes = ['/admin'];
  
  // Jika user mencoba akses halaman customer
  if (customerRoutes.includes(to.path) && !user.id) {
    return navigateTo('/login');
  }
  
  // Jika user mencoba akses admin tapi bukan admin
  if (adminRoutes.includes(to.path) && user.role !== 'admin') {
    alert('Anda tidak memiliki akses ke halaman admin!')
    return navigateTo('/');
  }
});