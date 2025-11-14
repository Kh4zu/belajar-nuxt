<template>
  <div class="min-h-screen flex flex-col bg-[#F9FFF9] text-gray-900">

    <!-- 🌿 NAVBAR RESPONSIF -->
    <header class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-md">
      <nav class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <!-- LOGO -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/logoo.jpg" alt="Logo Greenomi" class="w-10 h-10 rounded-full shadow-md object-cover" />
          <h1 class="text-2xl font-bold text-[#009879] tracking-wide">Greenomi</h1>
        </NuxtLink>

        <!-- MENU DESKTOP -->
        <div class="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          <NuxtLink to="/" class="hover:text-[#009879] transition">Beranda</NuxtLink>
          <NuxtLink to="/about" class="hover:text-[#009879] transition">Tentang</NuxtLink>
          <NuxtLink to="/menu" class="hover:text-[#009879] transition">Menu</NuxtLink>
          <NuxtLink to="/keranjang" class="hover:text-[#009879] transition">Keranjang</NuxtLink>
        </div>

        <!-- HAMBURGER -->
        <button
          @click="isOpen = !isOpen"
          class="md:hidden bg-[#009879] p-2 rounded-lg text-white active:scale-95 transition"
        >
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </nav>

      <!-- MENU MOBILE -->
      <transition name="slide-fade">
        <div
          v-show="isOpen"
          class="md:hidden bg-white border-t shadow-inner flex flex-col text-gray-700"
        >
          <NuxtLink to="/" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Beranda</NuxtLink>
          <NuxtLink to="/about" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Tentang</NuxtLink>
          <NuxtLink to="/menu" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Menu</NuxtLink>
          <NuxtLink to="/keranjang" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Keranjang</NuxtLink>
        </div>
      </transition>
    </header>

    <!-- 🍵 MENU TEH -->
    <main class="flex-1 mt-32 px-6 text-center">
      <h2 class="text-5xl font-extrabold mb-6 text-[#006B5B]">Menu Teh Greenomi</h2>
      <p class="text-lg max-w-3xl mx-auto mb-14 leading-relaxed text-gray-700">
        Pilih varian teh favoritmu dan tambahkan ke keranjang.
      </p>

      <!-- GRID MENU -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="(item, index) in menu"
          :key="index"
          class="group bg-white rounded-3xl shadow-lg overflow-hidden border border-[#D0E8D0] hover:scale-105 transition-all duration-300"
        >
          <img :src="item.src" :alt="item.title" class="w-full h-64 object-cover"/>
          <div class="p-6 text-left">
            <h3 class="text-2xl font-bold text-[#009879] mb-2">{{ item.title }}</h3>
            <p class="text-gray-700 text-sm mb-3">{{ item.desc }}</p>
            <p class="text-lg font-semibold mb-3">Rp {{ item.price.toLocaleString('id-ID') }}</p>

            <button
              @click="addToCart(item)"
              class="bg-[#009879] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#00BFA6] transition-all"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>

      <!-- LINK KE KERANJANG -->
      <div v-if="cart.length" class="mt-16">
        <NuxtLink
          to="/keranjang"
          class="bg-[#009879] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00BFA6] transition-all"
        >
          Lihat Keranjang
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const closeMenu = () => (isOpen.value = false)

const menu = [
  { src: '/panas.jpg', title: 'Teh Hijau Asli', desc: 'Teh hijau murni dengan aroma alami dan rasa segar.', price: 15000 },
  { src: '/meelati.jpg', title: 'Teh Melati', desc: 'Kombinasi teh hijau dan bunga melati.', price: 18000 },
  { src: '/maduu.jpg', title: 'Teh Madu', desc: 'Teh hijau dengan madu alami.', price: 20000 },
  { src: '/leemon.jpg', title: 'Teh Lemon', desc: 'Kesegaran lemon alami.', price: 17000 },
  { src: '/bungaa.jpg', title: 'Teh Bunga Herbal', desc: 'Perpaduan teh hijau dan bunga alami.', price: 19000 },
  { src: '/esteh.jpg', title: 'Teh Hijau Dingin', desc: 'Teh hijau yang disajikan dingin.', price: 16000 }
]

const cart = ref([])

function addToCart(item) {
  const existing = cart.value.find(i => i.title === item.title)
  if (existing) {
    existing.qty++
  } else {
    cart.value.push({ ...item, qty: 1, opsi: '' })
  }
  localStorage.setItem('cart', JSON.stringify(cart.value))
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
  transform: translateY(-8px);
}
</style>
