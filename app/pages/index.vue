<template>
  <div class="text-gray-900">

    <!-- 🌿 NAVBAR RESPONSIF -->
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

        <!-- HAMBURGER -->
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

    <!-- 🍃 HERO SECTION -->
    <section
      class="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7] text-center flex flex-col items-center"
    >
      <h1 class="text-4xl sm:text-6xl font-extrabold text-[#006B5B] mb-6 leading-tight">
        Harmoni Alam dalam <span class="text-[#009879]">Setiap Tegukan</span>
      </h1>
      <p class="text-base sm:text-xl max-w-2xl text-gray-700 mb-8 leading-relaxed">
        <strong>Greenomi</strong> adalah teh hijau alami yang dipadukan dengan
        <span class="text-[#009879] font-semibold">bunga melati</span> dan
        <span class="text-[#009879] font-semibold">madu hutan</span>.
      </p>
      <NuxtLink
        to="/galeri"
        class="bg-[#009879] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-md hover:bg-[#00BFA6] hover:scale-105 transition-all duration-300"
      >
        Jelajahi Produk Kami
      </NuxtLink>
    </section>

    <!-- 🍵 BAHAN-BAHAN -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 bg-white text-center">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-[#006B5B] mb-10">
          Tiga Bahan Alami yang Menyatu Sempurna
        </h2>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          
          <!-- 🍃 TEH HIJAU -->
          <div class="bg-[#F9FFF9] rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
            <img src="/ijo.jpg" class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full object-cover" />
            <h3 class="text-xl sm:text-2xl font-semibold text-[#009879] mb-2">🍃 Teh Hijau</h3>
            <p class="text-gray-700 text-sm sm:text-base">Dipetik dari daun muda pilihan, kaya antioksidan dan menjaga vitalitas tubuh.</p>
          </div>

          <!-- 🌸 BUNGA MELATI -->
          <div class="bg-[#F9FFF9] rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
            <img src="/bahan.jpg" class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full object-cover" />
            <h3 class="text-xl sm:text-2xl font-semibold text-[#009879] mb-2">🌸 Bunga Melati</h3>
            <p class="text-gray-700 text-sm sm:text-base">Memberikan aroma menenangkan yang membuat pikiran lebih rileks.</p>
          </div>

          <!-- 🍯 MADU HUTAN -->
          <div class="bg-[#F9FFF9] rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
            <img src="/madu.jpg" class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full object-cover" />
            <h3 class="text-xl sm:text-2xl font-semibold text-[#009879] mb-2">🍯 Madu Hutan</h3>
            <p class="text-gray-700 text-sm sm:text-base">Memberikan sentuhan manis alami dan menambah kehangatan setiap tegukan.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- 🌿 CTA -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-t from-[#C8E6C9] to-[#E8F5E9] text-center">
      <h2 class="text-3xl sm:text-4xl font-bold text-[#006B5B] mb-6">
        Siap Merasakan Kehangatan Alami?
      </h2>
      <p class="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto mb-8">
        Cicipi keaslian rasa alami yang menenangkan tubuh dan pikiran.  
        Setiap tegukan adalah perjalanan menuju harmoni.
      </p>
      <NuxtLink
        to="/galeri"
        class="bg-[#009879] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-md hover:bg-[#00BFA6] hover:scale-105 transition-all duration-300"
      >
        Lihat Menu Teh Kami
      </NuxtLink>
    </section>

  </div>
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
