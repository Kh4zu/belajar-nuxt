<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#009879] mb-2">Admin Dashboard</h1>
      <p class="text-gray-600">Selamat datang di panel administrator Greenomi</p>
    </div>

    <!-- Statistik -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-gray-500">Total Menu</h2>
            <p class="text-3xl font-bold mt-2">{{ menuStore.menu.length }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-gray-500">Total Transaksi</h2>
            <p class="text-3xl font-bold mt-2">{{ statistics.totalTransactions }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-gray-500">Pendapatan Bulan Ini</h2>
            <p class="text-3xl font-bold mt-2">Rp {{ statistics.revenue.toLocaleString('id-ID') }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6v1m0 1v1m6-12h2m-10 0h2m-2 12h2m-2 0v2m0-14v2"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-gray-500">Stok Habis</h2>
            <p class="text-3xl font-bold mt-2 text-red-500">{{ statistics.outOfStock }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Chart Pemasukan vs Pengeluaran -->
      <div class="bg-white p-6 rounded-2xl shadow">
        <h2 class="text-xl font-semibold mb-4">Pemasukan vs Pengeluaran</h2>
        <IncomeExpenseChart />
      </div>

      <!-- Diagram Pembelian -->
      <div class="bg-white p-6 rounded-2xl shadow">
        <h2 class="text-xl font-semibold mb-4">Trend Penjualan</h2>
        <PurchaseChart />
      </div>
    </div>

    <!-- Additional Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Stok Terkini -->
      <div class="bg-white p-6 rounded-2xl shadow">
        <h2 class="text-xl font-semibold mb-4">Status Stok</h2>
        <StockChart />
      </div>

      <!-- Aktivitas User -->
      <div class="bg-white p-6 rounded-2xl shadow">
        <h2 class="text-xl font-semibold mb-4">Aktivitas User</h2>
        <UserActivityChart />
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow">
        <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
        <div class="space-y-3">
          <button @click="navigateTo('/admin/menu')" class="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition flex items-center gap-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Kelola Menu
          </button>
          <button @click="navigateTo('/admin/stock')" class="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition flex items-center gap-3">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"/>
            </svg>
            Management Stok
          </button>
          <button @click="navigateTo('/admin/users')" class="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition flex items-center gap-3">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
            Kelola User
          </button>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white p-6 rounded-2xl shadow md:col-span-2">
        <h3 class="text-lg font-semibold mb-4">Aktivitas Terbaru</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-4 p-3 border rounded-lg">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="activity.color">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path :d="activity.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-medium">{{ activity.message }}</p>
              <p class="text-sm text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin',
  layout: 'admin' // PASTIKAN INI ADA!
});

import { useMenuStore } from '~/stores/useMenuStore'

const menuStore = useMenuStore()

// Data statistik
const statistics = ref({
  totalTransactions: 156,
  revenue: 12540000,
  outOfStock: menuStore.menu.filter(m => m.stock <= 0).length,
  monthlyGrowth: 12.5
})

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    message: 'User baru "Budi Santoso" terdaftar',
    time: '5 menit yang lalu',
    color: 'bg-blue-500',
    icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
  },
  {
    id: 2,
    message: 'Stok "Nasi Goreng Spesial" hampir habis',
    time: '15 menit yang lalu',
    color: 'bg-orange-500',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  },
  {
    id: 3,
    message: 'Transaksi baru senilai Rp 250.000',
    time: '30 menit yang lalu',
    color: 'bg-green-500',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
])

// Navigation function
const navigateTo = (path) => {
  window.location.href = path;
}
</script>