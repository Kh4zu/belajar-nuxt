<template>
  <div class="text-gray-900">
    <!-- 🍃 Hero Section -->
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

    <!-- 🍵 Tentang Bahan-Bahan -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 bg-white text-center">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-[#006B5B] mb-10">
          Tiga Bahan Alami yang Menyatu Sempurna
        </h2>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          <!-- 🍃 Teh Hijau -->
          <div
            class="bg-[#F9FFF9] rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300"
          >
            <img
              src="/ijo.jpg"
              alt="Teh Hijau"
              class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full object-cover"
            />
            <h3 class="text-xl sm:text-2xl font-semibold text-[#009879] mb-2">🍃 Teh Hijau</h3>
            <p class="text-gray-700 text-sm sm:text-base">
              Dipetik dari daun muda pilihan, kaya antioksidan dan menjaga vitalitas tubuh.
            </p>
          </div>

          <!-- 🌸 Bunga Melati -->
          <div
            class="bg-[#F9FFF9] rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300"
          >
            <img
              src="/bahan.jpg"
              alt="Bunga Melati"
              class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full object-cover"
            />
            <h3 class="text-xl sm:text-2xl font-semibold text-[#009879] mb-2">🌸 Bunga Melati</h3>
            <p class="text-gray-700 text-sm sm:text-base">
              Memberikan aroma menenangkan yang membuat pikiran lebih rileks.
            </p>
          </div>

          <!-- 🍯 Madu Hutan -->
          <div
            class="bg-[#F9FFF9] rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300"
          >
            <img
              src="/madu.jpg"
              alt="Madu Hutan"
              class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full object-cover"
            />
            <h3 class="text-xl sm:text-2xl font-semibold text-[#009879] mb-2">🍯 Madu Hutan</h3>
            <p class="text-gray-700 text-sm sm:text-base">
              Memberikan sentuhan manis alami dan menambah kehangatan setiap tegukan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 🌿 CTA / Ajakan -->
    <section
      class="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-t from-[#C8E6C9] to-[#E8F5E9] text-center"
    >
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
// tidak perlu script tambahan, semua sudah diatur di layout default
</script>

<style scoped>
/* Efek halus saat hover */
section {
  scroll-margin-top: 100px;
}
</style>
