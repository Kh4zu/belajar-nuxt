<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard Manager</h1>
      <p class="text-gray-600 mt-2">Overview performa bisnis dan tim Anda</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Revenue Card -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pendapatan Bulan Ini</p>
            <p class="text-2xl font-bold text-gray-900 mt-2">Rp {{ formatNumber(metrics.revenue) }}</p>
            <p class="text-sm text-green-600 mt-1 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
              +12.5% dari bulan lalu
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6v1m0 1v1m6-12h2m-10 0h2m-2 12h2m-2 0v2m0-14v2"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Orders Card -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Pesanan</p>
            <p class="text-2xl font-bold text-gray-900 mt-2">{{ metrics.totalOrders }}</p>
            <p class="text-sm text-green-600 mt-1 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
              +8.2% dari bulan lalu
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Team Performance -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Performa Tim</p>
            <p class="text-2xl font-bold text-gray-900 mt-2">{{ metrics.teamPerformance }}%</p>
            <p class="text-sm text-green-600 mt-1 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
              +5% dari minggu lalu
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Inventory Alert -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Stok Menipis</p>
            <p class="text-2xl font-bold text-red-600 mt-2">{{ metrics.lowStockItems }}</p>
            <p class="text-sm text-gray-600 mt-1">Perlu restock</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts & Data Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Revenue Chart -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Trend Pendapatan</h3>
          <select class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#009879]">
            <option>Bulan Ini</option>
            <option>3 Bulan Terakhir</option>
            <option>Tahun Ini</option>
          </select>
        </div>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <p class="text-gray-500">Chart: Trend Pendapatan</p>
            <p class="text-sm text-gray-400">Data visualisasi akan ditampilkan di sini</p>
          </div>
        </div>
      </div>

      <!-- Top Performing Items -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Menu Terpopuler</h3>
        <div class="space-y-4">
          <div v-for="item in topPerformingItems" :key="item.id" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div class="flex items-center gap-3">
              <img :src="item.image" :alt="item.name" class="w-10 h-10 rounded-lg object-cover" @error="handleImageError">
              <div>
                <p class="font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-sm text-gray-500">{{ item.category }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">{{ item.orders }} pesanan</p>
              <p class="text-sm text-green-600">Rp {{ formatNumber(item.revenue) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Quick Actions -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div class="space-y-3">
          <button @click="navigateTo('/manager/reports')" class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center gap-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Generate Laporan
          </button>
          <button @click="navigateTo('/manager/team')" class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center gap-3">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            Kelola Tim
          </button>
          <button @click="navigateTo('/manager/inventory')" class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center gap-3">
            <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"/>
            </svg>
            Cek Inventory
          </button>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="activity.color">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path :d="activity.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900">{{ activity.message }}</p>
              <p class="text-sm text-gray-500">{{ activity.time }}</p>
            </div>
            <span class="px-2 py-1 text-xs font-medium rounded-full" :class="activity.statusClass">
              {{ activity.status }}
            </span>
          </div>
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

// Metrics data
const metrics = ref({
  revenue: 12540000,
  totalOrders: 342,
  teamPerformance: 87,
  lowStockItems: 8
})

// Top performing items
const topPerformingItems = ref([
  {
    id: 1,
    name: 'Nasi Goreng Spesial',
    category: 'Makanan Utama',
    image: 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=100&h=100&fit=crop',
    orders: 156,
    revenue: 3900000
  },
  {
    id: 2,
    name: 'Ayam Bakar Madu',
    category: 'Makanan Utama',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100&h=100&fit=crop',
    orders: 98,
    revenue: 2940000
  },
  {
    id: 3,
    name: 'Es Jeruk Segar',
    category: 'Minuman',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=100&h=100&fit=crop',
    orders: 203,
    revenue: 2030000
  }
])

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    message: 'Pesanan besar dari Pelanggan Corporate',
    time: '30 menit yang lalu',
    color: 'bg-blue-500',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    status: 'Baru',
    statusClass: 'bg-blue-100 text-blue-800'
  },
  {
    id: 2,
    message: 'Stok ayam akan habis dalam 2 hari',
    time: '1 jam yang lalu',
    color: 'bg-orange-500',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    status: 'Peringatan',
    statusClass: 'bg-orange-100 text-orange-800'
  },
  {
    id: 3,
    message: 'Laporan bulanan telah digenerate',
    time: '2 jam yang lalu',
    color: 'bg-green-500',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    status: 'Selesai',
    statusClass: 'bg-green-100 text-green-800'
  }
])

// Utility functions
const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number)
}

const navigateTo = (path) => {
  window.location.href = path
}

const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyMEMzNS4zMTM3IDIwIDM4IDIyLjY4NjMgMzggMjZDMzggMjkuMzEzNyAzNS4zMTM3IDMyIDMyIDMyQzI4LjY4NjMgMzIgMjYgMjkuMzEzNyAyNiAyNkMyNiAyMi42ODYzIDI4LjY4NjMgMjAgMzIgMjBaIiBmaWxsPSIjOEU5MEEwIi8+CjxwYXRoIGQ9Ik0xNiAzOEMxNiAzNC42ODYzIDE4LjY4NjMgMzIgMjIgMzJINDJDMjkuODQ5NyAzMiAyMCA0MS44NDk3IDIwIDU0SDE2VjM4WiIgZmlsbD0iIzhFOTBBMCIvPgo8L3N2Zz4K'
}
</script>