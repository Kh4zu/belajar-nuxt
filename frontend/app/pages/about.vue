<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
    <!-- 🌿 Modern Navbar -->
    <header class="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-emerald-100/50">
      <nav class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="relative">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span class="text-white font-bold text-lg">🍃</span>
            </div>
            <div class="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          </div>
          <div>
            <h1 class="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Greenomi
            </h1>
            <p class="text-xs text-gray-500 -mt-1">Natural Harmony</p>
          </div>
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink 
            to="/" 
            class="text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group"
          >
            Beranda
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-emerald-600 font-semibold transition-all duration-300 relative"
          >
            Tentang
            <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"></span>
          </NuxtLink>
          <NuxtLink 
            to="/galeri" 
            class="text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group"
          >
            Menu
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink 
            to="/kontak" 
            class="text-gray-700 hover:text-emerald-600 font-medium transition-all duration-300 relative group"
          >
            Ulasan
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isOpen = !isOpen"
          class="md:hidden p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-4"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-show="isOpen" class="md:hidden bg-white/95 backdrop-blur-xl border-t border-emerald-100/50 shadow-lg">
          <div class="flex flex-col p-4 space-y-2">
            <NuxtLink 
              to="/" 
              class="px-4 py-3 rounded-2xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 font-medium transition-all duration-300 flex items-center gap-3"
              @click="closeMenu"
            >
              <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
              Beranda
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-600 font-semibold transition-all duration-300 flex items-center gap-3"
              @click="closeMenu"
            >
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Tentang
            </NuxtLink>
            <NuxtLink 
              to="/galeri" 
              class="px-4 py-3 rounded-2xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 font-medium transition-all duration-300 flex items-center gap-3"
              @click="closeMenu"
            >
              <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
              Menu
            </NuxtLink>
            <NuxtLink 
              to="/kontak" 
              class="px-4 py-3 rounded-2xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 font-medium transition-all duration-300 flex items-center gap-3"
              @click="closeMenu"
            >
              <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
              Ulasan
            </NuxtLink>
          </div>
        </div>
      </transition>
    </header>

    <!-- 🌸 Main Content -->
    <main class="pt-28 pb-20 px-4 sm:px-6">
      <!-- Hero Section -->
      <section class="max-w-6xl mx-auto text-center mb-20">
        <!-- Decorative Elements -->
        <div class="relative">
          <div class="absolute -top-10 -left-10 w-20 h-20 bg-emerald-300/30 rounded-full blur-xl"></div>
          <div class="absolute -top-5 -right-5 w-16 h-16 bg-teal-300/20 rounded-full blur-lg"></div>
          
          <div class="relative">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg mb-8 border border-emerald-200/50">
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-semibold text-emerald-700">Tentang Greenomi</span>
            </div>

            <h1 class="text-5xl sm:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Cerita di Balik
              <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block mt-2">
                Setiap Tegukan
              </span>
            </h1>

            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Menemukan harmoni dalam kesederhanaan alam, menghadirkan kedamaian 
              dalam setiap cangkir teh hijau premium kami.
            </p>
          </div>
        </div>
      </section>

      <!-- Philosophy Section -->
      <section class="max-w-6xl mx-auto mb-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Content -->
          <div class="space-y-8">
            <div>
              <h2 class="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                Filosofi
                <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Greenomi
                </span>
              </h2>
              <div class="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6"></div>
            </div>

            <div class="space-y-6">
              <p class="text-lg text-gray-700 leading-relaxed">
                <strong class="text-emerald-700">Greenomi</strong> lahir dari kecintaan akan alam dan keinginan 
                untuk menghadirkan keseimbangan dalam kehidupan modern. Nama kami berasal dari perpaduan 
                <em class="text-emerald-600">"Green"</em> yang melambangkan kesegaran alam, dan 
                <em class="text-emerald-600">"Harmony"</em> yang mencerminkan keharmonisan hidup.
              </p>

              <p class="text-lg text-gray-700 leading-relaxed">
                Kami meyakini bahwa teh bukan sekadar minuman, melainkan sebuah ritual untuk merayakan 
                momen-momen sederhana dalam hidup. Setiap daun teh dipetik dengan penuh perhatian dari 
                kebun terbaik di Indonesia, dipadukan dengan bunga melati segar dan madu hutan asli 
                untuk menciptakan pengalaman rasa yang tak terlupakan.
              </p>

              <p class="text-lg text-gray-700 leading-relaxed">
                Lebih dari sekadar produk, Greenomi adalah komitmen kami terhadap keberlanjutan dan 
                kesejahteraan masyarakat lokal. Setiap pembelian Anda turut mendukung petani lokal 
                dan pelestarian lingkungan.
              </p>
            </div>
          </div>

          <!-- Visual -->
          <div class="relative">
            <div class="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-8 shadow-2xl">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div class="text-center text-white">
                  <div class="text-6xl mb-4">🍃</div>
                  <h3 class="text-2xl font-bold mb-4">Harmoni Alam</h3>
                  <p class="text-white/80 leading-relaxed">
                    Dalam kesederhanaan terdapat kedamaian, 
                    dalam setiap tegukan terdapat harmoni
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full shadow-lg"></div>
            <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-rose-400 rounded-full shadow-lg"></div>
          </div>
        </div>
      </section>

      <!-- Vision & Mission Section -->
      <section class="max-w-6xl mx-auto mb-20">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Vision Card -->
          <div class="group relative">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div class="relative bg-white rounded-3xl p-8 shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-500">
              <div class="text-center mb-8">
                <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl text-white">🌱</span>
                </div>
                <h3 class="text-3xl font-black text-gray-900 mb-4">Visi Kami</h3>
              </div>
              <p class="text-lg text-gray-700 text-center leading-relaxed">
                Menjadi pelopor merek teh hijau alami terdepan di Indonesia yang menghadirkan 
                keseimbangan sempurna antara rasa autentik, kelestarian alam, dan ketenangan jiwa 
                dalam setiap produk.
              </p>
            </div>
          </div>

          <!-- Mission Card -->
          <div class="group relative">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div class="relative bg-white rounded-3xl p-8 shadow-xl border border-amber-100 hover:shadow-2xl transition-all duration-500">
              <div class="text-center mb-8">
                <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl text-white">🎯</span>
                </div>
                <h3 class="text-3xl font-black text-gray-900 mb-4">Misi Kami</h3>
              </div>
              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span class="text-gray-700">Menyediakan produk teh hijau organik berkualitas premium tanpa bahan kimia</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span class="text-gray-700">Mendukung praktik pertanian berkelanjutan dan kesejahteraan petani lokal</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span class="text-gray-700">Mengedukasi masyarakat tentang manfaat teh hijau bagi kesehatan holistik</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span class="text-gray-700">Menghadirkan pengalaman minum teh yang transformatif dan penuh makna</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values Section -->
      <section class="max-w-6xl mx-auto mb-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Nilai
            <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Inti Kami
            </span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Prinsip-prinsip yang menjadi fondasi setiap langkah dan keputusan kami
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Value 1 -->
          <div class="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-white text-lg">💎</span>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Keaslian</h4>
            <p class="text-gray-600 leading-relaxed">
              Setiap produk dibuat dengan bahan alami pilihan, tanpa campuran buatan atau pengawet
            </p>
          </div>

          <!-- Value 2 -->
          <div class="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-white text-lg">⚖️</span>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Keseimbangan</h4>
            <p class="text-gray-600 leading-relaxed">
              Menghadirkan harmoni antara tubuh, pikiran, dan alam melalui setiap tegukan
            </p>
          </div>

          <!-- Value 3 -->
          <div class="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-white text-lg">🌍</span>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Keberlanjutan</h4>
            <p class="text-gray-600 leading-relaxed">
              Berkomitmen penuh pada praktik ramah lingkungan dan dukungan pada petani lokal
            </p>
          </div>

          <!-- Value 4 -->
          <div class="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-white text-lg">🧘</span>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Ketenangan</h4>
            <p class="text-gray-600 leading-relaxed">
              Menjadi pengingat untuk berhenti sejenak dan menikmati kehidupan yang sederhana
            </p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="max-w-4xl mx-auto text-center">
        <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-3xl sm:text-4xl font-black mb-6">
              Siap Memulai Perjalanan Rasa?
            </h3>
            <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Temukan harmoni dalam setiap tegukan dan rasakan kedamaian sejati bersama Greenomi
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NuxtLink
                to="/galeri"
                class="group bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <span>Jelajahi Menu</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </NuxtLink>
              
              <NuxtLink
                to="/"
                class="group border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
              >
                <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <span>Kembali ke Beranda</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 🌿 Modern Footer -->
    <footer class="bg-white/80 backdrop-blur-xl border-t border-emerald-100/50 py-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-sm">🍃</span>
            </div>
            <span class="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Greenomi
            </span>
          </div>
          <p class="text-gray-600 mb-6 max-w-md mx-auto">
            Menyatukan harmoni alam dalam setiap tegukan, menghadirkan kedamaian dalam kesederhanaan
          </p>
          <div class="text-sm text-gray-500">
            © 2024 <strong class="text-emerald-600">Greenomi</strong> • Crafted with 💚 and 🍵
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const closeMenu = () => {
  isOpen.value = false
}
</script>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom gradient text */
.gradient-text {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass morphism effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.floating {
  animation: float 3s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}
</style>