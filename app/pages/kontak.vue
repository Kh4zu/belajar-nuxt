<template>
  <div class="min-h-screen bg-gradient-to-b from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7] flex flex-col items-center py-10 px-6">
    <h1 class="text-4xl md:text-5xl font-bold mb-6 text-[#006B5B]">Saran & Kritik</h1>
    <p class="text-gray-700 mb-8 max-w-md text-center">
      Kami senang mendengar masukan dari kamu! Beri rating dan tuliskan saran atau kritikmu untuk Greenomi.
    </p>

    <form @submit.prevent="submitForm" class="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md space-y-6">
      <!-- Nama -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Nama</label>
        <input v-model="name" type="text" placeholder="Masukkan nama kamu"
               class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"/>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Email</label>
        <input v-model="email" type="email" placeholder="Masukkan email kamu"
               class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"/>
      </div>

      <!-- Rating -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Rating</label>
        <div class="flex space-x-1">
          <template v-for="star in 5" :key="star">
            <button type="button" @click="setRating(star)" class="focus:outline-none">
              <svg
                v-if="star <= rating"
                class="w-8 h-8 text-yellow-400 hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.196-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.034 9.382c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.955z"/>
              </svg>
              <svg
                v-else
                class="w-8 h-8 text-gray-300 hover:text-yellow-400 hover:scale-110 transition-colors transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.196-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.034 9.382c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.955z"/>
              </svg>
            </button>
          </template>
        </div>
      </div>

      <!-- Pesan / Kritik & Saran -->
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Saran / Kritik</label>
        <textarea v-model="message" rows="4" placeholder="Tulis pesan kamu..."
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"></textarea>
      </div>

      <!-- Submit -->
      <button type="submit" class="bg-[#009879] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#00BFA6] transition-all w-full">
        Kirim Pesan
      </button>
    </form>

    <!-- Link Kembali -->
    <NuxtLink to="/" class="mt-8 text-[#009879] hover:underline">
      ← Kembali ke Beranda
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const rating = ref(0)

function setRating(star) {
  rating.value = star
}

function submitForm() {
  if (!name.value || !email.value || !message.value || rating.value === 0) {
    alert('Mohon lengkapi semua kolom dan beri rating!')
    return
  }

  // Contoh: tampilkan alert / bisa dikirim ke API backend
  alert(
    `Terima kasih, ${name.value}! \nRating: ${rating.value}⭐\nPesan: ${message.value}`
  )

  // Reset form
  name.value = ''
  email.value = ''
  message.value = ''
  rating.value = 0
}
</script>

<style scoped>
/* animasi hover bintang */
button svg {
  transition: transform 0.2s ease, color 0.2s ease;
}
</style>