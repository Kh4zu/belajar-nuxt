<template>
  <div class="min-h-screen bg-[#F9FFF9] pt-28 px-6 text-gray-900">
    <h2 class="text-4xl font-bold text-[#009879] text-center mb-10">Keranjang Pesanan</h2>

    <div v-if="cart.length" class="max-w-3xl mx-auto bg-white/90 p-6 rounded-3xl shadow-lg">
      <div
        v-for="(item, index) in cart"
        :key="index"
        class="border-b border-gray-200 py-4 flex justify-between items-center"
      >
        <div>
          <h3 class="text-xl font-semibold text-[#009879]">{{ item.title }}</h3>
          <p>Harga: Rp {{ item.price.toLocaleString('id-ID') }}</p>
          <select v-model="item.opsi" class="mt-2 border rounded-lg px-2 py-1">
            <option disabled value="">Pilih penyajian</option>
            <option>Teh Panas</option>
            <option>Teh Dingin</option>
          </select>
        </div>

        <div class="flex items-center gap-3">
          <button @click="kurangi(index)" class="bg-red-500 text-white px-3 py-1 rounded-full">-</button>
          <span>{{ item.qty }}</span>
          <button @click="tambah(index)" class="bg-green-500 text-white px-3 py-1 rounded-full">+</button>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-semibold">Total: Rp {{ total.toLocaleString('id-ID') }}</h3>
      </div>

      <!-- Form Pemesanan -->
      <div class="mt-8">
        <h3 class="text-xl font-bold text-[#006B5B] mb-4">Data Pemesanan</h3>
        <form @submit.prevent="lanjutPembayaran" class="space-y-4">
          <input v-model="nama" type="text" placeholder="Nama Lengkap" class="w-full border rounded-lg px-4 py-2" required />
          <input v-model="alamat" type="text" placeholder="Alamat Lengkap" class="w-full border rounded-lg px-4 py-2" required />
          <input v-model="tanggal" type="date" class="w-full border rounded-lg px-4 py-2" required />

          <button
            type="submit"
            class="bg-[#009879] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00BFA6] transition-all"
          >
            Lanjut ke Pembayaran
          </button>
        </form>
      </div>
    </div>

    <div v-else class="text-center mt-20 text-gray-600">
      <p>Keranjang masih kosong.</p>
      <NuxtLink to="/menu" class="text-[#009879] font-semibold">Kembali ke Menu</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const cart = ref([])
const nama = ref('')
const alamat = ref('')
const tanggal = ref('')
const router = useRouter()

onMounted(() => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cart.value = JSON.parse(savedCart)
  }
})

function tambah(index) {
  cart.value[index].qty++
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

function kurangi(index) {
  if (cart.value[index].qty > 1) {
    cart.value[index].qty--
  } else {
    cart.value.splice(index, 1)
  }
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const total = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price * item.qty, 0)
})

function lanjutPembayaran() {
  const dataPesanan = {
    nama: nama.value,
    alamat: alamat.value,
    tanggal: tanggal.value,
    cart: cart.value,
    total: total.value
  }
  localStorage.setItem('pembayaran', JSON.stringify(dataPesanan))
  router.push('/pembayaran')
}
</script>
