<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#009879] mb-2">Kelola Menu</h1>
      <p class="text-gray-600">Management menu dan harga makanan</p>
    </div>

    <!-- Actions -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex gap-4">
        <button 
          @click="showAddModal = true" 
          class="bg-[#009879] text-white px-4 py-2 rounded-lg hover:bg-[#007a63] transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Tambah Menu
        </button>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export Data
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

    <!-- Menu Table -->
    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-[#009879] text-white">
          <tr>
            <th class="py-4 px-6 text-left">Menu</th>
            <th class="py-4 px-6 text-left">Kategori</th>
            <th class="py-4 px-6 text-center">Harga</th>
            <th class="py-4 px-6 text-center">Stok</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="py-4 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(menu, index) in filteredMenu" 
            :key="menu.id" 
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <img 
                  :src="menu.image" 
                  :alt="menu.name" 
                  class="w-12 h-12 rounded-lg object-cover border"
                  @error="handleImageError"
                >
                <div>
                  <p class="font-semibold text-gray-800">{{ menu.name }}</p>
                  <p class="text-gray-500 text-sm line-clamp-2">{{ menu.description }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getCategoryClass(menu.category)">
                {{ menu.category }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="font-semibold text-gray-800">Rp {{ menu.price.toLocaleString('id-ID') }}</span>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="font-semibold" :class="getStockClass(menu.stock)">
                {{ menu.stock }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="getStatusClass(menu.status)">
                {{ menu.status === 'active' ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <div class="flex justify-center gap-2">
                <button 
                  @click="editMenu(menu)" 
                  class="text-blue-600 hover:text-blue-800 transition p-1 rounded"
                  title="Edit Menu"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="toggleMenuStatus(menu)" 
                  :class="menu.status === 'active' ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'"
                  class="transition p-1 rounded"
                  :title="menu.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="menu.status === 'active'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button 
                  @click="deleteMenu(menu.id)" 
                  class="text-red-600 hover:text-red-800 transition p-1 rounded"
                  title="Hapus Menu"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredMenu.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        <p class="text-gray-500 text-lg">Tidak ada menu ditemukan</p>
        <button 
          @click="showAddModal = true" 
          class="mt-4 bg-[#009879] text-white px-6 py-2 rounded-lg hover:bg-[#007a63] transition"
        >
          Tambah Menu Pertama
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-800">
            {{ editingMenu ? 'Edit Menu' : 'Tambah Menu Baru' }}
          </h3>
        </div>
        
        <form @submit.prevent="saveMenu" class="p-6 space-y-6">
          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Gambar Menu</label>
            <div class="flex items-center gap-4">
              <div class="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  v-if="menuForm.image" 
                  :src="menuForm.image" 
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                >
                <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <input 
                  type="url"
                  v-model="menuForm.image"
                  placeholder="https://example.com/image.jpg"
                  class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]"
                >
                <p class="text-sm text-gray-500 mt-1">Masukkan URL gambar atau upload file</p>
              </div>
            </div>
          </div>

          <!-- Name and Category -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Menu *</label>
              <input 
                v-model="menuForm.name"
                type="text" 
                required
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]"
                placeholder="Nasi Goreng Spesial"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select 
                v-model="menuForm.category"
                required
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]"
              >
                <option value="">Pilih Kategori</option>
                <option value="Makanan Utama">Makanan Utama</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Minuman">Minuman</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
              </select>
            </div>
          </div>

          <!-- Price and Stock -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Harga *</label>
              <div class="relative">
                <span class="absolute left-3 top-2 text-gray-500">Rp</span>
                <input 
                  v-model.number="menuForm.price"
                  type="number" 
                  required
                  min="0"
                  class="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]"
                  placeholder="25000"
                >
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stok *</label>
              <input 
                v-model.number="menuForm.stock"
                type="number" 
                required
                min="0"
                class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]"
                placeholder="50"
              >
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea 
              v-model="menuForm.description"
              rows="3"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]"
              placeholder="Deskripsi menu..."
            ></textarea>
          </div>

          <!-- Status -->
          <div>
            <label class="flex items-center">
              <input 
                v-model="menuForm.status"
                type="checkbox" 
                true-value="active"
                false-value="inactive"
                class="rounded border-gray-300 text-[#009879] focus:ring-[#009879]"
              >
              <span class="ml-2 text-sm text-gray-700">Menu aktif</span>
            </label>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-4 border-t">
            <button 
              type="submit" 
              class="flex-1 bg-[#009879] text-white py-3 rounded-lg hover:bg-[#007a63] transition font-semibold"
            >
              {{ editingMenu ? 'Update Menu' : 'Simpan Menu' }}
            </button>
            <button 
              type="button" 
              @click="closeModal"
              class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "admin",
  layout: "admin"
});

