<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
    <!-- Welcome Notification -->
    <div v-if="showWelcome" class="fixed top-20 right-4 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-2xl shadow-xl max-w-sm animate-slide-in">
      <div class="flex items-center gap-3">
        <div class="bg-white/20 p-2 rounded-full">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-semibold text-sm">Selamat Datang!</p>
          <p class="text-xs opacity-90">Login sebagai <strong>{{ userRole }}</strong></p>
        </div>
        <button @click="showWelcome = false" class="text-white/80 hover:text-white transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 🍃 Hero Section -->
    <section class="relative pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-teal-300/5 to-green-400/10"></div>
      <div class="absolute top-10 left-10 w-20 h-20 bg-emerald-300/30 rounded-full blur-xl"></div>
      <div class="absolute bottom-10 right-10 w-32 h-32 bg-teal-300/20 rounded-full blur-2xl"></div>
      
      <div class="relative max-w-6xl mx-auto text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-8">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-emerald-700">100% Alami & Organik</span>
        </div>

        <h1 class="text-5xl sm:text-7xl font-black text-gray-900 mb-6 leading-tight">
          <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Harmoni Alam
          </span>
          <br>
          <span class="text-gray-800">dalam Setiap Tegukan</span>
        </h1>
        
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          <span class="font-semibold text-emerald-700">Greenomi</span> menghadirkan perpaduan sempurna 
          <span class="text-emerald-600 font-medium">teh hijau premium</span>,
          <span class="text-emerald-600 font-medium">bunga melati</span>, dan
          <span class="text-emerald-600 font-medium">madu hutan asli</span>
          untuk pengalaman rasa yang tak terlupakan.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink
            to="/galeri"
            class="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>Jelajahi Menu</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </NuxtLink>
          
          <NuxtLink
            to="/about"
            class="group border-2 border-emerald-200 text-emerald-700 px-8 py-4 rounded-2xl font-semibold hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 flex items-center gap-2"
          >
            <span>Tentang Kami</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-3xl font-bold text-emerald-600">500+</div>
            <div class="text-sm text-gray-600">Pelanggan Bahagia</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-emerald-600">99%</div>
            <div class="text-sm text-gray-600">Kepuasan Pelanggan</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-emerald-600">100%</div>
            <div class="text-sm text-gray-600">Bahan Alami</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 🍵 Bahan Premium Section -->
    <section class="py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Bahan-Bahan <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Premium</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Setiap bahan dipilih dengan ketat untuk memastikan kualitas terbaik dalam setiap cangkir
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Teh Hijau Card -->
          <div class="group relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100">
            <div class="absolute top-6 right-6 w-12 h-12 bg-emerald-500/10 rounded-full group-hover:scale-110 transition-transform"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span class="text-2xl">🍃</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Teh Hijau Premium</h3>
              <p class="text-gray-600 leading-relaxed">
                Dipetik dari pucuk daun muda di dataran tinggi, kaya antioksidan dan memberikan rasa segar yang khas.
              </p>
            </div>
          </div>

          <!-- Bunga Melati Card -->
          <div class="group relative bg-gradient-to-br from-white to-rose-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-rose-100">
            <div class="absolute top-6 right-6 w-12 h-12 bg-rose-500/10 rounded-full group-hover:scale-110 transition-transform"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span class="text-2xl">🌸</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Bunga Melati Segar</h3>
              <p class="text-gray-600 leading-relaxed">
                Aroma melati alami yang menenangkan, dipetik di pagi hari untuk menjaga kesegarannya.
              </p>
            </div>
          </div>

          <!-- Madu Hutan Card -->
          <div class="group relative bg-gradient-to-br from-white to-amber-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100">
            <div class="absolute top-6 right-6 w-12 h-12 bg-amber-500/10 rounded-full group-hover:scale-110 transition-transform"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span class="text-2xl">🍯</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Madu Hutan Asli</h3>
              <p class="text-gray-600 leading-relaxed">
                Madu alami dari hutan Indonesia, memberikan rasa manis alami dan berbagai manfaat kesehatan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 🌿 CTA Section -->
    <section class="relative py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>
      
      <div class="relative max-w-4xl mx-auto text-center">
        <h2 class="text-4xl sm:text-5xl font-black mb-6">
          Siap Merasakan <span class="text-amber-300">Keajaiban Alam?</span>
        </h2>
        <p class="text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Setiap tegukan Greenomi adalah perjalanan sensori yang menenangkan jiwa dan menyegarkan tubuh. 
          Rasakan harmoni sejati dalam cangkir Anda.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink
            to="/galeri"
            class="group bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <span>Pesan Sekarang</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
          
          <button class="group border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-3">
            <span>Lihat Testimoni</span>
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const showWelcome = ref(false)
const userRole = ref('')

onMounted(() => {
  const userData = localStorage.getItem('current_user')
  if (userData) {
    const user = JSON.parse(userData)
    userRole.value = user.role
    showWelcome.value = true
    
    setTimeout(() => {
      showWelcome.value = false
    }, 5000)
  }
})
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom gradient backgrounds */
.glass-effect {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>