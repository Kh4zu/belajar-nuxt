<template>
  <div class="min-h-screen flex flex-col bg-[#F9FFF9] text-gray-900">
    <!-- 🌿 Navbar -->
    <header
      class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-green-100"
    >
      <nav class="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo Greenomi"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-md object-cover"
          />
          <h1 class="text-xl sm:text-2xl font-bold text-[#009879] tracking-wide">Greenomi</h1>
        </div>

        <!-- Menu Desktop -->
        <div class="hidden md:flex space-x-6 lg:space-x-8 text-base sm:text-lg font-medium text-gray-700">
          <NuxtLink to="/" class="hover:text-[#009879] transition">Beranda</NuxtLink>
          <NuxtLink to="/about" class="hover:text-[#009879] transition">Tentang</NuxtLink>
          <NuxtLink to="/galeri" class="hover:text-[#009879] transition">Menu</NuxtLink>
          <NuxtLink to="/kontak" class="hover:text-[#009879] transition">Kontak</NuxtLink>
        </div>

        <!-- Tombol Menu Mobile -->
        <button
          class="md:hidden px-3 py-2 rounded-md bg-[#009879] text-white font-semibold focus:outline-none active:scale-95 transition"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Buka menu"
        >
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </nav>

      <!-- 🌿 Dropdown Mobile Menu -->
      <transition name="slide-fade">
        <div
          v-show="isMenuOpen"
          class="md:hidden flex flex-col bg-white border-t border-green-100 shadow-inner text-gray-800"
        >
          <NuxtLink
            to="/"
            class="px-6 py-3 hover:bg-[#E8F5E9] hover:text-[#009879] transition"
            @click="isMenuOpen = false"
            >Beranda</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="px-6 py-3 hover:bg-[#E8F5E9] hover:text-[#009879] transition"
            @click="isMenuOpen = false"
            >Tentang</NuxtLink
          >
          <NuxtLink
            to="/galeri"
            class="px-6 py-3 hover:bg-[#E8F5E9] hover:text-[#009879] transition"
            @click="isMenuOpen = false"
            >Menu</NuxtLink
          >
          <NuxtLink
            to="/kontak"
            class="px-6 py-3 hover:bg-[#E8F5E9] hover:text-[#009879] transition"
            @click="isMenuOpen = false"
            >Kontak</NuxtLink
          >
        </div>
      </transition>
    </header>

    <!-- ✨ Konten -->
    <main class="flex-1 pt-24 sm:pt-28 pb-20 px-3 sm:px-6 lg:px-10 bg-[#F9FFF9]">
      <slot />
    </main>

    <!-- 🌿 Footer -->
    <footer class="bg-[#009879] text-white py-10 text-center mt-auto">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-6 md:space-y-0">
          <div class="flex items-center gap-3">
            <img
              src="/logo.png"
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
import { ref } from "vue";
const isMenuOpen = ref(false);
</script>

<style scoped>
nav a.router-link-exact-active {
  color: #009879;
  font-weight: 600;
}

/* Animasi transisi menu mobile */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Biar konten tidak ketutup navbar */
main {
  padding-top: 6rem;
}

/* Responsif tambahan */
@media (max-width: 768px) {
  main {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 5.5rem;
  }
}
</style>