import { useMenuStore } from '~/stores/useMenuStore'

const menuStore = useMenuStore()
const searchQuery = ref('')
const showAddModal = ref(false)
const editingMenu = ref(null)

// Form data
const menuForm = ref({
  name: '',
  category: '',
  price: 0,
  stock: 0,
  description: '',
  image: '',
  status: 'active'
})

// Filter menu based on search
const filteredMenu = computed(() => {
  if (!searchQuery.value) return menuStore.menu
  
  return menuStore.menu.filter(menu => 
    menu.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    menu.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    menu.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

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

// Stock styling
const getStockClass = (stock) => {
  if (stock === 0) return 'text-red-500'
  if (stock <= 10) return 'text-orange-500'
  return 'text-green-500'
}

// Status styling
const getStatusClass = (status) => {
  return status === 'active' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800'
}

// Handle image error
const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyMEMzNS4zMTM3IDIwIDM4IDIyLjY4NjMgMzggMjZDMzggMjkuMzEzNyAzNS4zMTM3IDMyIDMyIDMyQzI4LjY4NjMgMzIgMjYgMjkuMzEzNyAyNiAyNkMyNiAyMi42ODYzIDI4LjY4NjMgMjAgMzIgMjBaIiBmaWxsPSIjOEU5MEEwIi8+CjxwYXRoIGQ9Ik0xNiAzOEMxNiAzNC42ODYzIDE4LjY4NjMgMzIgMjIgMzJINDJDMjkuODQ5NyAzMiAyMCA0MS44NDk3IDIwIDU0SDE2VjM4WiIgZmlsbD0iIzhFOTBBMCIvPgo8L3N2Zz4K'
}

// Edit menu
const editMenu = (menu) => {
  editingMenu.value = menu
  menuForm.value = { ...menu }
  showAddModal.value = true
}

// Toggle menu status
const toggleMenuStatus = async (menu) => {
  menu.status = menu.status === 'active' ? 'inactive' : 'active'
  // Here you would typically make an API call to update the status
  showNotification(`Menu ${menu.name} ${menu.status === 'active' ? 'diaktifkan' : 'dinonaktifkan'}`, 'success')
}

// Delete menu
const deleteMenu = async (menuId) => {
  if (confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
    const menu = menuStore.menu.find(m => m.id === menuId)
    menuStore.menu = menuStore.menu.filter(m => m.id !== menuId)
    showNotification(`Menu "${menu.name}" berhasil dihapus`, 'success')
  }
}

// Save menu (add or update)
const saveMenu = () => {
  if (editingMenu.value) {
    // Update existing menu
    const index = menuStore.menu.findIndex(m => m.id === editingMenu.value.id)
    if (index !== -1) {
      menuStore.menu[index] = { ...menuForm.value, id: editingMenu.value.id }
    }
    showNotification(`Menu "${menuForm.value.name}" berhasil diupdate`, 'success')
  } else {
    // Add new menu
    const newMenu = {
      ...menuForm.value,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    menuStore.menu.unshift(newMenu)
    showNotification(`Menu "${menuForm.value.name}" berhasil ditambahkan`, 'success')
  }
  
  closeModal()
}

// Close modal and reset form
const closeModal = () => {
  showAddModal.value = false
  editingMenu.value = null
  menuForm.value = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
    status: 'active'
  }
}

// Show notification
const showNotification = (message, type = 'info') => {
  // You can implement a proper notification system here
  alert(message)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>