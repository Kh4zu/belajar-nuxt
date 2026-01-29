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
            <p class="text-3xl font-bold mt-2">{{ menuCount }}</p>
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
            <p class="text-3xl font-bold mt-2">{{ transactionCount }}</p>
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
            <p class="text-3xl font-bold mt-2">Rp {{ formatCurrency(monthlyRevenue) }}</p>
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
            <p class="text-3xl font-bold mt-2 text-red-500">{{ outOfStockCount }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009879]"></div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Chart Pemasukan vs Pengeluaran -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Pemasukan vs Pengeluaran</h2>
            <select v-model="chartPeriod" @change="updateCharts" class="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#009879]">
              <option value="monthly">Bulanan</option>
              <option value="weekly">Mingguan</option>
              <option value="daily">Harian</option>
            </select>
          </div>
          <div class="h-80">
            <canvas ref="incomeExpenseChart"></canvas>
          </div>
        </div>

        <!-- Diagram Pembelian -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Trend Penjualan</h2>
            <select v-model="salesPeriod" @change="updateCharts" class="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#009879]">
              <option value="monthly">Bulanan</option>
              <option value="weekly">Mingguan</option>
              <option value="daily">Harian</option>
            </select>
          </div>
          <div class="h-80">
            <canvas ref="purchaseChart"></canvas>
          </div>
        </div>
      </div>

        
        <div class="bg-white p-6 rounded-2xl shadow">
          <h2 class="text-x1 font-semibold mb-4">Produk Terlaris</h2>
          <div class="h-80">
            <canvas ref="stockChart"></canvas>
          </div>

        <!-- Aktivitas User -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Aktivitas User</h2>
            <select v-model="activityPeriod" @change="updateCharts" class="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#009879]">
              <option value="monthly">Bulanan</option>
              <option value="weekly">Mingguan</option>
              <option value="daily">Harian</option>
            </select>
          </div>
          <div class="h-80">
            <canvas ref="userActivityChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow">
          <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <NuxtLink to="/admin/menu" class="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition flex items-center gap-3">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Kelola Menu
            </NuxtLink>
            <NuxtLink to="/admin/stock" class="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition flex items-center gap-3">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"/>
              </svg>
              Management Stok
            </NuxtLink>
            <NuxtLink to="/admin/finance" class="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition flex items-center gap-3">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6v1m0 1v1m6-12h2m-10 0h2m-2 12h2m-2 0v2m0-14v2"/>
              </svg>
              Laporan Keuangan
            </NuxtLink>
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
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});

import { ref, onMounted, onUnmounted, computed } from 'vue';
import Chart from 'chart.js/auto';

// Import stores
import { useMenuStore } from '~/stores/menuStore';
import { useFinancialStore } from '~/stores/financialStore';

// State
const loading = ref(true);
const chartPeriod = ref('monthly');
const salesPeriod = ref('monthly');
const activityPeriod = ref('monthly');

// Chart refs
const incomeExpenseChart = ref(null);
const purchaseChart = ref(null);
const stockChart = ref(null);
const userActivityChart = ref(null);

let incomeExpenseChartInstance = null;
let purchaseChartInstance = null;
let stockChartInstance = null;
let userActivityChartInstance = null;

// Initialize stores
const menuStore = useMenuStore();
const financialStore = useFinancialStore();

// Computed properties
const menuCount = computed(() => {
  return menuStore.menu?.length || 0;
});

const transactionCount = computed(() => {
  return financialStore.transactions?.length || 0;
});

const outOfStockCount = computed(() => {
  return menuStore.outOfStockItems?.length || 0;
});

const monthlyRevenue = computed(() => {
  return financialStore.monthlyRevenue || 0;
});

const lowStockCount = computed(() => {
  return menuStore.lowStockItems?.length || 0;
});

// Recent activities berdasarkan data real
const recentActivities = computed(() => {
  const activities = [];
  
  // Check for out of stock dari menu store
  const outOfStockItems = menuStore.outOfStockItems || [];
  if (outOfStockItems.length > 0) {
    activities.push({
      id: 1,
      message: `${outOfStockItems.length} item stok habis`,
      time: 'Segera restock',
      color: 'bg-red-500',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    });
  }
  
  // Check for low stock dari menu store
  const lowStockItems = menuStore.lowStockItems || [];
  if (lowStockItems.length > 0) {
    activities.push({
      id: 2,
      message: `${lowStockItems.length} item stok hampir habis`,
      time: 'Perlu perhatian',
      color: 'bg-orange-500',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    });
  }
  
  // Recent transactions dari financial store
  const recentTransactions = financialStore.recentTransactions || [];
  if (recentTransactions.length > 0) {
    const todayTransactions = recentTransactions.filter(trans => {
      const transDate = new Date(trans.date);
      const today = new Date();
      return transDate.toDateString() === today.toDateString();
    }).length;
    
    if (todayTransactions > 0) {
      activities.push({
        id: 3,
        message: `${todayTransactions} transaksi hari ini`,
        time: 'Baru saja',
        color: 'bg-green-500',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      });
    }
  }
  
  // Check for new orders dari menu store
  const recentOrders = menuStore.orders?.slice(0, 3) || [];
  if (recentOrders.length > 0) {
    activities.push({
      id: 4,
      message: `${recentOrders.length} pesanan baru`,
      time: 'Perlu diproses',
      color: 'bg-blue-500',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    });
  }
  
  // Jika tidak ada aktivitas, tambahkan demo
  if (activities.length === 0) {
    activities.push({
      id: 5,
      message: 'Dashboard berhasil diupdate',
      time: 'Baru saja',
      color: 'bg-purple-500',
      icon: 'M5 13l4 4L19 7'
    });
  }
  
  return activities.slice(0, 4); // Maksimal 4 aktivitas
});

