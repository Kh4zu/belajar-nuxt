<template>
  <div class="min-h-screen bg-[#F9FFF9]">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-[#009879]">
            GreenOMI
          </NuxtLink>
          
          <nav class="flex items-center gap-6">
            <NuxtLink to="/" class="text-gray-700 hover:text-[#009879] transition">Home</NuxtLink>
            <NuxtLink to="/galeri" class="text-gray-700 hover:text-[#009879] transition">Menu</NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-[#009879] transition">Tentang</NuxtLink>
            <NuxtLink to="/kontak" class="text-gray-700 hover:text-[#009879] transition">Ulasan</NuxtLink>
            <NuxtLink to="/keranjang" class="text-gray-700 hover:text-[#009879] transition relative">
              Keranjang
              <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {{ cartCount }}
              </span>
            </NuxtLink>
            
            <!-- User Menu -->
            <div class="flex items-center gap-3 ml-4 pl-4 border-l">
              <span class="text-sm text-gray-600">Hi, {{ user.name }}</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">{{ user.role }}</span>
              <button @click="logout" class="bg-[#009879] text-white px-3 py-1 rounded text-sm hover:bg-[#007a63] transition">
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="pt-20">
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="bg-[#009879] text-white py-8 mt-12">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2024 GreenOMI. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref({})
const cartCount = ref(0)

onMounted(() => {
  loadUserData()
  loadCartCount()
})

const loadUserData = () => {
  const userData = localStorage.getItem('current_user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
}

const loadCartCount = () => {
  const userData = JSON.parse(localStorage.getItem('current_user') || '{}')
  let cart = []
  
  if (userData.id) {
    // Load cart spesifik user
    const userCart = localStorage.getItem(`cart_${userData.id}`)
    cart = userCart ? JSON.parse(userCart) : []
  } else {
    // Fallback ke cart global
    const globalCart = localStorage.getItem('cart')
    cart = globalCart ? JSON.parse(globalCart) : []
  }
  
  cartCount.value = cart.reduce((total, item) => total + (item.qty || 0), 0)
}

const logout = () => {
  localStorage.removeItem('current_user')
  navigateTo('/')
}
</script>

<style scoped>
.router-link-active {
  color: #009879;
  font-weight: bold;
}
</style>