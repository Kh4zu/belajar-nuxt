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
        </div>
      </transition>
    </header>

    <!-- 🌸 Konten Utama -->
    <main class="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto text-gray-800">
      <h2 class="text-5xl font-extrabold text-center text-[#009879] mb-10">
        Tentang <span class="text-[#006B5B]">Greenomi</span>
      </h2>

      <p class="text-lg md:text-xl leading-relaxed text-justify mb-10">
        <strong>Greenomi</strong> adalah merek teh hijau alami yang lahir dari semangat untuk menghadirkan keseimbangan
        antara tubuh, pikiran, dan alam. Nama “Greenomi” sendiri berasal dari dua kata: <em>“Green”</em> yang melambangkan
        kesegaran dan alam, serta <em>“Harmony”</em> yang berarti keharmonisan hidup. Filosofi ini menjadi dasar dari setiap
        cangkir teh yang kami hasilkan — menenangkan, menyehatkan, dan menyatu dengan alam.
      </p>

      <p class="text-lg md:text-xl leading-relaxed text-justify mb-10">
        Kami percaya bahwa teh bukan sekadar minuman, melainkan ritual kecil untuk menghargai waktu dan ketenangan.
        Setiap daun teh Greenomi dipetik dengan penuh perhatian dari kebun teh terbaik di dataran tinggi Indonesia.
        Kami memadukan daun teh hijau muda dengan bunga melati segar dan madu alami untuk menghasilkan perpaduan rasa
        yang lembut, manis, dan aromatik. Tanpa bahan pengawet, tanpa pewarna buatan — hanya kebaikan alami dari alam.
      </p>

      <p class="text-lg md:text-xl leading-relaxed text-justify mb-10">
        Lebih dari sekadar produk, <strong>Greenomi</strong> adalah gerakan kecil untuk hidup lebih selaras dengan alam.
        Kami bekerja sama langsung dengan petani lokal dan menggunakan kemasan ramah lingkungan untuk mendukung bumi
        yang lebih hijau. Setiap pembelian Greenomi bukan hanya tentang kenikmatan rasa, tapi juga kontribusi terhadap
        keberlanjutan dan kesejahteraan masyarakat lokal.
      </p>

      <!-- 🌿 Visi dan Misi -->
      <div class="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-green-100 space-y-10">
        <div>
          <h3 class="text-3xl font-bold text-[#009879] mb-4 text-center">🌱 Visi Kami</h3>
          <p class="text-lg leading-relaxed text-center text-gray-700">
            Menjadi merek teh hijau alami terbaik di Indonesia yang membawa keharmonisan antara rasa, alam, dan ketenangan hidup.
          </p>
        </div>

        <div class="border-t-2 border-green-200 my-6"></div>

        <div>
          <h3 class="text-3xl font-bold text-[#009879] mb-4 text-center">🍵 Misi Kami</h3>
          <ul class="list-disc list-inside text-lg leading-relaxed text-gray-700 space-y-3 text-justify">
            <li>Menyediakan produk teh hijau berkualitas tinggi tanpa bahan kimia dan pengawet.</li>
            <li>Mendukung pertanian berkelanjutan dan kesejahteraan petani lokal.</li>
            <li>Mengedukasi masyarakat tentang manfaat teh hijau bagi kesehatan dan ketenangan hidup.</li>
            <li>Menghadirkan pengalaman minum teh yang menenangkan, alami, dan bermakna.</li>
          </ul>
        </div>
      </div>

      <!-- 🍃 Nilai Inti -->
      <div class="mt-14 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-green-100">
        <h3 class="text-3xl font-bold text-[#009879] mb-6 text-center">💚 Nilai Inti Greenomi</h3>
        <ul class="list-disc list-inside text-lg leading-relaxed text-gray-700 space-y-3 text-justify">
          <li><strong>Keaslian:</strong> Setiap produk dibuat dengan bahan alami tanpa campuran buatan.</li>
          <li><strong>Keseimbangan:</strong> Greenomi membantu menemukan harmoni antara tubuh, pikiran, dan alam.</li>
          <li><strong>Keberlanjutan:</strong> Kami berkomitmen menjaga bumi melalui proses produksi yang ramah lingkungan.</li>
          <li><strong>Ketenangan:</strong> Teh Greenomi adalah simbol dari jeda sejenak untuk menikmati kehidupan yang sederhana.</li>
        </ul>
      </div>

      <!-- Tombol kembali -->
      <div class="text-center mt-12">
        <NuxtLink
          to="/"
          class="inline-block bg-[#009879] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#00BFA6] hover:scale-105 transition-all duration-300"
        >
          ← Kembali ke Beranda
        </NuxtLink>
      </div>
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
