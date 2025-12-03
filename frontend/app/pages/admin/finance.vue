<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#009879] mb-2">Laporan Keuangan</h1>
      <p class="text-gray-600">Analisis dan monitoring performa keuangan GreenOMI</p>
    </div>

    <!-- Date Range Selector -->
    <div class="bg-white rounded-2xl shadow p-6 mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">Filter Periode</h3>
          <p class="text-sm text-gray-600">Pilih periode untuk melihat laporan keuangan</p>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <button 
            v-for="period in timePeriods" 
            :key="period.value"
            @click="selectPeriod(period.value)"
            class="px-4 py-2 rounded-lg border transition"
            :class="activePeriod === period.value 
              ? 'bg-[#009879] text-white border-[#009879]' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
          >
            {{ period.label }}
          </button>
          
          <div class="flex items-center gap-3">
            <div class="relative">
              <input 
                v-model="startDate"
                type="date" 
                class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]"
              >
            </div>
            <span class="text-gray-500">s/d</span>
            <div class="relative">
              <input 
                v-model="endDate"
                type="date" 
                class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]"
              >
            </div>
            <button 
              @click="applyCustomDate"
              class="bg-[#009879] text-white px-4 py-2 rounded-lg hover:bg-[#007a63] transition"
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-gray-500 text-sm">Total Pendapatan</h3>
            <p class="text-2xl font-bold text-gray-800">Rp {{ formatCurrency(financialData.totalRevenue) }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span :class="revenueChange >= 0 ? 'text-green-600' : 'text-red-600'" class="font-semibold">
            {{ revenueChange >= 0 ? '+' : '' }}{{ revenueChange }}%
          </span>
          <span class="text-gray-600 ml-2">vs periode sebelumnya</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-gray-500 text-sm">Total Pengeluaran</h3>
            <p class="text-2xl font-bold text-blue-800">Rp {{ formatCurrency(financialData.totalExpenses) }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6v1m0 1v1m6-12h2m-10 0h2m-2 12h2m-2 0v2m0-14v2"/>
            </svg>
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span :class="expenseChange >= 0 ? 'text-green-600' : 'text-red-600'" class="font-semibold">
            {{ expenseChange >= 0 ? '+' : '' }}{{ expenseChange }}%
          </span>
          <span class="text-gray-600 ml-2">vs periode sebelumnya</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-gray-500 text-sm">Total Transaksi</h3>
            <p class="text-2xl font-bold text-purple-800">{{ financialData.totalTransactions }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span :class="transactionChange >= 0 ? 'text-green-600' : 'text-red-600'" class="font-semibold">
            {{ transactionChange >= 0 ? '+' : '' }}{{ transactionChange }}%
          </span>
          <span class="text-gray-600 ml-2">vs periode sebelumnya</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-gray-500 text-sm">Profit Bersih</h3>
            <p class="text-2xl font-bold text-orange-800">Rp {{ formatCurrency(financialData.netProfit) }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span :class="profitChange >= 0 ? 'text-green-600' : 'text-red-600'" class="font-semibold">
            {{ profitChange >= 0 ? '+' : '' }}{{ profitChange }}%
          </span>
          <span class="text-gray-600 ml-2">vs periode sebelumnya</span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Revenue vs Expense Chart -->
      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-800">Pemasukan vs Pengeluaran</h3>
          <select v-model="chartType" @change="updateCharts" class="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#009879]">
            <option value="daily">Harian</option>
            <option value="weekly">Mingguan</option>
            <option value="monthly">Bulanan</option>
          </select>
        </div>
        <div class="h-80">
          <canvas ref="revenueExpenseChart"></canvas>
        </div>
      </div>

      <!-- Revenue by Category -->
      <div class="bg-white p-6 rounded-2xl shadow">
        <h3 class="text-lg font-semibold text-gray-800 mb-6">Pendapatan per Kategori</h3>
        <div class="h-80">
          <canvas ref="categoryChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Transaction Table & Statistics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Transactions -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow overflow-hidden">
        <div class="p-6 border-b">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-800">Transaksi Terbaru</h3>
            <button @click="exportTransactions" class="text-[#009879] hover:text-[#007a63] transition flex items-center gap-2 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Export CSV
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">ID Transaksi</th>
                <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Customer</th>
                <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Tanggal</th>
                <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Produk</th>
                <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Jumlah</th>
                <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="transaction in recentTransactions" :key="transaction.id" class="hover:bg-gray-50">
                <td class="py-3 px-6">
                  <span class="font-mono text-sm text-gray-600">{{ transaction.id }}</span>
                </td>
                <td class="py-3 px-6">
                  <div>
                    <p class="font-medium">{{ transaction.customer || 'Guest' }}</p>
                    <p class="text-sm text-gray-500">{{ getProductNames(transaction.items) }}</p>
                  </div>
                </td>
                <td class="py-3 px-6">
                  <span class="text-sm">{{ formatDate(transaction.date) }}</span>
                </td>
                <td class="py-3 px-6">
                  <div class="flex items-center gap-2">
                    <span class="text-sm">{{ transaction.items?.length || 0 }} item</span>
                  </div>
                </td>
                <td class="py-3 px-6">
                  <span class="font-medium">{{ getTotalQuantity(transaction.items) }}</span>
                </td>
                <td class="py-3 px-6">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getStatusClass(transaction.status)">
                    {{ getStatusText(transaction.status) }}
                  </span>
                </td>
                <td class="py-3 px-6">
                  <span class="font-semibold text-gray-800">Rp {{ formatCurrency(transaction.amount || 0) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-6 border-t">
          <button @click="viewAllTransactions" class="w-full text-center text-[#009879] hover:text-[#007a63] transition font-medium">
            Lihat Semua Transaksi →
          </button>
        </div>
      </div>

      <!-- Revenue Statistics -->
      <div class="bg-white rounded-2xl shadow p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-6">Statistik Keuangan</h3>
        
        <div class="space-y-6">
          <!-- Revenue Sources (berdasarkan kategori) -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-3">Sumber Pendapatan</h4>
            <div class="space-y-3">
              <div v-for="source in revenueByCategory" :key="source.category">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">{{ source.category }}</span>
                  <span class="font-medium">Rp {{ formatCurrency(source.amount) }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full" 
                    :class="source.color"
                    :style="{ width: source.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-3">Metode Pembayaran</h4>
            <div class="space-y-3">
              <div v-for="method in paymentMethods" :key="method.name" class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="method.bgColor">
                    <svg class="w-4 h-4" :class="method.textColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon"/>
                    </svg>
                  </div>
                  <span class="text-sm">{{ method.name }}</span>
                </div>
                <span class="font-medium">{{ method.percentage }}%</span>
              </div>
            </div>
          </div>

          <!-- Expense Breakdown -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-3">Breakdown Pengeluaran</h4>
            <div class="space-y-2">
              <div v-for="expense in expenseBreakdown" :key="expense.category" class="flex items-center justify-between text-sm">
                <span class="text-gray-600">{{ expense.category }}</span>
                <span class="font-medium">Rp {{ formatCurrency(expense.amount) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Export & Reports -->
    <div class="mt-6 bg-white rounded-2xl shadow p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">Laporan dan Export</h3>
          <p class="text-sm text-gray-600">Generate laporan keuangan lengkap</p>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <button @click="generateMonthlyReport" class="px-4 py-2 bg-[#009879] text-white rounded-lg hover:bg-[#007a63] transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Laporan Bulanan
          </button>
          <button @click="exportToExcel" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export Excel
          </button>
          <button @click="exportToPDF" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Chart from 'chart.js/auto'
import { useFinancialStore } from '~/stores/financialStore'
import { useMenuStore } from '~/stores/menuStore'

definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

// Data & State
const revenueExpenseChart = ref(null)
const categoryChart = ref(null)
let revenueExpenseChartInstance = null
let categoryChartInstance = null

const activePeriod = ref('month')
const chartType = ref('monthly')
const startDate = ref('')
const endDate = ref('')

// Stores
const financialStore = useFinancialStore()
const menuStore = useMenuStore()

// Set default dates
onMounted(() => {
  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  
  startDate.value = formatDateForInput(firstDay)
  endDate.value = formatDateForInput(today)
  
  // Initialize stores
  if (financialStore.initialize) {
    financialStore.initialize()
  }
  
  if (menuStore.initialize) {
    menuStore.initialize()
  }
  
  // Load data dan init charts
  setTimeout(() => {
    loadFinancialData()
    initCharts()
  }, 500)
})

// Time Periods
const timePeriods = [
  { label: 'Hari Ini', value: 'today' },
  { label: '7 Hari', value: 'week' },
  { label: '30 Hari', value: 'month' },
  { label: '90 Hari', value: 'quarter' },
  { label: 'Tahun Ini', value: 'year' }
]

// Computed Properties
const filteredTransactions = computed(() => {
  if (!startDate.value || !endDate.value) return financialStore.transactions || []
  
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  
  return (financialStore.transactions || []).filter(transaction => {
    if (!transaction?.date) return false
    const transDate = new Date(transaction.date)
    return transDate >= start && transDate <= end
  })
})

const recentTransactions = computed(() => {
  return filteredTransactions.value.slice(0, 10)
})

const financialData = computed(() => {
  const transactions = filteredTransactions.value
  const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
  
  // Hitung pengeluaran berdasarkan HPP (Harga Pokok Penjualan)
  const totalExpenses = calculateTotalExpenses(transactions)
  
  // Hitung transaksi
  const totalTransactions = transactions.length
  
  // Hitung profit bersih
  const netProfit = totalRevenue - totalExpenses
  
  // Hitung rata-rata transaksi
  const averageTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0
  
  return {
    totalRevenue,
    totalExpenses,
    totalTransactions,
    netProfit,
    averageTransaction,
    profitMargin: totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0
  }
})

const revenueByCategory = computed(() => {
  const transactions = filteredTransactions.value
  const menuItems = menuStore.menu || []
  const categoryTotals = {}
  
  transactions.forEach(transaction => {
    transaction.items?.forEach(item => {
      const menuItem = menuItems.find(m => m.id === item.id || m.name === item.name)
      if (menuItem) {
        const category = menuItem.category || 'Lainnya'
        if (!categoryTotals[category]) {
          categoryTotals[category] = 0
        }
        categoryTotals[category] += item.subtotal || (item.price * item.quantity) || 0
      }
    })
  })
  
  const totalRevenue = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)
  
  return Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: totalRevenue > 0 ? ((amount / totalRevenue) * 100).toFixed(1) : 0,
    color: getCategoryColor(category)
  })).sort((a, b) => b.amount - a.amount)
})

const topProducts = computed(() => {
  const transactions = filteredTransactions.value
  const menuItems = menuStore.menu || []
  const productSales = {}
  
  transactions.forEach(transaction => {
    transaction.items?.forEach(item => {
      const menuItem = menuItems.find(m => m.id === item.id || m.name === item.name)
      if (menuItem) {
        const productId = menuItem.id
        if (!productSales[productId]) {
          productSales[productId] = {
            name: menuItem.name,
            category: menuItem.category || 'Lainnya',
            sales: 0,
            revenue: 0
          }
        }
        productSales[productId].sales += item.quantity || 1
        productSales[productId].revenue += item.subtotal || (menuItem.price * (item.quantity || 1))
      }
    })
  })
  
  return Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
})

const paymentMethods = computed(() => {
  const transactions = filteredTransactions.value
  const methodCounts = {}
  
  transactions.forEach(transaction => {
    const method = transaction.paymentMethod || 'unknown'
    if (!methodCounts[method]) methodCounts[method] = 0
    methodCounts[method]++
  })
  
  const totalTransactions = transactions.length
  
  return Object.entries(methodCounts).map(([method, count]) => ({
    name: getPaymentMethodName(method),
    percentage: totalTransactions > 0 ? ((count / totalTransactions) * 100).toFixed(0) : 0,
    ...getPaymentMethodStyle(method)
  }))
})

const expenseBreakdown = computed(() => {
  const transactions = filteredTransactions.value
  const menuItems = menuStore.menu || []
  
  // Hitung HPP (Harga Pokok Penjualan)
  let hpp = 0
  transactions.forEach(transaction => {
    transaction.items?.forEach(item => {
      const menuItem = menuItems.find(m => m.id === item.id || m.name === item.name)
      if (menuItem) {
        // HPP = 60% dari harga jual (untuk simulasi)
        const costPrice = (menuItem.price * 0.6) * (item.quantity || 1)
        hpp += costPrice
      }
    })
  })
  
  // Hitung biaya operasional (30% dari total revenue)
  const operationalCost = financialData.value.totalRevenue * 0.3
  
  // Hitung pajak (10% dari revenue)
  const tax = financialData.value.totalRevenue * 0.1
  
  // Biaya lainnya (5%)
  const otherCosts = financialData.value.totalRevenue * 0.05
  
  return [
    { category: 'HPP (Bahan Baku)', amount: hpp },
    { category: 'Biaya Operasional', amount: operationalCost },
    { category: 'Pajak', amount: tax },
    { category: 'Lain-lain', amount: otherCosts }
  ]
})

// Helper Methods
const getProductNames = (items) => {
  if (!items || !Array.isArray(items)) return ''
  return items.map(item => item.name || 'Unknown').join(', ').slice(0, 50) + '...'
}

const getTotalQuantity = (items) => {
  if (!items || !Array.isArray(items)) return 0
  return items.reduce((total, item) => total + (item.quantity || 1), 0)
}

const getStatusClass = (status) => {
  const classes = {
    'completed': 'bg-green-100 text-green-800',
    'processing': 'bg-blue-100 text-blue-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Methods
const selectPeriod = (period) => {
  activePeriod.value = period
  
  const today = new Date()
  const newStartDate = new Date()
  
  switch (period) {
    case 'today':
      newStartDate.setDate(today.getDate())
      break
    case 'week':
      newStartDate.setDate(today.getDate() - 7)
      break
    case 'month':
      newStartDate.setDate(1)
      break
    case 'quarter':
      newStartDate.setMonth(today.getMonth() - 3)
      break
    case 'year':
      newStartDate.setFullYear(today.getFullYear(), 0, 1)
      break
  }
  
  startDate.value = formatDateForInput(newStartDate)
  endDate.value = formatDateForInput(today)
  
  loadFinancialData()
}

const applyCustomDate = () => {
  loadFinancialData()
  updateCharts()
  showNotification('Filter periode diterapkan!', 'success')
}

const loadFinancialData = () => {
  // Data sudah diupdate melalui computed properties
  updateCharts()
}

const initCharts = () => {
  if (revenueExpenseChart.value) {
    const dailyData = getRevenueExpenseData()
    
    revenueExpenseChartInstance = new Chart(revenueExpenseChart.value, {
      type: 'bar',
      data: {
        labels: dailyData.labels,
        datasets: [
          {
            label: 'Pemasukan',
            data: dailyData.revenue,
            backgroundColor: '#10B981',
            borderRadius: 6
          },
          {
            label: 'Pengeluaran',
            data: dailyData.expenses,
            backgroundColor: '#EF4444',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += 'Rp ' + formatCurrency(context.raw);
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `Rp ${formatCurrency(value)}`
            }
          }
        }
      }
    })
  }
  
  if (categoryChart.value) {
    const categories = revenueByCategory.value
    
    categoryChartInstance = new Chart(categoryChart.value, {
      type: 'doughnut',
      data: {
        labels: categories.map(c => c.category),
        datasets: [
          {
            data: categories.map(c => parseFloat(c.percentage)),
            backgroundColor: categories.map(c => c.color),
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ''
                const value = context.raw || 0
                const amount = categories[context.dataIndex]?.amount || 0
                return `${label}: ${value}% (Rp ${formatCurrency(amount)})`
              }
            }
          }
        }
      }
    })
  }
}

const getRevenueExpenseData = () => {
  const transactions = filteredTransactions.value
  const menuItems = menuStore.menu || []
  
  let labels = []
  let revenueData = []
  let expenseData = []
  
  const now = new Date()
  
  if (chartType.value === 'monthly') {
    // Data 6 bulan terakhir
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = date.toLocaleDateString('id-ID', { month: 'short' })
      labels.push(monthName)
      
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      
      const monthlyTransactions = transactions.filter(t => {
        if (!t?.date) return false
        const transDate = new Date(t.date)
        return transDate >= monthStart && transDate <= monthEnd
      })
      
      // Hitung pendapatan bulan ini
      const monthlyRevenue = monthlyTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)
      revenueData.push(monthlyRevenue)
      
      // Hitung pengeluaran bulan ini (HPP + Biaya)
      const monthlyExpenses = calculateTotalExpenses(monthlyTransactions)
      expenseData.push(monthlyExpenses)
    }
  } else if (chartType.value === 'weekly') {
    // Data 4 minggu terakhir
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - (i * 7))
      labels.push(`Minggu ${4 - i}`)
      
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      
      const weeklyTransactions = transactions.filter(t => {
        if (!t?.date) return false
        const transDate = new Date(t.date)
        return transDate >= weekStart && transDate <= weekEnd
      })
      
      const weeklyRevenue = weeklyTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)
      revenueData.push(weeklyRevenue)
      
      const weeklyExpenses = calculateTotalExpenses(weeklyTransactions)
      expenseData.push(weeklyExpenses)
    }
  } else {
    // Data 7 hari terakhir
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)
      labels.push(date.toLocaleDateString('id-ID', { weekday: 'short' }))
      
      const dayTransactions = transactions.filter(t => {
        if (!t?.date) return false
        const transDate = new Date(t.date)
        return transDate.toDateString() === date.toDateString()
      })
      
      const dayRevenue = dayTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)
      revenueData.push(dayRevenue)
      
      const dayExpenses = calculateTotalExpenses(dayTransactions)
      expenseData.push(dayExpenses)
    }
  }
  
  return { labels, revenue: revenueData, expenses: expenseData }
}

