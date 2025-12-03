<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-24 pb-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Progress Steps -->
      <div class="mb-12">
        <div class="flex items-center justify-center">
          <div class="flex items-center">
            <!-- Step 1 -->
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div class="ml-3">
                <p class="text-sm font-semibold text-emerald-500">Keranjang</p>
              </div>
            </div>
            
            <div class="w-16 h-1 bg-emerald-300 mx-4"></div>
            
            <!-- Step 2 -->
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div class="ml-3">
                <p class="text-sm font-semibold text-emerald-500">Pengiriman</p>
              </div>
            </div>
            
            <div class="w-16 h-1 bg-emerald-300 mx-4"></div>
            
            <!-- Step 3 -->
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div class="ml-3">
                <p class="text-sm font-semibold text-emerald-500">Pembayaran</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
          <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Pilih Metode Pembayaran
          </span>
        </h1>
        <p class="text-xl text-gray-600">Pilih cara pembayaran yang paling nyaman untuk Anda</p>
      </div>

      <div v-if="orderData" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Payment Methods -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-3xl shadow-lg p-8 border border-emerald-100">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Metode Pembayaran</h3>
            
            <div class="space-y-4">
              <!-- Transfer Bank -->
              <label class="block cursor-pointer">
                <input 
                  type="radio" 
                  v-model="paymentMethod" 
                  value="bank_transfer" 
                  class="sr-only peer"
                />
                <div class="p-6 border-2 border-gray-200 rounded-2xl peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all hover:border-emerald-300">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-900">Transfer Bank</h4>
                        <p class="text-sm text-gray-500 mt-1">BCA, Mandiri, BRI, BNI</p>
                      </div>
                    </div>
                    <div class="flex gap-1">
                      <div class="w-8 h-5 bg-blue-500 rounded-sm"></div>
                      <div class="w-8 h-5 bg-red-500 rounded-sm"></div>
                      <div class="w-8 h-5 bg-green-500 rounded-sm"></div>
                    </div>
                  </div>
                  
                  <!-- Bank Details (Visible when selected) -->
                  <div v-if="paymentMethod === 'bank_transfer'" class="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="bg-gray-50 p-4 rounded-xl">
                        <p class="text-sm text-gray-500 mb-1">BCA</p>
                        <p class="font-mono font-bold text-lg">123 456 7890</p>
                        <p class="text-sm text-gray-600">a.n. Greenomi Store</p>
                      </div>
                      <div class="bg-gray-50 p-4 rounded-xl">
                        <p class="text-sm text-gray-500 mb-1">Mandiri</p>
                        <p class="font-mono font-bold text-lg">098 765 4321</p>
                        <p class="text-sm text-gray-600">a.n. Greenomi Store</p>
                      </div>
                    </div>
                    <p class="text-sm text-gray-500 mt-4">
                      * Upload bukti transfer setelah melakukan pembayaran
                    </p>
                  </div>
                </div>
              </label>

              <!-- E-Wallet -->
              <label class="block cursor-pointer">
                <input 
                  type="radio" 
                  v-model="paymentMethod" 
                  value="e_wallet" 
                  class="sr-only peer"
                />
                <div class="p-6 border-2 border-gray-200 rounded-2xl peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all hover:border-emerald-300">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-900">E-Wallet</h4>
                        <p class="text-sm text-gray-500 mt-1">Dana, OVO, Gopay, ShopeePay</p>
                      </div>
                    </div>
                    <div class="flex gap-1">
                      <div class="w-8 h-5 bg-blue-400 rounded-sm"></div>
                      <div class="w-8 h-5 bg-purple-500 rounded-sm"></div>
                      <div class="w-8 h-5 bg-green-400 rounded-sm"></div>
                    </div>
                  </div>
                  
                  <!-- E-Wallet Details -->
                  <div v-if="paymentMethod === 'e_wallet'" class="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button 
                        v-for="wallet in ['Dana', 'OVO', 'Gopay', 'ShopeePay']" 
                        :key="wallet"
                        @click.prevent="selectedWallet = wallet"
                        :class="[
                          'p-3 border rounded-xl text-center transition-all',
                          selectedWallet === wallet 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-200 hover:border-emerald-300'
                        ]"
                      >
                        <div class="font-semibold text-sm">{{ wallet }}</div>
                      </button>
                    </div>
                    <p class="text-sm text-gray-500 mt-4">
                      * Scan QR code akan muncul setelah memilih e-wallet
                    </p>
                  </div>
                </div>
              </label>

              <!-- COD -->
              <label class="block cursor-pointer">
                <input 
                  type="radio" 
                  v-model="paymentMethod" 
                  value="cod" 
                  class="sr-only peer"
                />
                <div class="p-6 border-2 border-gray-200 rounded-2xl peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all hover:border-emerald-300">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-900">Bayar di Tempat (COD)</h4>
                        <p class="text-sm text-gray-500 mt-1">Bayar ketika pesanan diterima</p>
                      </div>
                    </div>
                    <div class="w-8 h-5 bg-orange-500 rounded-sm"></div>
                  </div>
                  
                  <!-- COD Details -->
                  <div v-if="paymentMethod === 'cod'" class="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
                    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div class="text-sm text-amber-700">
                          <p class="font-semibold">Perhatian!</p>
                          <p class="mt-1">Untuk pembayaran COD, pastikan Anda akan berada di alamat yang diberikan saat pengantaran. Biaya tambahan Rp 5.000 berlaku untuk layanan ini.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <!-- Payment Button -->
            <div class="mt-8 pt-8 border-t border-gray-200">
              <button 
                @click="processPayment"
                :disabled="!paymentMethod || loading"
                class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-else>
                  {{ paymentMethod === 'cod' ? 'Konfirmasi Pesanan' : 'Bayar Sekarang' }}
                </span>
              </button>
              
              <p class="text-center text-sm text-gray-500 mt-4">
                Dengan melanjutkan, Anda menyetujui 
                <NuxtLink to="/terms" class="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Syarat & Ketentuan
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h3>
            
            <div class="space-y-4 mb-6">
              <!-- Order Info -->
              <div class="bg-emerald-50 rounded-xl p-4 mb-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">ID Pesanan</span>
                  <span class="font-mono font-bold text-emerald-700">{{ orderData.id }}</span>
                </div>
                <div class="text-sm text-gray-600">
                  <div class="flex justify-between mb-1">
                    <span>Tanggal:</span>
                    <span>{{ orderData.date }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Status:</span>
                    <span class="font-semibold text-amber-500">Menunggu Pembayaran</span>
                  </div>
                </div>
              </div>

              <!-- Shipping Info -->
              <div class="border-t pt-4">
                <h4 class="font-semibold text-gray-900 mb-2">Pengiriman ke:</h4>
                <div class="text-sm text-gray-600 space-y-1">
                  <p class="font-semibold">{{ orderData.shipping.nama }}</p>
                  <p>{{ orderData.shipping.telepon }}</p>
                  <p class="text-xs">{{ orderData.shipping.alamat }}</p>
                </div>
              </div>

              <!-- Order Total -->
              <div class="border-t pt-4">
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Subtotal</span>
                    <span>Rp {{ formatPrice(orderData.summary.subtotal) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Pajak (10%)</span>
                    <span>Rp {{ formatPrice(orderData.summary.tax) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Pengiriman</span>
                    <span>Rp {{ formatPrice(orderData.summary.deliveryFee) }}</span>
                  </div>
                  <div class="flex justify-between pt-3 border-t">
                    <span class="text-lg font-bold text-gray-900">Total</span>
                    <span class="text-xl font-bold text-emerald-600">
                      Rp {{ formatPrice(orderData.summary.total) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Support -->
            <div class="border-t pt-6">
              <div class="text-center">
                <p class="text-sm text-gray-500 mb-2">Butuh bantuan?</p>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank"
                  class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22.05l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm5.25 13.91c-.25.7-1.45 1.38-2.03 1.38-.57 0-1.38-.33-2.45-.99-1.67-1.14-2.79-2.95-3.45-4.16-.42-.77-.12-1.17.33-1.75.25-.33.57-.41.91-.41.25 0 .5.08.66.08.25 0 .33-.16.5-.16.17 0 .33.08.5.33.17.25.66.91.74 1.05.08.16.16.25.25.41.08.17.08.33-.08.5-.17.25-.33.5-.5.66-.17.17-.33.33-.25.5.08.17.33.74.74 1.25.5.57 1.05.66 1.25.74.17.08.33.08.41-.08.08-.08.33-.25.66-.5.25-.25.5-.33.66-.33.17 0 .33.08.5.25.17.17.66.82.82 1 .17.17.33.25.5.41z"/>
                  </svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-600 mb-4">Data tidak ditemukan</h3>
        <p class="text-gray-500 mb-8">Silakan mulai dari keranjang belanja Anda</p>
        <div class="flex gap-4 justify-center">
          <NuxtLink 
            to="/keranjang"
            class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all"
          >
            Kembali ke Keranjang
          </NuxtLink>
          <NuxtLink 
            to="/galeri"
            class="bg-white text-emerald-600 border border-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all"
          >
            Lihat Menu
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden text-center animate-scale-in">
        <div class="p-8">
          <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil! 🎉</h3>
          <div class="bg-emerald-50 rounded-xl p-4 mb-6">
            <p class="font-mono font-bold text-emerald-700 text-lg">{{ orderData.id }}</p>
            <p class="text-sm text-gray-600 mt-1">ID Pesanan</p>
          </div>
          <p class="text-gray-600 mb-6">
            Terima kasih, <strong>{{ orderData.shipping.nama }}</strong>!<br>
            Pesanan Anda akan segera diproses.
          </p>
          <div class="space-y-3">
            <button 
              @click="goToHome"
              class="w-full bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all"
            >
              Kembali ke Beranda
            </button>
            <button 
              @click="printInvoice"
              class="w-full bg-white text-emerald-600 border border-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all"
            >
              Cetak Invoice
            </button>
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
const paymentMethod = ref('')
const selectedWallet = ref('')
const loading = ref(false)
const showSuccessModal = ref(false)

// Lifecycle
onMounted(() => {
  // Ambil data dari localStorage
  const checkoutData = localStorage.getItem('checkout_data')
  if (checkoutData) {
    orderData.value = JSON.parse(checkoutData)
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

async function processPayment() {
  if (!paymentMethod.value) {
    showNotification('Pilih metode pembayaran terlebih dahulu', 'error')
    return
  }

  try {
    loading.value = true
    
    // Update order data dengan metode pembayaran
    const completeOrder = {
      ...orderData.value,
      payment: {
        method: paymentMethod.value,
        wallet: selectedWallet.value || null,
        status: 'paid',
        paidAt: new Date().toISOString()
      },
      status: 'processing'
    }

    // Update stock in menu
    updateStock(completeOrder.items)
    
    // Simpan transaksi ke financial records
    saveTransaction(completeOrder)
    
    // Simpan order ke history
    saveOrder(completeOrder)
    
    // Clear cart
    localStorage.removeItem('greenomi_cart')
    
    // Clear checkout data
    localStorage.removeItem('checkout_data')
    
    // Show success modal
    showSuccessModal.value = true
    
  } catch (error) {
    console.error('Payment error:', error)
    showNotification('Gagal memproses pembayaran', 'error')
  } finally {
    loading.value = false
  }
}

function updateStock(items) {
  // Load current menu
  const currentMenu = JSON.parse(localStorage.getItem('greenomi_menu') || '[]')
  
  items.forEach(cartItem => {
    const menuItem = currentMenu.find(item => item.id === cartItem.id)
    if (menuItem) {
      menuItem.stock -= cartItem.quantity
      menuItem.salesCount = (menuItem.salesCount || 0) + cartItem.quantity
    }
  })
  
  // Save updated menu
  localStorage.setItem('greenomi_menu', JSON.stringify(currentMenu))
}

function saveTransaction(order) {
  const transaction = {
    id: `TRX-${Date.now()}`,
    date: new Date().toISOString(),
    amount: order.summary.total,
    customer: order.shipping.nama,
    items: order.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      subtotal: item.price * item.quantity
    })),
    status: 'completed',
    paymentMethod: order.payment.method
  }
  
  // Save to transactions
  const transactions = JSON.parse(localStorage.getItem('financial_transactions') || '[]')
  transactions.push(transaction)
  localStorage.setItem('financial_transactions', JSON.stringify(transactions))
}

function saveOrder(order) {
  // Save to order history
  const orders = JSON.parse(localStorage.getItem('greenomi_orders') || '[]')
  orders.push(order)
  localStorage.setItem('greenomi_orders', JSON.stringify(orders))
  
  // Save last order for display
  localStorage.setItem('last_order', JSON.stringify(order))
}

function goToHome() {
  window.location.href = '/'
}

function printInvoice() {
  const printWindow = window.open('', '_blank')
  const order = orderData.value
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice ${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
          .invoice-header { text-align: center; margin-bottom: 30px; }
          .invoice-title { font-size: 24px; font-weight: bold; color: #047857; }
          .invoice-details { margin-bottom: 20px; }
          .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .invoice-table th, .invoice-table td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          .invoice-table th { background-color: #f3f4f6; }
          .invoice-total { text-align: right; font-size: 18px; font-weight: bold; }
          .invoice-footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <h1 class="invoice-title">GREENOMI STORE</h1>
          <p>Jl. Contoh No. 123, Jakarta</p>
          <p>Telp: 021-1234567 | Email: info@greenomi.com</p>
        </div>
        
        <div class="invoice-details">
          <h2>INVOICE: ${order.id}</h2>
          <p>Tanggal: ${new Date().toLocaleDateString('id-ID')}</p>
          <p>Pelanggan: ${order.shipping.nama}</p>
          <p>Email: ${order.shipping.email}</p>
          <p>Telepon: ${order.shipping.telepon}</p>
        </div>
        
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Qty</th>
              <th>Harga</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rp ${formatPrice(item.price)}</td>
                <td>Rp ${formatPrice(item.price * item.quantity)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="invoice-total">
          <p>Subtotal: Rp ${formatPrice(order.summary.subtotal)}</p>
          <p>Pajak (10%): Rp ${formatPrice(order.summary.tax)}</p>
          <p>Pengiriman: Rp ${formatPrice(order.summary.deliveryFee)}</p>
          <h3>Total: Rp ${formatPrice(order.summary.total)}</h3>
        </div>
        
        <div class="invoice-footer">
          <p>Terima kasih telah berbelanja di Greenomi Store</p>
          <p>Invoice ini sah sebagai bukti pembayaran</p>
        </div>
        
        <button onclick="window.print()" style="padding: 10px 20px; background: #047857; color: white; border: none; cursor: pointer; margin-top: 20px;">
          Cetak Invoice
        </button>
      </body>
    </html>
  `)
  
  printWindow.document.close()
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

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>