<template>
  <div class="min-h-screen bg-[#F9FFF9] pt-28 px-6 text-gray-900">
    <h2 class="text-4xl font-bold text-[#009879] text-center mb-10">Keranjang Belanja</h2>

    <div v-if="cartStore.cart.length" class="max-w-3xl mx-auto space-y-4">
      <div v-for="item in cartStore.cart" :key="item.id" class="flex items-center justify-between bg-white p-4 rounded-xl shadow">
        <div class="flex items-center gap-4">
          <img :src="item.src" class="w-20 h-20 object-cover rounded"/>
          <div>
            <h3 class="font-semibold text-lg">{{ item.title }}</h3>
            <p class="text-gray-600">Rp {{ item.price.toLocaleString('id-ID') }} x 
              <input type="number" v-model.number="item.qty" min="1" class="w-12 border rounded px-1" @change="updateQty(item.id, item.qty)">
            </p>
          </div>
        </div>
        <button @click="removeFromCart(item.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Hapus</button>
      </div>

      <div class="text-right font-bold text-xl mt-4">
        Total: Rp {{ cartStore.totalPrice().toLocaleString('id-ID') }}
      </div>

      <div class="text-right mt-4">
        <button @click="showModal = true" class="bg-[#009879] text-white px-6 py-2 rounded hover:bg-[#00BFA6] transition">Checkout</button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      Keranjang kosong
      <NuxtLink to="/menu" class="text-[#009879] font-semibold ml-2">Kembali ke Menu</NuxtLink>
    </div>

    <!-- Modal Input Nama & Alamat -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-3xl p-8 w-full max-w-md relative">
        <h3 class="text-2xl font-bold text-[#009879] mb-6 text-center">Isi Data Pemesan</h3>
        <div class="flex flex-col gap-4">
          <input v-model="nama" placeholder="Nama Pemesan" class="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]"/>
          <textarea v-model="alamat" placeholder="Alamat Pemesan" class="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]" rows="3"></textarea>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button @click="showModal = false" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition">Batal</button>
          <button @click="submitCheckout" class="px-4 py-2 rounded bg-[#009879] text-white hover:bg-[#00BFA6] transition">Lanjut</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const showModal = ref(false)
const nama = ref('')
const alamat = ref('')

function removeFromCart(id) { cartStore.removeFromCart(id) }
function updateQty(id, qty) { cartStore.updateQty(id, qty) }

function submitCheckout() {
  if(!nama.value.trim() || !alamat.value.trim()) {
    alert('Nama dan alamat wajib diisi!')
    return
  }

  const dataPembayaran = {
    nama: nama.value,
    alamat: alamat.value,
    tanggal: new Date().toLocaleString('id-ID'),
    cart: cartStore.cart,
    total: cartStore.totalPrice(),
    status: 'Belum Lunas'
  }

  localStorage.setItem('pembayaran', JSON.stringify(dataPembayaran))
  cartStore.clearCart()
  showModal.value = false
  router.push('/pembayaran')
}
</script>