const calculateTotalExpenses = (transactions) => {
  const menuItems = menuStore.menu || []
  let totalExpenses = 0
  
  transactions.forEach(transaction => {
    transaction.items?.forEach(item => {
      const menuItem = menuItems.find(m => m.id === item.id || m.name === item.name)
      if (menuItem) {
        // HPP = 60% dari harga jual
        const costPrice = (menuItem.price * 0.6) * (item.quantity || 1)
        totalExpenses += costPrice
      }
    })
    
    // Tambahkan biaya operasional (30% dari transaksi)
    totalExpenses += (transaction.amount || 0) * 0.3
    
    // Tambahkan pajak (10%)
    totalExpenses += (transaction.amount || 0) * 0.1
    
    // Tambahkan biaya lainnya (5%)
    totalExpenses += (transaction.amount || 0) * 0.05
  })
  
  return totalExpenses
}

const updateCharts = () => {
  if (revenueExpenseChartInstance) {
    const data = getRevenueExpenseData()
    
    revenueExpenseChartInstance.data.labels = data.labels
    revenueExpenseChartInstance.data.datasets[0].data = data.revenue
    revenueExpenseChartInstance.data.datasets[1].data = data.expenses
    revenueExpenseChartInstance.update()
  }
  
  if (categoryChartInstance) {
    const categories = revenueByCategory.value
    
    categoryChartInstance.data.labels = categories.map(c => c.category)
    categoryChartInstance.data.datasets[0].data = categories.map(c => parseFloat(c.percentage))
    categoryChartInstance.data.datasets[0].backgroundColor = categories.map(c => c.color)
    categoryChartInstance.update()
  }
}

