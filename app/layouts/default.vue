<template>
  <div class="min-h-screen flex flex-col bg-[#F9FFF9] text-gray-900">
    <!-- 🌿 Navbar Sederhana (no external icons) -->
    <header
      class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-green-100"
    >
      <nav class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <!-- Pastikan file /logo.png ada di folder public/ -->
          <img src="" alt="Logo Greenomi" class="w-10 h-10 rounded-full shadow-md object-cover" />
          <h1 class="text-2xl font-bold text-[#009879] tracking-wide">Greenomi</h1>
        </div>

        <!-- Menu (desktop) -->
        <div class="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          <NuxtLink to="/" class="hover:text-[#009879] transition">Beranda</NuxtLink>
          <NuxtLink to="/about" class="hover:text-[#009879] transition">Tentang</NuxtLink>
          <NuxtLink to="/galeri" class="hover:text-[#009879] transition">Menu</NuxtLink>
          <NuxtLink to="/kontak" class="hover:text-[#009879] transition">Kontak</NuxtLink>
        </div>

        <!-- Simple mobile menu button (no JS required here) -->
        <div class="md:hidden">
          <button aria-label="Buka menu" class="px-3 py-2 rounded-md bg-[#009879] text-white font-semibold">
            Menu
          </button>
        </div>
      </nav>
    </header>

    <!-- ✨ Konten Halaman (slot untuk children) -->
    <main class="flex-1 pt-28 pb-20 px-6 bg-[#F9FFF9]">
      <slot />
    </main>

    <!-- 🌿 Footer Konsisten -->
    <footer class="bg-[#009879] text-white py-10 text-center mt-auto">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center mb-4">
          <div class="flex items-center gap-3 mb-4 md:mb-0">
            <img src="" alt="Logo Greenomi" class="w-10 h-10 rounded-full shadow-md object-cover" />
            <div class="text-left">
              <p class="text-lg font-bold">Greenomi</p>
              <p class="text-sm text-white/80">Pagujaten, Jakarta Selatan</p>
            </div>
          </div>

          <div class="text-sm text-white/80">
            <p>Jam Buka: 08.00 - 21.00 (Setiap Hari)</p>
            <p class="mt-2">✉ greenomi@gmail.com • 📞 +62 838-9554-5946</p>
          </div>
        </div>

        <p class="text-white/70 text-sm mt-6">
          © 2025 Greenomi. Didedikasikan untuk keharmonisan dalam setiap tegukan.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Tidak ada script tambahan — komponen ini murni presentasional.
// Pastikan di folder project/public ada:
// - logo.png (logo Greenomi)
// Jika belum ada, tambahkan gambar dengan nama tersebut atau ganti path img di atas.
</script>

<style scoped>
nav a.router-link-exact-active {
  color: #009879;
  font-weight: 600;
}
/* Responsif spacing kecil */
@media (max-width: 768px) {
  main { padding-left: 1.25rem; padding-right: 1.25rem; }
}
</style>