// Lifecycle
onMounted(async () => {
  try {
    // Initialize stores
    if (menuStore.initialize) {
      menuStore.initialize();
    }
    
    if (financialStore.initialize) {
      financialStore.initialize();
    }
    
    // Wait for stores to be ready
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Initialize charts dengan data real
    initCharts();
  } catch (error) {
    console.error('Error initializing dashboard:', error);
  } finally {
    loading.value = false;
  }
});

// Methods
function initCharts() {
  try {
    initIncomeExpenseChart();
    initPurchaseChart();
    initStockChart();
    initUserActivityChart();
  } catch (error) {
    console.error('Error initializing charts:', error);
  }
}

function updateCharts() {
  initIncomeExpenseChart();
  initPurchaseChart();
  initUserActivityChart();
}

function initIncomeExpenseChart() {
  if (incomeExpenseChart.value) {
    const ctx = incomeExpenseChart.value.getContext('2d');
    
    if (incomeExpenseChartInstance) {
      incomeExpenseChartInstance.destroy();
    }
    
    // Generate data real dari transaksi
    const { labels, revenueData, expenseData } = getIncomeExpenseData();
    
    incomeExpenseChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Pemasukan',
            data: revenueData,
            backgroundColor: '#10B981',
            borderRadius: 6
          },
          {
            label: 'Pengeluaran',
            data: expenseData,
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
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
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
    });
  }
}

function getIncomeExpenseData() {
  const transactions = financialStore.transactions || [];
  const orders = menuStore.orders || [];
  
  let labels = [];
  let revenueData = [];
  let expenseData = [];
  
  const now = new Date();
  
  if (chartPeriod.value === 'monthly') {
    // Data 6 bulan terakhir
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('id-ID', { month: 'short' });
      labels.push(monthName);
      
      // Hitung pemasukan dari transaksi bulan ini
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthlyRevenue = transactions
        .filter(t => {
          if (!t.date) return false;
          const transDate = new Date(t.date);
          return transDate >= monthStart && transDate <= monthEnd;
        })
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      
      revenueData.push(monthlyRevenue);
      
      // Pengeluaran dummy (30% dari pemasukan untuk demo)
      expenseData.push(monthlyRevenue * 0.3);
    }
  } else if (chartPeriod.value === 'weekly') {
    // Data 4 minggu terakhir
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7));
      labels.push(`Minggu ${4 - i}`);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const weeklyRevenue = transactions
        .filter(t => {
          if (!t.date) return false;
          const transDate = new Date(t.date);
          return transDate >= weekStart && transDate <= weekEnd;
        })
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      
      revenueData.push(weeklyRevenue);
      expenseData.push(weeklyRevenue * 0.3);
    }
  } else {
    // Data 7 hari terakhir
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      labels.push(date.toLocaleDateString('id-ID', { weekday: 'short' }));
      
      const dayRevenue = transactions
        .filter(t => {
          if (!t.date) return false;
          const transDate = new Date(t.date);
          return transDate.toDateString() === date.toDateString();
        })
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      
      revenueData.push(dayRevenue);
      expenseData.push(dayRevenue * 0.3);
    }
  }
  
  return { labels, revenueData, expenseData };
}

