<template>
  <div class="max-w-6xl mx-auto mt-10">

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-[#009879]">Menu Teh</h2>
      <button @click="openModal()" class="bg-[#009879] text-white px-4 py-2 rounded-lg hover:bg-[#00BFA6] transition">+ Tambah Menu</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="item in menuStore.menu" :key="item.id" class="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
        <img :src="item.src" class="h-48 w-full object-cover rounded-lg mb-4"/>
        <h3 class="text-xl font-semibold text-[#009879]">{{ item.title }}</h3>
        <p class="text-gray-600 text-sm mb-2">{{ item.desc }}</p>
        <p class="font-bold mb-4">Rp {{ item.price.toLocaleString('id-ID') }}</p>
        <div class="flex gap-2 mt-2">
          <button @click="openModal(item)" class="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 transition">Edit</button>
          <button @click="deleteItem(item.id)" class="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition">Hapus</button>
          <button @click="addToCart(item)" class="bg-[#009879] px-3 py-1 rounded text-white hover:bg-[#00BFA6] transition">Beli</button>
        </div>
      </div>
    </div>

    <div v-if="cartStore.cart.length" class="mt-6 text-center">
      <NuxtLink to="/keranjang" class="bg-[#009879] text-white px-6 py-2 rounded hover:bg-[#00BFA6] transition">
        Lihat Keranjang ({{ cartStore.cart.length }})
      </NuxtLink>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md relative">
        <h3 class="text-xl font-bold mb-4">{{ editingItem ? 'Edit Menu' : 'Tambah Menu' }}</h3>
        <div class="flex flex-col gap-3">
          <input v-model="form.title" placeholder="Nama Menu" class="border px-3 py-2 rounded"/>
          <input v-model="form.desc" placeholder="Deskripsi" class="border px-3 py-2 rounded"/>
          <input v-model.number="form.price" placeholder="Harga" type="number" class="border px-3 py-2 rounded"/>
          <input v-model="form.src" placeholder="URL/Gambar" class="border px-3 py-2 rounded"/>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button @click="showModal = false" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition">Batal</button>
          <button @click="saveItem" class="px-4 py-2 rounded bg-[#009879] text-white hover:bg-[#00BFA6] transition">Simpan</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from '../stores/useMenuStore'
import { useCartStore } from '../stores/cartStore'
import { useRouter } from 'vue-router'

const menuStore = useMenuStore()
const cartStore = useCartStore()
const router = useRouter()

const showModal = ref(false)
const editingItem = ref(null)
const form = ref({ title: '', desc: '', price: 0, src: '' })

function openModal(item = null) {
  if(item) {
    editingItem.value = item
    form.value = { ...item }
  } else {
    editingItem.value = null
    form.value = { title: '', desc: '', price: 0, src: '' }
  }
  showModal.value = true
}

function saveItem() {
  if(!form.value.title || !form.value.desc || !form.value.src || !form.value.price) {
    alert('Semua field harus diisi!')
    return
  }
  if(editingItem.value) menuStore.updateItem(editingItem.value.id, form.value)
  else menuStore.addItem(form.value)
  showModal.value = false
}

function deleteItem(id) {
  if(confirm('Apakah kamu yakin ingin menghapus menu ini?')) menuStore.deleteItem(id)
}

function addToCart(item) {
  cartStore.addToCart(item)
  alert(`${item.title} berhasil ditambahkan ke keranjang!`)
}
</script>
