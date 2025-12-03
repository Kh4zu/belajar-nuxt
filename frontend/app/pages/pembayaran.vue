<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-24 pb-16 px-4 sm:px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
          <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Data Pembayaran
          </span>
        </h1>
        <p class="text-xl text-gray-600">Lengkapi data pengiriman Anda</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Data Pengiriman -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-3xl shadow-lg p-8 border border-emerald-100">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Data Pengiriman</h3>
            
            <form @submit.prevent="processOrder" class="space-y-6">
              <!-- Nama -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.nama"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Masukkan nama lengkap"
                >
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="email@contoh.com"
                >
              </div>

              <!-- Telepon -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.telepon"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="0812 3456 7890"
                >
              </div>

              <!-- Alamat -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap <span class="text-red-500">*</span>
                </label>
                <textarea 
                  v-model="form.alamat"
                  required
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Masukkan alamat lengkap termasuk RT/RW, Kecamatan, Kota"
                ></textarea>
              </div>

              <!-- Catatan -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Catatan (Opsional)
                </label>
                <textarea 
                  v-model="form.catatan"
                  rows="2"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Catatan untuk penjual atau kurir"
                ></textarea>
              </div>

              <div class="pt-4">
                <button 
                  type="submit"
                  :disabled="loading || !orderData"
                  class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span v-else>Lanjut ke Metode Pembayaran</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h3>
            
            <div v-if="orderData" class="space-y-4">
              <!-- Items List -->
              <div class="max-h-60 overflow-y-auto pr-2">
                <div 
                  v-for="(item, index) in orderData.items" 
                  :key="index" 
                  class="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
                >
                  <img 
                    :src="item.image" 
                    :alt="item.name" 
                    class="w-12 h-12 rounded-lg object-cover"
                    @error="handleImageError"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm truncate">{{ item.name }}</p>
                    <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
                  </div>
                  <span class="font-semibold text-sm whitespace-nowrap">
                    Rp {{ formatPrice(item.price * item.quantity) }}
                  </span>
                </div>
              </div>

              <!-- Summary -->
              <div class="space-y-3 pt-4 border-t">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-semibold">Rp {{ formatPrice(orderData.summary.subtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Pajak (10%)</span>
                  <span class="font-semibold">Rp {{ formatPrice(orderData.summary.tax) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Pengiriman</span>
                  <span class="font-semibold">Rp {{ formatPrice(orderData.summary.deliveryFee) }}</span>
                </div>
                <div class="flex justify-between pt-3 border-t">
                  <span class="text-lg font-bold text-gray-900">Total</span>
                  <span class="text-xl font-bold text-emerald-600">
                    Rp {{ formatPrice(orderData.summary.total) }}
                  </span>
                </div>
              </div>

              <!-- Order Info -->
              <div class="pt-4 border-t">
                <div class="text-sm text-gray-600 space-y-2">
                  <div class="flex justify-between">
                    <span>ID Pesanan:</span>
                    <span class="font-mono font-semibold">{{ orderData.id }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Tanggal:</span>
                    <span>{{ orderData.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-8">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="text-gray-500 text-sm">Tidak ada pesanan</p>
              <NuxtLink 
                to="/keranjang"
                class="inline-block mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-semibold"
              >
                Kembali ke Keranjang
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// State
const orderData = ref(null)
const loading = ref(false)

const form = ref({
  nama: '',
  email: '',
  telepon: '',
  alamat: '',
  catatan: ''
})

// Lifecycle
onMounted(() => {
  // Ambil data dari localStorage
  const pendingOrder = localStorage.getItem('pending_order')
  if (pendingOrder) {
    orderData.value = JSON.parse(pendingOrder)
    
    // Coba ambil data user dari localStorage jika ada
    const userData = localStorage.getItem('user_data')
    if (userData) {
      const user = JSON.parse(userData)
      form.value.nama = user.nama || ''
      form.value.email = user.email || ''
      form.value.telepon = user.telepon || ''
    }
  } else {
    // Jika tidak ada data, redirect ke keranjang
    window.location.href = '/keranjang'
  }
})

// Methods
function formatPrice(price) {
  const numPrice = Number(price) || 0
  return numPrice.toLocaleString('id-ID')
}

function handleImageError(event) {
  event.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w-400&h-300&fit-crop'
}

async function processOrder() {
  try {
    loading.value = true
    
    // Validasi form
    if (!form.value.nama || !form.value.email || !form.value.telepon || !form.value.alamat) {
      showNotification('Harap isi semua field yang wajib diisi', 'error')
      return
    }

    // Simpan data pengiriman ke orderData
    const completeOrder = {
      ...orderData.value,
      shipping: {
        ...form.value
      },
      status: 'waiting_payment',
      createdAt: new Date().toISOString()
    }

    // Simpan ke localStorage untuk halaman payment gateway
    localStorage.setItem('checkout_data', JSON.stringify(completeOrder))
    
    // Clear pending order dari localStorage
    localStorage.removeItem('pending_order')
    
    // Redirect ke payment gateway
    setTimeout(() => {
      window.location.href = '/payment-gateway'
    }, 1000)
    
  } catch (error) {
    console.error('Order processing error:', error)
    showNotification('Gagal memproses pesanan', 'error')
  } finally {
    loading.value = false
  }
}

function showNotification(message, type = 'info') {
  if (typeof window !== 'undefined') {
    const notification = document.createElement('div')
    const bgColor = type === 'success' ? 'bg-emerald-500' : 
                    type === 'error' ? 'bg-red-500' : 
                    type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
    
    notification.className = `fixed top-20 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} text-white px-6 py-3 rounded-2xl shadow-lg animate-slide-in max-w-sm`
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
            type === 'success' ? 'M5 13l4 4L19 7' :
            type === 'error' ? 'M6 18L18 6M6 6l12 12' :
            'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z'
          }"></path>
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
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>