export default defineNuxtRouteMiddleware((to, from) => {
  // Hanya jalankan di client side
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("current_user") || "null");

    if (!user) {
      return navigateTo("/"); // kalau belum login
    }

    // Validation by pages folder
    if (to.path.startsWith("/admin") && user.Role !== "admin") {
      return navigateTo("/unauthorized");
    }

    if (to.path.startsWith("/manager") && user.Role !== "manager") {
      return navigateTo("/unauthorized");
    }

    if (to.path.startsWith("/staff") && user.Role !== "staff") {
      return navigateTo("/unauthorized");
    }

    if (to.path.startsWith("/user") && user.Role !== "user") {
      return navigateTo("/unauthorized");
    }
  }
});