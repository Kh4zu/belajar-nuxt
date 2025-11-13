<template>
  <div class="min-h-screen flex flex-col bg-[#F9FFF9] text-gray-900">
    <!-- 🌿 Navbar -->
    <header class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-green-100">
      <nav class="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-3 md:py-4">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <img src="" alt="Logo Greenomi" class="w-10 h-10 rounded-full shadow-md" />
          <h1 class="text-xl md:text-2xl font-bold text-[#009879] tracking-wide">Greenomi</h1>
        </div>

        <!-- Menu -->
        <div class="hidden md:flex space-x-6 md:space-x-8 text-base md:text-lg font-medium text-gray-700">
          <NuxtLink to="/" class="hover:text-[#009879] transition">Beranda</NuxtLink>
          <NuxtLink to="/about" class="hover:text-[#009879] transition">Tentang</NuxtLink>
          <NuxtLink to="/galeri" class="hover:text-[#009879] transition">Menu</NuxtLink>
          <NuxtLink to="/kontak" class="hover:text-[#009879] transition">Ulasan</NuxtLink>
        </div>

        <!-- 🔽 Mobile Menu Toggle -->
        <button @click="isOpen = !isOpen" class="md:hidden text-[#009879] text-2xl focus:outline-none">
          <span v-if="!isOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </nav>

      <!-- 📱 Mobile Menu -->
      <transition name="fade">
        <div v-if="isOpen" class="md:hidden bg-white border-t border-green-100 shadow-md">
          <div class="flex flex-col text-center py-4 space-y-3 text-gray-700 text-lg font-medium">
            <NuxtLink @click="isOpen = false" to="/">Beranda</NuxtLink>
            <NuxtLink @click="isOpen = false" to="/about">Tentang</NuxtLink>
            <NuxtLink @click="isOpen = false" to="/galeri">Menu</NuxtLink>
            <NuxtLink @click="isOpen = false" to="/kontak">Ulasan</NuxtLink>
          </div>
        </div>
      </transition>
    </header>

    <!-- 🍃 Hero Section -->
    <section class="pt-28 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 bg-gradient-to-b from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7] text-center flex flex-col items-center">
      <h1 class="text-4xl md:text-6xl font-extrabold text-[#006B5B] mb-6 leading-tight">
        Harmoni Alam dalam <span class="text-[#009879]">Setiap Tegukan</span>
      </h1>
      <p class="text-base md:text-xl max-w-2xl text-gray-700 mb-8 leading-relaxed">
        <strong>Greenomi</strong> adalah teh hijau alami yang dipadukan dengan 
        <span class="text-[#009879] font-semibold">bunga melati</span> dan
        <span class="text-[#009879] font-semibold">madu hutan</span>.
      </p>
      <NuxtLink
        to=""
        class="bg-[#009879] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold shadow-md hover:bg-[#00BFA6] hover:scale-105 transition-all duration-300"
      >
        Jelajahi Produk Kami
      </NuxtLink>
    </section>

    <!-- 🍵 Tentang Bahan-Bahan -->
    <section class="py-16 md:py-20 px-4 md:px-6 bg-white text-center">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-[#006B5B] mb-10">
          Tiga Bahan Alami yang Menyatu Sempurna
        </h2>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          <div class="bg-[#F9FFF9] rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
            <img src="/ijo.jpg" alt="Teh Hijau" class="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full object-cover" />
            <h3 class="text-xl md:text-2xl font-semibold text-[#009879] mb-2">🍃 Teh Hijau</h3>
            <p class="text-gray-700 text-sm md:text-base">
              Dipetik dari daun muda pilihan, kaya antioksidan dan menjaga vitalitas tubuh.
            </p>
          </div>

          <div class="bg-[#F9FFF9] rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
            <img src="/bahan.jpg" alt="Bunga Melati" class="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full object-cover" />
            <h3 class="text-xl md:text-2xl font-semibold text-[#009879] mb-2">🌸 Bunga Melati</h3>
            <p class="text-gray-700 text-sm md:text-base">
              Memberikan aroma menenangkan yang membuat pikiran lebih rileks.
            </p>
          </div>

          <div class="bg-[#F9FFF9] rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
            <img src="/madu.jpg" alt="Madu Hutan" class="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full object-cover" />
            <h3 class="text-xl md:text-2xl font-semibold text-[#009879] mb-2">🍯 Madu Hutan</h3>
            <p class="text-gray-700 text-sm md:text-base">
              Memberikan sentuhan manis alami dan menambah kehangatan setiap tegukan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 🌱 Kenapa Harus Greenomi -->
    <section class="py-16 md:py-24 bg-[#E8F5E9] text-center px-4 md:px-6">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-[#006B5B] mb-10">Kenapa Harus Memilih Greenomi?</h2>

        <div class="grid sm:grid-cols-2 gap-8 md:gap-10 text-left">
          <div class="bg-white rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 border-l-8 border-[#009879]">
            <h3 class="text-xl md:text-2xl font-semibold text-[#009879] mb-3">🌿 100% Alami</h3>
            <p class="text-gray-700 leading-relaxed text-sm md:text-base">
              Tanpa bahan pengawet dan pewarna buatan, menjaga keaslian rasa alam.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 border-l-8 border-[#009879]">
            <h3 class="text-xl md:text-2xl font-semibold text-[#009879] mb-3">☕ Dibuat dengan Cinta</h3>
            <p class="text-gray-700 leading-relaxed text-sm md:text-base">
              Dipetik secara <em>handcrafted</em> oleh petani lokal untuk kualitas terbaik.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 border-l-8 border-[#009879]">
            <h3 class="text-xl md:text-2xl font-semibold text-[#009879] mb-3">🍯 Kaya Manfaat</h3>
            <p class="text-gray-700 leading-relaxed text-sm md:text-base">
              Mengandung antioksidan tinggi dan madu alami yang meningkatkan imunitas.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 border-l-8 border-[#009879]">
            <h3 class="text-xl md:text-2xl font-semibold text-[#009879] mb-3">🌸 Rasa Menenangkan</h3>
            <p class="text-gray-700 leading-relaxed text-sm md:text-base">
              Perpaduan teh hijau, melati, dan madu menghadirkan relaksasi alami.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 🛒 CTA -->
    <section class="py-20 md:py-24 px-4 md:px-6 bg-gradient-to-r from-[#A5D6A7] via-[#C8E6C9] to-[#E8F5E9] text-[#004D40] text-center rounded-t-3xl shadow-inner">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Siap Menyatu dengan Kehangatan Alam?</h2>
      <p class="text-base md:text-lg mb-8 text-gray-700">
        Dapatkan teh hijau Greenomi dan rasakan keseimbangan alami dalam setiap tegukan.
      </p>
      <NuxtLink
        to="/galeri"
        class="bg-[#009879] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold hover:bg-[#00BFA6] hover:scale-105 transition-all duration-300"
      >
        Beli Sekarang
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style scoped>
nav a.router-link-exact-active {
  color: #009879;
  font-weight: 600;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
