<template>
  <div class="min-h-screen bg-[#F9FFF9] pt-28 px-6 text-gray-900">
    <h2 class="text-4xl font-bold text-[#009879] text-center mb-10">Payment Gateway</h2>

    <div v-if="pembayaran" class="max-w-3xl mx-auto bg-white/90 p-6 rounded-3xl shadow-lg">
      <h3 class="text-2xl font-semibold mb-6">Pilih Metode Pembayaran</h3>

      <div class="space-y-3 mb-6">
        <label class="flex items-center gap-3">
          <input type="radio" value="QRIS" v-model="metode" class="w-5 h-5 text-[#009879]" />
          <span class="text-lg">QRIS (Scan QR untuk membayar)</span>
        </label>
        <label class="flex items-center gap-3">
          <input type="radio" value="Transfer Bank" v-model="metode" class="w-5 h-5 text-[#009879]" />
          <span class="text-lg">Transfer Bank</span>
        </label>
        <label class="flex items-center gap-3">
          <input type="radio" value="Tunai (COD)" v-model="metode" class="w-5 h-5 text-[#009879]" />
          <span class="text-lg">Tunai (Bayar di Tempat)</span>
        </label>
      </div>

      <div v-if="metode" class="mt-4 text-gray-700">
        <p><strong>Metode dipilih:</strong> {{ metode }}</p>

        <div v-if="metode === 'QRIS'" class="mt-3">
          <img src="/qris.jpg" alt="QRIS" class="w-40 mx-auto rounded-lg shadow-md" />
          <p class="text-center text-sm mt-2">Scan untuk membayar dengan QRIS</p>
        </div>

        <div v-if="metode === 'Transfer Bank'" class="mt-3 text-center">
          <p>Silakan transfer ke:</p>
          <p class="font-semibold">Bank BNI - 1234567890 a.n Greenomi Teahouse</p>
        </div>

        <div v-if="metode === 'Tunai (COD)'" class="mt-3 text-center">
          <p>Pembayaran akan dilakukan langsung di lokasi pengantaran.</p>
        </div>
      </div>

      <hr class="my-6" />

      <p class="text-lg font-semibold mb-4">Total Pembayaran: Rp {{ pembayaran.total.toLocaleString('id-ID') }}</p>

      <div class="text-center">
        <button
          @click="selesaikanPembayaran"
          :disabled="!metode"
          class="bg-[#009879] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00BFA6] transition-all disabled:opacity-50"
        >
          Selesaikan Pembayaran
        </button>
      </div>
    </div>

    <div v-else class="text-center mt-20 text-gray-600">
      <p>Data pembayaran tidak ditemukan.</p>
      <NuxtLink to="/menu" class="text-[#009879] font-semibold">Kembali ke Menu</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const pembayaran = ref(null)
const metode = ref('')
const router = useRouter()

onMounted(() => {
  const data = localStorage.getItem('pembayaran')
  if (data) {
    pembayaran.value = JSON.parse(data)
  }
})

function selesaikanPembayaran() {
  alert(`Pembayaran dengan metode ${metode.value} sebesar Rp ${pembayaran.value.total.toLocaleString('id-ID')} berhasil!\nTerima kasih telah memesan di Greenomi 🍵`)
  localStorage.removeItem('cart')
  localStorage.removeItem('pembayaran')
  router.push('/menu')
}
</script>
