<template>
  <div class="min-h-screen flex flex-col bg-[#F9FFF9] text-gray-900">
    <!-- 🌿 Navbar -->
    <header
      class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-green-100"
    >
      <nav
        class="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4"
      >
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/">
            <div class="flex items-center gap-2">
              <img
                src="/logoo.jpg"
                alt="Logo Greenomi"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-md object-cover"
              />
              <h1 class="text-xl sm:text-2xl font-bold text-[#009879] tracking-wide">
                Greenomi
              </h1>
            </div>
          </NuxtLink>
        </div>

        <!-- Menu Desktop -->
        <div
          class="hidden md:flex space-x-6 lg:space-x-8 text-base sm:text-lg font-medium text-gray-700"
        >
          <NuxtLink to="/" class="hover:text-[#009879] transition">Beranda</NuxtLink>
          <NuxtLink to="/about" class="hover:text-[#009879] transition">Tentang</NuxtLink>
          <NuxtLink to="/galeri" class="hover:text-[#009879] transition">Menu</NuxtLink>
          <NuxtLink to="/kontak" class="hover:text-[#009879] transition">Kontak</NuxtLink>
        </div>

        <!-- Tombol Login & User Info -->
        <div class="flex items-center gap-4">
          <!-- Tombol Login (muncul jika belum login) -->
          <NuxtLink 
            v-if="!isLoggedIn"
            to="/login" 
            class="bg-[#009879] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#00BFA6] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </NuxtLink>

          <!-- User Info (muncul jika sudah login) -->
          <div v-else class="flex items-center gap-3">
            <span class="text-sm text-gray-700 hidden sm:block">
              Halo, {{ currentUser.Name || currentUser.Username }}
            </span>
            <button 
              @click="logout"
              class="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </div>

          <!-- 🌿 Tombol Menu Mobile -->
          <button
            class="md:hidden p-2 rounded-md bg-[#009879] text-white focus:outline-none active:scale-95 transition"
            @click="isMenuOpen = !isMenuOpen"
            aria-label="Toggle menu"
          >
            <!-- Ikon Menu -->
            <svg
              v-if="!isMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <!-- Ikon Close -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      <!-- 🌱 Menu Mobile -->
      <transition name="slide-fade">
        <div
          v-show="isMenuOpen"
          class="md:hidden flex flex-col bg-white border-t border-green-100 shadow-inner text-gray-800"
        >
          <NuxtLink
            to="/"
            class="px-6 py-3 hover:bg-[#E8F5E9] hover:text-[#009879]"
            @click="isMenuOpen = false"
            >Beranda</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="px-6 py-3 hover:bg-[#E8F5E9] hover:text-[#009879]"
            @click="isMenuOpen = false"
            >Tentang</NuxtLink
          >
          <NuxtLink
            to="/galeri"
            class="px-6 py-3 hover:bg-[#E8F5E9] hover:text-[#009879]"
            @click="isMenuOpen = false"
            >Menu</NuxtLink
          >
          <NuxtLink
            to="/kontak"
            class="px-6 py-3 hover:bg-[#E8F5E9] hover:text-[#009879]"
            @click="isMenuOpen = false"
            >Kontak</NuxtLink
          >
          <!-- Tombol Login di Mobile Menu -->
          <NuxtLink
            v-if="!isLoggedIn"
            to="/login"
            class="px-6 py-3 bg-[#009879] text-white hover:bg-[#00BFA6]"
            @click="isMenuOpen = false"
          >
            Login
          </NuxtLink>
          <!-- User Info di Mobile Menu -->
          <div v-else class="px-6 py-3 border-t border-gray-200">
            <p class="text-sm text-gray-600">Halo, {{ currentUser.Name || currentUser.Username }}</p>
            <button 
              @click="logoutMobile"
              class="text-red-500 text-sm mt-1 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </transition>
    </header>

    <!-- 🌿 Konten Halaman -->
    <main class="flex-1 pt-24 sm:pt-28 pb-20">
      <slot />
    </main>

    <!-- 🌿 Footer -->
    <footer class="bg-[#009879] text-white py-10 text-center mt-auto">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-6 md:space-y-0"
        >
          <div class="flex items-center gap-3">
            <img
              src="/logoo.jpg"
              alt="Logo Greenomi"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-md object-cover"
            />
            <div class="text-left">
              <p class="text-lg font-bold">Greenomi</p>
              <p class="text-sm text-white/80">Pagujaten, Jakarta Selatan</p>
            </div>
          </div>

          <div class="text-sm text-white/80 text-center md:text-right">
            <p>Jam Buka: 08.00 - 21.00 (Setiap Hari)</p>
            <p class="mt-2">✉ greenomi@gmail.com • 📞 +62 838-9554-5946</p>
          </div>
        </div>

        <p class="text-white/70 text-sm mt-4">
          © 2025 Greenomi. Didedikasikan untuk keharmonisan dalam setiap tegukan.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isMenuOpen = ref(false);
const isLoggedIn = ref(false);
const currentUser = ref({});

// Cek status login saat komponen dimuat
onMounted(() => {
  checkLoginStatus();
});

// Fungsi untuk cek status login
function checkLoginStatus() {
  if (process.client) {
    const userData = localStorage.getItem('current_user');
    if (userData) {
      currentUser.value = JSON.parse(userData);
      isLoggedIn.value = true;
    }
  }
}

// Fungsi logout
function logout() {
  if (process.client) {
    localStorage.removeItem('current_user');
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    currentUser.value = {};
    
    // Redirect ke halaman login
    navigateTo('/login');
  }
}

// Fungsi logout untuk mobile
function logoutMobile() {
  logout();
  isMenuOpen.value = false;
}
</script>

<style scoped>
nav a.router-link-exact-active {
  color: #009879;
  font-weight: 600;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>