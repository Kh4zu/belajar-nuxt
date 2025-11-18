<template>
  <div class="min-h-screen bg-[#F9FFF9] pt-28 px-6 text-gray-900">
    <h2 class="text-4xl font-bold text-[#009879] text-center mb-10">Pembayaran</h2>

    <div v-if="pembayaran" class="max-w-3xl mx-auto bg-white/90 p-6 rounded-3xl shadow-lg">
      <h3 class="text-2xl font-semibold mb-4">Data Pemesan</h3>
      <p><strong>Nama:</strong> {{ pembayaran.nama }}</p>
      <p><strong>Alamat:</strong> {{ pembayaran.alamat }}</p>
      <p><strong>Tanggal Pemesanan:</strong> {{ pembayaran.tanggal }}</p>

      <hr class="my-6" />

      <h3 class="text-2xl font-semibold mb-4">Detail Pesanan</h3>
      <ul class="space-y-2">
        <li v-for="(item, index) in pembayaran.cart" :key="index" class="flex justify-between">
          <span>{{ item.title }} x {{ item.qty }}</span>
          <span>Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}</span>
        </li>
      </ul>

      <p class="text-xl font-bold mt-6">Total: Rp {{ pembayaran.total.toLocaleString('id-ID') }}</p>

      <div class="text-center mt-10">
        <button @click="keGateway" class="bg-[#009879] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00BFA6] transition-all">
          Lanjut ke Payment Gateway
        </button>
      </div>
    </div>

    <div v-else class="text-center mt-20 text-gray-600">
      <p>Tidak ada data pembayaran.</p>
      <NuxtLink to="/menu" class="text-[#009879] font-semibold">Kembali ke Menu</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const pembayaran = ref(null)
const router = useRouter()

onMounted(() => {
  const data = localStorage.getItem('pembayaran')
  if(data) pembayaran.value = JSON.parse(data)
})

function keGateway() { if(pembayaran.value) router.push('/payment-gateway') }
</script>
