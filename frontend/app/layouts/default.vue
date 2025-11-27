<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7] text-gray-900">
    <!-- 🌿 Navbar Responsif -->
    <header class="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-green-100">
      <nav class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/logoo.jpg" alt="Logo Greenomi" class="w-10 h-10 rounded-full shadow-md object-cover" />
          <h1 class="text-2xl font-bold text-[#009879] tracking-wide">Greenomi</h1>
        </NuxtLink>

        <!-- Menu Desktop -->
        <div class="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          <NuxtLink to="/" class="hover:text-[#009879] transition">Beranda</NuxtLink>
          <NuxtLink to="/about" class="hover:text-[#009879] transition">Tentang</NuxtLink>
          <NuxtLink to="/galeri" class="hover:text-[#009879] transition">Menu</NuxtLink>
          <NuxtLink to="/kontak" class="hover:text-[#009879] transition">Ulasan</NuxtLink>
          <NuxtLink v-if="isLoggedIn" to="/keranjang" class="hover:text-[#009879] transition relative">
            Keranjang
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {{ cartCount }}
            </span>
          </NuxtLink>
        </div>

        <!-- User Menu / Login Button -->
        <div class="flex items-center gap-4">
          <div v-if="isLoggedIn" class="flex items-center gap-3">
            <span class="text-sm text-gray-600">Hi, {{ user.name }}</span>
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">{{ user.role }}</span>
            <button @click="logout" class="bg-[#009879] text-white px-3 py-1 rounded text-sm hover:bg-[#007a63] transition">
              Logout
            </button>
          </div>
          <NuxtLink v-else to="/login" class="bg-[#009879] text-white px-4 py-2 rounded hover:bg-[#007a63] transition">
            Login
          </NuxtLink>
        </div>

        <!-- Hamburger Mobile -->
        <button
          @click="isOpen = !isOpen"
          class="md:hidden p-2 rounded-lg bg-[#009879] text-white active:scale-95 transition"
        >
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </nav>

      <!-- Menu Mobile -->
      <transition name="slide-fade">
        <div v-show="isOpen" class="md:hidden bg-white border-t shadow-inner flex flex-col text-gray-800">
          <NuxtLink to="/" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Beranda</NuxtLink>
          <NuxtLink to="/about" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Tentang</NuxtLink>
          <NuxtLink to="/galeri" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Menu</NuxtLink>
          <NuxtLink to="/kontak" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Ulasan</NuxtLink>
          <NuxtLink v-if="isLoggedIn" to="/keranjang" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">
            Keranjang {{ cartCount > 0 ? `(${cartCount})` : '' }}
          </NuxtLink>
        </div>
      </transition>
    </header>

    <!-- 🌸 Konten Utama -->
    <main class="flex-1 pt-20">
      <slot />
    </main>

    <!-- 🌿 Footer -->
    <footer class="text-center mt-auto py-10 text-gray-700">
      <p class="text-sm">
        © 2025 <strong class="text-[#009879]">Greenomi</strong> • Menyatukan harmoni alam dalam setiap tegukan.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const isLoggedIn = ref(false)
const user = ref({})
const cartCount = ref(0)

const closeMenu = () => {
  isOpen.value = false
}

onMounted(() => {
  checkLoginStatus()
  loadCartCount()
})

const checkLoginStatus = () => {
  const userData = localStorage.getItem('current_user')
  if (userData) {
    user.value = JSON.parse(userData)
    isLoggedIn.value = true
  }
}

const loadCartCount = () => {
  const userData = JSON.parse(localStorage.getItem('current_user') || '{}')
  let cart = []
  
  if (userData.id) {
    const userCart = localStorage.getItem(`cart_${userData.id}`)
    cart = userCart ? JSON.parse(userCart) : []
  } else {
    const globalCart = localStorage.getItem('cart')
    cart = globalCart ? JSON.parse(globalCart) : []
  }
  
  cartCount.value = cart.reduce((total, item) => total + (item.qty || 0), 0)
}

const logout = () => {
  localStorage.removeItem('current_user')
  isLoggedIn.value = false
  user.value = {}
  cartCount.value = 0
  navigateTo('/')
}
</script>

<style scoped>
.router-link-active {
  color: #009879;
  font-weight: bold;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>