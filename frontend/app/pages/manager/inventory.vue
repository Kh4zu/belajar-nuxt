<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Inventory Overview</h1>
      <p class="text-gray-600 mt-2">Pantau stok dan kebutuhan inventory</p>
    </div>

    <!-- Inventory Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Total Items</p>
        <p class="text-2xl font-bold text-gray-900 mt-2">{{ inventoryStats.totalItems }}</p>
        <p class="text-sm text-green-600 mt-1">+5 dari bulan lalu</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Stok Aman</p>
        <p class="text-2xl font-bold text-green-600 mt-2">{{ inventoryStats.safeStock }}</p>
        <p class="text-sm text-gray-600 mt-1">78% dari total</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Perlu Restock</p>
        <p class="text-2xl font-bold text-orange-600 mt-2">{{ inventoryStats.needRestock }}</p>
        <p class="text-sm text-orange-600 mt-1">Segera dipesan</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Stok Habis</p>
        <p class="text-2xl font-bold text-red-600 mt-2">{{ inventoryStats.outOfStock }}</p>
        <p class="text-sm text-red-600 mt-1">Perhatian!</p>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-900">Daftar Inventory</h3>
        <div class="flex gap-4">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Cari item..." 
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009879] w-64"
            >
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <button class="bg-[#009879] text-white px-4 py-2 rounded-lg hover:bg-[#007a63] transition flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Tambah Item
          </button>
        </div>
      </div>
      
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="py-4 px-6 text-left text-sm font-medium text-gray-700">Item</th>
            <th class="py-4 px-6 text-left text-sm font-medium text-gray-700">Kategori</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Stok Saat Ini</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Stok Minimum</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Status</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item in inventoryItems" :key="item.id" class="hover:bg-gray-50 transition">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-sm text-gray-500">SKU: {{ item.sku }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getCategoryClass(item.category)">
                {{ item.category }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="font-semibold" :class="getStockClass(item.currentStock, item.minStock)">
                {{ item.currentStock }} {{ item.unit }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="text-gray-900">{{ item.minStock }} {{ item.unit }}</span>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="getStatusClass(item.currentStock, item.minStock)">
                {{ getStatusText(item.currentStock, item.minStock) }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <div class="flex justify-center gap-2">
                <button @click="restockItem(item)" class="text-blue-600 hover:text-blue-800 transition p-1 rounded" title="Restock">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </button>
                <button @click="viewHistory(item)" class="text-green-600 hover:text-green-800 transition p-1 rounded" title="Riwayat">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Low Stock Alert -->
    <div class="bg-orange-50 border border-orange-200 rounded-2xl p-6">
      <div class="flex items-center gap-3 mb-4">
        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h3 class="text-lg font-semibold text-orange-900">Peringatan Stok Menipis</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="alert in lowStockAlerts" :key="alert.id" class="bg-white p-4 rounded-lg border border-orange-200">
          <p class="font-medium text-gray-900">{{ alert.name }}</p>
          <p class="text-sm text-orange-600 mt-1">Sisa: {{ alert.remaining }} {{ alert.unit }}</p>
          <p class="text-xs text-gray-500">Perkiraan habis: {{ alert.estimatedDays }} hari</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'manager',
  layout: 'manager'
});

// Inventory statistics
const inventoryStats = ref({
  totalItems: 156,
  safeStock: 122,
  needRestock: 24,
  outOfStock: 10
})

// Inventory items data
const inventoryItems = ref([
  {
    id: 1,
    name: 'Beras Premium',
    sku: 'BR-001',
    category: 'Bahan Pokok',
    currentStock: 45,
    minStock: 20,
    unit: 'kg',
    supplier: 'Supplier A'
  },
  {
    id: 2,
    name: 'Ayam Potong',
    sku: 'AY-002',
    category: 'Protein',
    currentStock: 15,
    minStock: 25,
    unit: 'kg',
    supplier: 'Supplier B'
  },
  {
    id: 3,
    name: 'Minyak Goreng',
    sku: 'MG-003',
    category: 'Bahan Pokok',
    currentStock: 8,
    minStock: 15,
    unit: 'liter',
    supplier: 'Supplier C'
  },
  {
    id: 4,
    name: 'Gula Pasir',
    sku: 'GP-004',
    category: 'Bahan Pokok',
    currentStock: 30,
    minStock: 10,
    unit: 'kg',
    supplier: 'Supplier A'
  },
  {
    id: 5,
    name: 'Kemasan Plastik',
    sku: 'KP-005',
    category: 'Packaging',
    currentStock: 500,
    minStock: 200,
    unit: 'pcs',
    supplier: 'Supplier D'
  }
])

// Low stock alerts
const lowStockAlerts = ref([
  {
    id: 1,
    name: 'Ayam Potong',
    remaining: 15,
    unit: 'kg',
    estimatedDays: 2
  },
  {
    id: 2,
    name: 'Minyak Goreng',
    remaining: 8,
    unit: 'liter',
    estimatedDays: 1
  },
  {
    id: 3,
    name: 'Telur',
    remaining: 30,
    unit: 'butir',
    estimatedDays: 3
  },
  {
    id: 4,
    name: 'Bawang Merah',
    remaining: 5,
    unit: 'kg',
    estimatedDays: 2
  }
])

// Utility functions
const getCategoryClass = (category) => {
  const classes = {
    'Bahan Pokok': 'bg-blue-100 text-blue-800',
    'Protein': 'bg-green-100 text-green-800',
    'Sayuran': 'bg-orange-100 text-orange-800',
    'Packaging': 'bg-purple-100 text-purple-800',
    'Bumbu': 'bg-red-100 text-red-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

const getStockClass = (current, min) => {
  if (current === 0) return 'text-red-500'
  if (current <= min) return 'text-orange-500'
  return 'text-green-500'
}

const getStatusClass = (current, min) => {
  if (current === 0) return 'bg-red-100 text-red-800'
  if (current <= min) return 'bg-orange-100 text-orange-800'
  return 'bg-green-100 text-green-800'
}

const getStatusText = (current, min) => {
  if (current === 0) return 'Habis'
  if (current <= min) return 'Menipis'
  return 'Aman'
}

const restockItem = (item) => {
  alert(`Restock item: ${item.name}\n\nAkan membuka form pemesanan...`)
}

const viewHistory = (item) => {
  alert(`Riwayat ${item.name}\n\nAkan menampilkan riwayat stok...`)
}
</script>