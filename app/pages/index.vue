<template>
  <div class="min-h-screen flex flex-col bg-[#F9FFF9] text-gray-900">
    <!-- 🌿 Navbar -->
    <header
      class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-green-100"
    >
      <nav class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <img src="" alt="Logo Greenomi" class="w-10 h-10 rounded-full shadow-md" />
          <h1 class="text-2xl font-bold text-[#009879] tracking-wide">Greenomi</h1>
        </div>

        <!-- Menu -->
        <div class="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          <NuxtLink to="/" class="hover:text-[#009879] transition">Beranda</NuxtLink>
          <NuxtLink to="/about" class="hover:text-[#009879] transition">Tentang</NuxtLink>
          <NuxtLink to="/galeri" class="hover:text-[#009879] transition">Menu</NuxtLink>
          <NuxtLink to="/kontak" class="hover:text-[#009879] transition">Ulasan</NuxtLink>
        </div>
      </nav>
    </header>

    <!-- 🍃 Hero Section -->
    <section
      class="pt-32 pb-24 px-6 bg-gradient-to-b from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7] text-center flex flex-col items-center"
    >
      <h1 class="text-5xl md:text-6xl font-extrabold text-[#006B5B] mb-6">
        Harmoni Alam dalam <span class="text-[#009879]">Setiap Tegukan</span>
      </h1>
      <p class="text-lg md:text-xl max-w-2xl text-gray-700 mb-8 leading-relaxed">
        <strong>Greenomi</strong> adalah teh hijau alami yang dipadukan dengan 
        <span class="text-[#009879] font-semibold">bunga melati</span> dan
        <span class="text-[#009879] font-semibold">madu hutan</span>.  
        Kami percaya bahwa secangkir teh bukan hanya minuman — tetapi juga
        momen ketenangan dan keseimbangan.
      </p>
      <NuxtLink
        to=""
        class="bg-[#009879] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#00BFA6] hover:scale-105 transition-all duration-300"
      >
        Jelajahi Produk Kami
      </NuxtLink>
    </section>

    <!-- 🍵 Tentang Bahan-Bahan -->
    <section class="py-20 px-6 bg-white text-center">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-[#006B5B] mb-10">
          Tiga Bahan Alami yang Menyatu Sempurna
        </h2>

        <div class="grid md:grid-cols-3 gap-10">
          <!-- Teh Hijau -->
          <div
            class="bg-[#F9FFF9] rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
          >
            <img src="/ijo.jpg" alt="Teh Hijau" class="w-24 h-24 mx-auto mb-4 rounded-full object-cover" />
            <h3 class="text-2xl font-semibold text-[#009879] mb-2">🍃 Teh Hijau</h3>
            <p class="text-gray-700">
              Dipetik dari daun muda pilihan, teh hijau Greenomi kaya antioksidan dan membantu menjaga vitalitas tubuh.
            </p>
          </div>

          <!-- Bunga Melati -->
          <div
            class="bg-[#F9FFF9] rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
          >
            <img src="/bahan.jpg" alt="Bunga Melati" class="w-24 h-24 mx-auto mb-4 rounded-full object-cover" />
            <h3 class="text-2xl font-semibold text-[#009879] mb-2">🌸 Bunga Melati</h3>
            <p class="text-gray-700">
              Memberikan aroma menenangkan yang membuat pikiran lebih rileks, menjadikan pengalaman minum teh lebih damai.
            </p>
          </div>

          <!-- Madu -->
          <div
            class="bg-[#F9FFF9] rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
          >
            <img src="/madu.jpg" alt="Madu Hutan" class="w-24 h-24 mx-auto mb-4 rounded-full object-cover" />
            <h3 class="text-2xl font-semibold text-[#009879] mb-2">🍯 Madu Hutan</h3>
            <p class="text-gray-700">
              Memberikan sentuhan manis alami, menjaga imunitas, dan menambah kehangatan setiap tegukan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 🌱 Kenapa Harus Greenomi -->
    <section class="py-24 bg-[#E8F5E9] text-center px-6">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-4xl font-bold text-[#006B5B] mb-10">Kenapa Harus Memilih Greenomi?</h2>

        <div class="grid md:grid-cols-2 gap-10 text-left">
          <div
            class="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border-l-8 border-[#009879]"
          >
            <h3 class="text-2xl font-semibold text-[#009879] mb-3">🌿 100% Alami dan Murni</h3>
            <p class="text-gray-700 leading-relaxed">
              Tanpa bahan pengawet, tanpa pewarna buatan. Greenomi menjaga keaslian rasa alam untuk tubuh yang lebih sehat.
            </p>
          </div>

          <div
            class="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border-l-8 border-[#009879]"
          >
            <h3 class="text-2xl font-semibold text-[#009879] mb-3">☕ Dibuat dengan Cinta</h3>
            <p class="text-gray-700 leading-relaxed">
              Setiap daun teh dipetik secara <em>handcrafted</em> oleh petani lokal yang berpengalaman untuk menjaga kualitas terbaik.
            </p>
          </div>

          <div
            class="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border-l-8 border-[#009879]"
          >
            <h3 class="text-2xl font-semibold text-[#009879] mb-3">🍯 Kaya Manfaat</h3>
            <p class="text-gray-700 leading-relaxed">
              Mengandung antioksidan tinggi dan manfaat madu alami yang membantu meningkatkan daya tahan tubuh.
            </p>
          </div>

          <div
            class="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border-l-8 border-[#009879]"
          >
            <h3 class="text-2xl font-semibold text-[#009879] mb-3">🌸 Rasa yang Menenangkan</h3>
            <p class="text-gray-700 leading-relaxed">
              Perpaduan lembut teh hijau, melati, dan madu menghadirkan relaksasi alami di setiap cangkir.
            </p>
          </div>
        </div>
      </div>
    </section>

   <!-- 🛒 CTA -->
<section
  class="py-24 px-6 bg-gradient-to-r from-[#A5D6A7] via-[#C8E6C9] to-[#E8F5E9] text-[#004D40] text-center rounded-t-3xl shadow-inner"
>
  <h2 class="text-4xl font-bold mb-4">Siap Menyatu dengan Kehangatan Alam?</h2>
  <p class="text-lg mb-8 text-gray-700">
    Dapatkan teh hijau Greenomi dan rasakan keseimbangan alami dalam setiap tegukan.
  </p>
  <NuxtLink
  to="/galeri"
  class="bg-[#009879] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#00BFA6] hover:scale-105 transition-all duration-300"
>
  Beli Sekarang
</NuxtLink>

</section>

</div>
</template>

<script setup>
// Tidak diperlukan script tambahan
</script>

<style scoped>
nav a.router-link-exact-active {
  color: #009879;
  font-weight: 600;
}
</style>
