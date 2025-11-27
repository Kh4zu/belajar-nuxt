<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Laporan & Analytics</h1>
      <p class="text-gray-600 mt-2">Analisis data dan generate laporan bisnis</p>
    </div>

    <!-- Report Actions -->
    <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div class="flex gap-4">
        <button @click="generateReport('daily')" class="bg-[#009879] text-white px-6 py-2 rounded-lg hover:bg-[#007a63] transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Generate Laporan
        </button>
        
        <select v-model="selectedPeriod" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]">
          <option value="daily">Harian</option>
          <option value="weekly">Mingguan</option>
          <option value="monthly">Bulanan</option>
          <option value="yearly">Tahunan</option>
        </select>
      </div>

      <div class="flex gap-4">
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export PDF
        </button>
        
        <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Export Excel
        </button>
      </div>
    </div>

    <!-- Report Summary -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Sales Report -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Laporan Penjualan</h3>
        <div class="space-y-4">
          <div v-for="item in salesReport" :key="item.id" class="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p class="font-medium text-gray-900">{{ item.period }}</p>
              <p class="text-sm text-gray-500">{{ item.orders }} pesanan</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">Rp {{ formatNumber(item.revenue) }}</p>
              <p class="text-sm" :class="item.growth >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ item.growth >= 0 ? '+' : '' }}{{ item.growth }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Report -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Laporan Inventory</h3>
        <div class="space-y-4">
          <div v-for="item in inventoryReport" :key="item.id" class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div class="flex justify-between items-center mb-2">
              <p class="font-medium text-gray-900">{{ item.category }}</p>
              <p class="text-sm font-semibold" :class="getStockLevelClass(item.stockLevel)">
                {{ item.stockLevel }}
              </p>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="h-2 rounded-full" :class="getStockBarClass(item.percentage)" :style="{ width: item.percentage + '%' }"></div>
            </div>
            <p class="text-sm text-gray-500 mt-1">{{ item.used }}/{{ item.total }} digunakan</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Analytics -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Analisis Detail</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <p class="text-2xl font-bold text-blue-600">{{ analytics.peakHours }}</p>
          <p class="text-sm text-gray-600 mt-1">Jam Sibuk</p>
          <p class="text-xs text-gray-500">18:00 - 20:00</p>
        </div>
        
        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <p class="text-2xl font-bold text-green-600">Rp {{ formatNumber(analytics.avgOrderValue) }}</p>
          <p class="text-sm text-gray-600 mt-1">Rata-rata Nilai Pesanan</p>
          <p class="text-xs text-gray-500">Per transaksi</p>
        </div>
        
        <div class="text-center p-4 border border-gray-200 rounded-lg">
          <p class="text-2xl font-bold text-purple-600">{{ analytics.customerRetention }}%</p>
          <p class="text-sm text-gray-600 mt-1">Retensi Pelanggan</p>
          <p class="text-xs text-gray-500">30 hari terakhir</p>
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

const selectedPeriod = ref('monthly')

// Sales report data
const salesReport = ref([
  {
    id: 1,
    period: 'Januari 2024',
    orders: 1250,
    revenue: 31250000,
    growth: 12.5
  },
  {
    id: 2,
    period: 'Desember 2023',
    orders: 1112,
    revenue: 27800000,
    growth: 8.3
  },
  {
    id: 3,
    period: 'November 2023',
    orders: 1027,
    revenue: 25675000,
    growth: -2.1
  },
  {
    id: 4,
    period: 'Oktober 2023',
    orders: 1049,
    revenue: 26225000,
    growth: 15.7
  }
])

// Inventory report data
const inventoryReport = ref([
  {
    id: 1,
    category: 'Bahan Makanan',
    used: 75,
    total: 100,
    percentage: 75,
    stockLevel: 'Aman'
  },
  {
    id: 2,
    category: 'Minuman',
    used: 45,
    total: 50,
    percentage: 90,
    stockLevel: 'Menipis'
  },
  {
    id: 3,
    category: 'Bahan Tambahan',
    used: 20,
    total: 100,
    percentage: 20,
    stockLevel: 'Berlebih'
  },
  {
    id: 4,
    category: 'Kemasan',
    used: 85,
    total: 100,
    percentage: 85,
    stockLevel: 'Perlu Restock'
  }
])

// Analytics data
const analytics = ref({
  peakHours: '2 jam',
  avgOrderValue: 85000,
  customerRetention: 72.5
})

// Utility functions
const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number)
}

const getStockLevelClass = (level) => {
  const classes = {
    'Aman': 'text-green-600',
    'Menipis': 'text-orange-600',
    'Perlu Restock': 'text-red-600',
    'Berlebih': 'text-blue-600'
  }
  return classes[level] || 'text-gray-600'
}

const getStockBarClass = (percentage) => {
  if (percentage >= 80) return 'bg-red-500'
  if (percentage >= 60) return 'bg-orange-500'
  if (percentage >= 30) return 'bg-green-500'
  return 'bg-blue-500'
}

const generateReport = (type) => {
  alert(`Generating ${type} report...\n\nLaporan akan segera tersedia untuk diunduh.`)
}
</script>