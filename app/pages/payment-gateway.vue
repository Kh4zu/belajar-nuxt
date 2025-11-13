<template>
  <div class="min-h-screen bg-[#F9FFF9] pt-28 px-6 text-gray-900 flex flex-col items-center">
    <h2 class="text-4xl font-bold text-[#009879] text-center mb-10">Metode Pembayaran</h2>

    <div v-if="pembayaran" class="bg-white/90 shadow-lg rounded-3xl p-8 w-full max-w-2xl">
      <h3 class="text-2xl font-semibold mb-6">Pilih Metode Pembayaran</h3>

      <div class="space-y-4">
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" v-model="metode" value="Transfer Bank" class="text-[#009879]" />
          <span class="text-lg">Transfer Bank (BCA, Mandiri, BRI)</span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" v-model="metode" value="E-Wallet" class="text-[#009879]" />
          <span class="text-lg">E-Wallet (Dana, OVO, Gopay)</span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" v-model="metode" value="COD" class="text-[#009879]" />
          <span class="text-lg">Bayar di Tempat (COD)</span>
        </label>
      </div>

      <div class="mt-8 text-center">
        <button
          @click="prosesPembayaran"
          :disabled="!metode"
          class="bg-[#009879] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#00BFA6] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proses Pembayaran
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-600 mt-20">
      <p>Tidak ada data pembayaran.</p>
      <NuxtLink to="/menu" class="text-[#009879] font-semibold">Kembali ke Menu</NuxtLink>
    </div>

    <!-- Modal konfirmasi -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <h3 class="text-2xl font-bold text-[#009879] mb-4">Pembayaran Berhasil 🎉</h3>
        <p class="text-gray-700 mb-6">
          Terima kasih, <strong>{{ pembayaran.nama }}</strong>! <br />
          Pesananmu akan segera diproses.
        </p>
        <button
          @click="selesai"
          class="bg-[#009879] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#00BFA6] transition-all"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const pembayaran = ref(null)
const metode = ref('')
const showModal = ref(false)
const router = useRouter()

onMounted(() => {
  const data = localStorage.getItem('pembayaran')
  if (data) {
    pembayaran.value = JSON.parse(data)
  }
})

function prosesPembayaran() {
  if (!metode.value) return
  pembayaran.value.metode = metode.value
  showModal.value = true

  // Simulasi update status pembayaran
  localStorage.setItem('pembayaran', JSON.stringify({
    ...pembayaran.value,
    status: 'Lunas',
    metode: metode.value
  }))
}

function selesai() {
  localStorage.removeItem('pembayaran')
  router.push('/')
}
</script>

<style scoped>
input[type="radio"] {
  accent-color: #009879;
}
</style>
