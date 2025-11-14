<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
    <nav class="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">

      <!-- LOGO -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/logoo.jpg" alt="Logo Greenomi" class="w-10 h-10 rounded-full object-cover shadow" />
        <span class="text-2xl font-bold text-[#009879] tracking-wide">Greenomi</span>
      </NuxtLink>

      <!-- MENU DESKTOP -->
      <div class="hidden md:flex gap-8 text-gray-700 font-medium">
        <NuxtLink to="/" class="hover:text-[#009879] transition">Beranda</NuxtLink>
        <NuxtLink to="/about" class="hover:text-[#009879] transition">Tentang</NuxtLink>
        <NuxtLink to="/galeri" class="hover:text-[#009879] transition">Menu</NuxtLink>
        <NuxtLink to="/kontak" class="hover:text-[#009879] transition">Kontak</NuxtLink>
      </div>

      <!-- HAMBURGER ICON -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden p-2 rounded-lg bg-[#009879] text-white active:scale-95 transition"
      >
        <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

    </nav>

    <!-- MENU MOBILE -->
    <transition name="slide-fade">
      <div
        v-show="isOpen"
        class="md:hidden bg-white border-t shadow-inner flex flex-col text-gray-800"
      >
        <NuxtLink to="/" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Beranda</NuxtLink>
        <NuxtLink to="/about" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Tentang</NuxtLink>
        <NuxtLink to="/galeri" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Menu</NuxtLink>
        <NuxtLink to="/kontak" class="px-6 py-3 hover:bg-green-50" @click="closeMenu">Kontak</NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const closeMenu = () => (isOpen.value = false)
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