const getCategoryColor = (category) => {
  const colors = {
    'Makanan Utama': '#3B82F6',
    'Minuman': '#10B981',
    'Snack': '#F59E0B',
    'Dessert': '#8B5CF6',
    'Appetizer': '#EF4444',
    'Lainnya': '#6B7280'
  }
  return colors[category] || `#${Math.floor(Math.random()*16777215).toString(16)}`
}

const getPaymentMethodName = (method) => {
  const names = {
    'bank_transfer': 'Bank Transfer',
    'e_wallet': 'E-Wallet',
    'cod': 'COD',
    'cash': 'Cash',
    'qris': 'QRIS',
    'unknown': 'Lainnya'
  }
  return names[method] || method
}

const getPaymentMethodStyle = (method) => {
  const styles = {
    'bank_transfer': {
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    'e_wallet': {
      icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    'cod': {
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    'cash': {
      icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    }
  }
  return styles[method] || {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600'
  }
}

const formatCurrency = (amount) => {
  const numAmount = Number(amount) || 0
  return new Intl.NumberFormat('id-ID').format(numAmount)
}

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch (error) {
    return 'Invalid Date'
  }
}

const formatDateForInput = (date) => {
  return date.toISOString().split('T')[0]
}

const getStatusText = (status) => {
  const statusMap = {
    'completed': 'Selesai',
    'processing': 'Diproses',
    'pending': 'Menunggu',
    'cancelled': 'Dibatalkan',
    'paid': 'Dibayar'
  }
  return statusMap[status] || status
}

// Calculate percentage changes (dummy untuk demo)
const revenueChange = computed(() => {
  // Untuk demo, hitung persentase dari data 2 periode
  const currentRevenue = financialData.value.totalRevenue
  const previousRevenue = currentRevenue * 0.85 // 15% lebih rendah
  return currentRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1) : 0
})

const expenseChange = computed(() => {
  const currentExpenses = financialData.value.totalExpenses
  const previousExpenses = currentExpenses * 0.9 // 10% lebih rendah
  return currentExpenses > 0 ? ((currentExpenses - previousExpenses) / previousExpenses * 100).toFixed(1) : 0
})

const transactionChange = computed(() => {
  const currentTransactions = financialData.value.totalTransactions
  const previousTransactions = Math.max(0, currentTransactions - 2) // 2 transaksi lebih sedikit
  return currentTransactions > 0 ? ((currentTransactions - previousTransactions) / previousTransactions * 100).toFixed(1) : 0
})

const profitChange = computed(() => {
  const currentProfit = financialData.value.netProfit
  const previousProfit = currentProfit * 0.8 // 20% lebih rendah
  return currentProfit > 0 ? ((currentProfit - previousProfit) / previousProfit * 100).toFixed(1) : 0
})

const viewAllTransactions = () => {
  showNotification('Fitur "Lihat Semua Transaksi" sedang dalam pengembangan', 'info')
}

const exportTransactions = () => {
  const transactions = filteredTransactions.value
  if (transactions.length === 0) {
    showNotification('Tidak ada data untuk diexport', 'error')
    return
  }
  
  const csvContent = [
    ['ID Transaksi', 'Customer', 'Tanggal', 'Produk', 'Jumlah', 'Status', 'Total'],
    ...transactions.map(t => [
      t.id,
      t.customer || 'Guest',
      formatDate(t.date),
      getProductNames(t.items),
      getTotalQuantity(t.items),
      getStatusText(t.status),
      `Rp ${formatCurrency(t.amount || 0)}`
    ])
  ].map(row => row.join(',')).join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `transaksi_${formatDateForInput(new Date())}.csv`
  a.click()
  
  showNotification('Data transaksi berhasil diexport!', 'success')
}

const generateMonthlyReport = () => {
  const reportData = {
    period: `${formatDate(startDate.value)} - ${formatDate(endDate.value)}`,
    ...financialData.value,
    topProducts: topProducts.value,
    revenueByCategory: revenueByCategory.value,
    paymentMethods: paymentMethods.value
  }
  
  console.log('Monthly Report:', reportData)
  showNotification('Laporan bulanan berhasil dibuat!', 'success')
}

const exportToExcel = () => {
  showNotification('Mengexport data ke Excel...', 'info')
  setTimeout(() => {
    exportTransactions() // Gunakan fungsi export CSV untuk sementara
  }, 1500)
}

const exportToPDF = () => {
  showNotification('Mengexport data ke PDF...', 'info')
  setTimeout(() => {
    showNotification('Export PDF berhasil!', 'success')
  }, 1500)
}

const showNotification = (message, type = 'info') => {
  if (typeof window !== 'undefined') {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all ${
      type === 'error' ? 'bg-red-500 text-white' :
      type === 'success' ? 'bg-green-500 text-white' :
      'bg-blue-500 text-white'
    }`
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
            type === 'success' ? 'M5 13l4 4L19 7' :
            type === 'error' ? 'M6 18L18 6M6 6l12 12' :
            'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          }"/>
        </svg>
        <span>${message}</span>
      </div>
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }
}

// Watch for chart type changes
watch(chartType, () => {
  updateCharts()
})

// Watch for date changes
watch([startDate, endDate], () => {
  loadFinancialData()
})

// Cleanup
onUnmounted(() => {
  if (revenueExpenseChartInstance) {
    revenueExpenseChartInstance.destroy()
  }
  if (categoryChartInstance) {
    categoryChartInstance.destroy()
  }
})
</script>