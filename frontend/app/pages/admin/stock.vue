<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#009879] mb-2">Management Stok</h1>
      <p class="text-gray-600">Kelola stok menu dan bahan baku</p>
    </div>

    <!-- Actions -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex gap-4">
        <button @click="showAddStock = true" class="bg-[#009879] text-white px-4 py-2 rounded-lg hover:bg-[#007a63] transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Tambah Stok
        </button>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export Laporan
        </button>
      </div>
      
      <div class="relative">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Cari menu..." 
          class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009879] w-64"
        >
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
    </div>

    <!-- Stock Table -->
    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-[#009879] text-white">
          <tr>
            <th class="py-4 px-6 text-left">Menu</th>
            <th class="py-4 px-6 text-left">Kategori</th>
            <th class="py-4 px-6 text-center">Stok Saat Ini</th>
            <th class="py-4 px-6 text-center">Stok Minimum</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="py-4 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredStock" :key="item.id" class="border-b hover:bg-gray-50">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-lg object-cover" @error="handleImageError">
                <div>
                  <p class="font-semibold">{{ item.name }}</p>
                  <p class="text-gray-500 text-sm">Rp {{ item.price.toLocaleString('id-ID') }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getCategoryClass(item.category)">
                {{ item.category }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="font-semibold" :class="{
                'text-red-500': item.stock === 0,
                'text-orange-500': item.stock > 0 && item.stock <= item.minStock,
                'text-green-500': item.stock > item.minStock
              }">
                {{ item.stock }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              {{ item.minStock }}
            </td>
            <td class="py-4 px-6 text-center">
              <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="{
                'bg-red-100 text-red-800': item.stock === 0,
                'bg-orange-100 text-orange-800': item.stock > 0 && item.stock <= item.minStock,
                'bg-green-100 text-green-800': item.stock > item.minStock
              }">
                {{ getStockStatus(item) }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <div class="flex justify-center gap-2">
                <button @click="editStock(item)" class="text-blue-600 hover:text-blue-800 transition p-1 rounded" title="Edit Stok">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button @click="showStockHistory(item)" class="text-green-600 hover:text-green-800 transition p-1 rounded" title="Riwayat Stok">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </button>
                <button @click="addStock(item)" class="text-purple-600 hover:text-purple-800 transition p-1 rounded" title="Tambah Stok">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredStock.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"/>
        </svg>
        <p class="text-gray-500 text-lg">Tidak ada data stok</p>
      </div>
    </div>

    <!-- Stock Summary -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-500 text-sm">Total Menu</h3>
            <p class="text-2xl font-bold text-gray-800">{{ stockData.length }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-500 text-sm">Stok Aman</h3>
            <p class="text-2xl font-bold text-green-600">{{ safeStockCount }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-500 text-sm">Stok Menipis</h3>
            <p class="text-2xl font-bold text-orange-600">{{ lowStockCount }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-500 text-sm">Stok Habis</h3>
            <p class="text-2xl font-bold text-red-600">{{ outOfStockCount }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah/Edit Stok -->
    <div v-if="showAddStock" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white p-6 rounded-2xl w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">{{ editingStock ? 'Edit Stok' : 'Tambah Stok' }}</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Menu</label>
            <select v-model="stockForm.menuId" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]">
              <option value="">Pilih Menu</option>
              <option v-for="menu in menuStore.menu" :key="menu.id" :value="menu.id">{{ menu.name }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jumlah Stok</label>
            <input v-model.number="stockForm.quantity" type="number" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
            <textarea v-model="stockForm.notes" rows="3" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="Catatan penyesuaian stok..."></textarea>
          </div>
        </div>
        
        <div class="flex gap-3 mt-6">
          <button @click="saveStock" class="flex-1 bg-[#009879] text-white py-2 rounded-lg hover:bg-[#007a63] transition font-semibold">
            Simpan
          </button>
          <button @click="closeModal" class="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition font-semibold">
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin',
  layout: 'admin' // TAMBAHKAN INI
});

import { useMenuStore } from '~/stores/useMenuStore'

const menuStore = useMenuStore()
const searchQuery = ref('')
const showAddStock = ref(false)
const editingStock = ref(null)

const stockForm = ref({
  menuId: '',
  quantity: 0,
  notes: ''
})

// Sample stock data dengan minStock
const stockData = ref(menuStore.menu.map(menu => ({
  ...menu,
  minStock: 10, // Stok minimum
  currentStock: menu.stock
})))

const filteredStock = computed(() => {
  if (!searchQuery.value) return stockData.value
  return stockData.value.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Stock statistics
const safeStockCount = computed(() => 
  stockData.value.filter(item => item.stock > item.minStock).length
)

const lowStockCount = computed(() => 
  stockData.value.filter(item => item.stock > 0 && item.stock <= item.minStock).length
)

const outOfStockCount = computed(() => 
  stockData.value.filter(item => item.stock === 0).length
)

const getStockStatus = (item) => {
  if (item.stock === 0) return 'Habis'
  if (item.stock <= item.minStock) return 'Menipis'
  return 'Aman'
}

// Category styling
const getCategoryClass = (category) => {
  const classes = {
    'Makanan Utama': 'bg-blue-100 text-blue-800',
    'Appetizer': 'bg-green-100 text-green-800',
    'Minuman': 'bg-purple-100 text-purple-800',
    'Dessert': 'bg-pink-100 text-pink-800',
    'Snack': 'bg-orange-100 text-orange-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

// Handle image error
const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyMEMzNS4zMTM3IDIwIDM4IDIyLjY4NjMgMzggMjZDMzggMjkuMzEzNyAzNS4zMTM3IDMyIDMyIDMyQzI4LjY4NjMgMzIgMjYgMjkuMzEzNyAyNiAyNkMyNiAyMi42ODYzIDI4LjY4NjMgMjAgMzIgMjBaIiBmaWxsPSIjOEU5MEEwIi8+CjxwYXRoIGQ9Ik0xNiAzOEMxNiAzNC42ODYzIDE4LjY4NjMgMzIgMjIgMzJINDJDMjkuODQ5NyAzMiAyMCA0MS44NDk3IDIwIDU0SDE2VjM4WiIgZmlsbD0iIzhFOTBBMCIvPgo8L3N2Zz4K'
}

const editStock = (item) => {
  editingStock.value = item
  stockForm.value = {
    menuId: item.id,
    quantity: item.stock,
    notes: ''
  }
  showAddStock.value = true
}

const addStock = (item) => {
  editingStock.value = item
  stockForm.value = {
    menuId: item.id,
    quantity: '',
    notes: 'Penambahan stok'
  }
  showAddStock.value = true
}

const saveStock = () => {
  if (editingStock.value) {
    const item = stockData.value.find(item => item.id === stockForm.value.menuId)
    if (item) {
      item.stock = stockForm.value.quantity
      showNotification(`Stok ${item.name} berhasil diupdate menjadi ${stockForm.value.quantity}`, 'success')
    }
  }
  closeModal()
}

const closeModal = () => {
  showAddStock.value = false
  editingStock.value = null
  stockForm.value = { menuId: '', quantity: 0, notes: '' }
}

const showStockHistory = (item) => {
  alert(`Riwayat stok untuk: ${item.name}\n\nAkan menampilkan riwayat penyesuaian stok...`)
}

const showNotification = (message, type = 'info') => {
  // You can implement a proper notification system here
  alert(message)
}
</script>