function initPurchaseChart() {
  if (purchaseChart.value) {
    const ctx = purchaseChart.value.getContext('2d');
    
    if (purchaseChartInstance) {
      purchaseChartInstance.destroy();
    }
    
    const { labels, salesData } = getPurchaseData();
    
    purchaseChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Jumlah Penjualan',
            data: salesData,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw} transaksi`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
}

function getPurchaseData() {
  const transactions = financialStore.transactions || [];
  
  let labels = [];
  let salesData = [];
  
  const now = new Date();
  
  if (salesPeriod.value === 'monthly') {
    // Data 6 bulan terakhir
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('id-ID', { month: 'short' });
      labels.push(monthName);
      
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthlySales = transactions.filter(t => {
        if (!t.date) return false;
        const transDate = new Date(t.date);
        return transDate >= monthStart && transDate <= monthEnd;
      }).length;
      
      salesData.push(monthlySales);
    }
  } else if (salesPeriod.value === 'weekly') {
    // Data 4 minggu terakhir
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7));
      labels.push(`Minggu ${4 - i}`);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const weeklySales = transactions.filter(t => {
        if (!t.date) return false;
        const transDate = new Date(t.date);
        return transDate >= weekStart && transDate <= weekEnd;
      }).length;
      
      salesData.push(weeklySales);
    }
  } else {
    // Data 7 hari terakhir
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      labels.push(date.toLocaleDateString('id-ID', { weekday: 'short' }));
      
      const daySales = transactions.filter(t => {
        if (!t.date) return false;
        const transDate = new Date(t.date);
        return transDate.toDateString() === date.toDateString();
      }).length;
      
      salesData.push(daySales);
    }
  }
  
  return { labels, salesData };
}

function initStockChart() {
  if (stockChart.value && menuStore.menu?.length) {
    const ctx = stockChart.value.getContext('2d');
    
    if (stockChartInstance) {
      stockChartInstance.destroy();
    }
    
    // Group by category dengan data real
    const categories = {};
    const menuItems = menuStore.menu || [];
    
    menuItems.forEach(item => {
      const category = item.category || 'Lainnya';
      if (!categories[category]) {
        categories[category] = {
          stock: 0,
          items: 0
        };
      }
      categories[category].stock += item.stock || 0;
      categories[category].items += 1;
    });
    
    const categoryNames = Object.keys(categories);
    const stockData = categoryNames.map(cat => categories[cat].stock);
    const itemCounts = categoryNames.map(cat => categories[cat].items);
    
    // Warna untuk setiap kategori
    const colors = [
      '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', 
      '#EF4444', '#EC4899', '#14B8A6', '#F97316'
    ];
    
    if (categoryNames.length > 0) {
      stockChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: categoryNames.map((cat, i) => `${cat} (${itemCounts[i]} items)`),
          datasets: [
            {
              data: stockData,
              backgroundColor: categoryNames.map((_, i) => colors[i % colors.length])
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
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = stockData.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                  return `${label.split(' (')[0]}: ${value} unit (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  }
}

function initUserActivityChart() {
  if (userActivityChart.value) {
    const ctx = userActivityChart.value.getContext('2d');
    
    if (userActivityChartInstance) {
      userActivityChartInstance.destroy();
    }
    
    // Data aktivitas user dari transaksi dan orders
    const transactions = financialStore.transactions || [];
    const orders = menuStore.orders || [];
    
    // Hitung aktivitas berdasarkan periode
    const { loginCount, purchaseCount, viewCount, checkoutCount } = getUserActivityData();
    
    userActivityChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Login', 'Beli', 'Lihat Produk', 'Checkout'],
        datasets: [
          {
            data: [loginCount, purchaseCount, viewCount, checkoutCount],
            backgroundColor: [
              '#3B82F6',
              '#10B981',
              '#8B5CF6',
              '#F59E0B'
            ],
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
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = loginCount + purchaseCount + viewCount + checkoutCount;
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }
}

function getUserActivityData() {
  const transactions = financialStore.transactions || [];
  const now = new Date();
  let periodStart;
  
  if (activityPeriod.value === 'monthly') {
    periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (activityPeriod.value === 'weekly') {
    periodStart = new Date(now);
    periodStart.setDate(now.getDate() - 7);
  } else {
    periodStart = new Date(now);
    periodStart.setDate(now.getDate() - 1);
  }
  
  // Filter transaksi berdasarkan periode
  const periodTransactions = transactions.filter(t => {
    if (!t.date) return false;
    const transDate = new Date(t.date);
    return transDate >= periodStart;
  });
  
  // Generate data dummy berdasarkan transaksi
  const transactionCount = periodTransactions.length;
  
  return {
    loginCount: Math.floor(transactionCount * 2.5), // Login lebih banyak dari transaksi
    purchaseCount: transactionCount,
    viewCount: Math.floor(transactionCount * 4), // View produk lebih banyak
    checkoutCount: Math.floor(transactionCount * 0.8) // Checkout sedikit lebih sedikit dari transaksi
  };
}

function formatCurrency(amount) {
  const numAmount = Number(amount) || 0;
  return new Intl.NumberFormat('id-ID').format(numAmount);
}

// Cleanup
onUnmounted(() => {
  if (incomeExpenseChartInstance) incomeExpenseChartInstance.destroy();
  if (purchaseChartInstance) purchaseChartInstance.destroy();
  if (stockChartInstance) stockChartInstance.destroy();
  if (userActivityChartInstance) userActivityChartInstance.destroy();
});
</script>

<style scoped>
.router-link-active {
  @apply bg-green-700;
}
</style>