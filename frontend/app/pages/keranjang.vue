<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-24 pb-16 px-4 sm:px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Keranjang Belanja</h1>
          <p class="text-gray-600">Review pesanan Anda sebelum checkout</p>
        </div>
        <NuxtLink 
          to="/galeri" 
          class="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Lanjut Belanja
        </NuxtLink>
      </div>

      <!-- Cart Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <!-- Stock Warning -->
          <div v-if="stockWarning" class="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <div>
                <p class="font-semibold text-red-700">Stok tidak mencukupi!</p>
                <p class="text-red-600 text-sm">Beberapa item di keranjang melebihi stok yang tersedia.</p>
              </div>
            </div>
          </div>

          <!-- Empty Cart -->
          <div v-if="isEmpty" class="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div class="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">Keranjang Kosong</h3>
            <p class="text-gray-500 mb-6">Tambahkan beberapa item dari menu kami</p>
            <NuxtLink 
              to="/galeri"
              class="inline-block bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-all"
            >
              Lihat Menu
            </NuxtLink>
          </div>

          <!-- Cart Items List -->
          <div v-else class="space-y-4">
            <div 
              v-for="item in cart" 
              :key="item.id"
              class="bg-white rounded-3xl shadow-lg p-6 transition-all hover:shadow-xl"
            >
              <div class="flex flex-col sm:flex-row gap-4">
                <!-- Image -->
                <div class="w-24 h-24 flex-shrink-0">
                  <img 
                    :src="item.image" 
                    :alt="item.name"
                    class="w-full h-full object-cover rounded-xl"
                    @error="handleImageError"
                  />
                </div>

                <!-- Details -->
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="font-bold text-gray-900 text-lg">{{ item.name }}</h3>
                      <p class="text-emerald-600 font-semibold">Rp {{ formatPrice(item.price) }}</p>
                    </div>
                    <button 
                      @click="removeItem(item.id)"
                      class="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>

                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ item.description }}</p>

                  <!-- Stock Info -->
                  <div class="mb-4">
                    <div class="flex items-center gap-2 text-sm">
                      <span class="text-gray-500">Stok tersedia:</span>
                      <span :class="getStockClass(item.stock)" class="font-semibold">
                        {{ item.stock }} unit
                      </span>
                      <span v-if="item.quantity > item.stock" class="text-red-500 text-xs">
                        (Melebihi stok!)
                      </span>
                    </div>
                  </div>

                  <!-- Quantity Controls -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <button 
                        @click="decreaseQuantity(item.id)"
                        class="w-8 h-8 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                      </button>
                      <input 
                        type="number"
                        :value="item.quantity"
                        @change="updateQuantity(item, $event.target.value)"
                        :max="item.stock"
                        min="1"
                        class="w-16 text-center border border-gray-300 rounded-lg py-1"
                      />
                      <button 
                        @click="increaseQuantity(item.id)"
                        :disabled="item.quantity >= item.stock"
                        class="w-8 h-8 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-emerald-300 transition-all flex items-center justify-center"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </button>
                    </div>
                    <div class="text-right">
                      <p class="text-sm text-gray-500">Subtotal</p>
                      <p class="text-lg font-bold text-emerald-600">
                        Rp {{ formatPrice(item.price * item.quantity) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Clear Cart Button -->
            <div class="text-right">
              <button 
                @click="clearCart"
                class="text-red-500 hover:text-red-700 font-semibold flex items-center gap-2 ml-auto"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Kosongkan Keranjang
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h3>
            
            <!-- Order Details -->
            <div class="space-y-4 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Total Item</span>
                <span class="font-semibold">{{ totalItems }} item</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-semibold">Rp {{ formatPrice(totalPrice) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Pajak (10%)</span>
                <span class="font-semibold">Rp {{ formatPrice(tax) }}</span>
              </div>
              <div v-if="deliveryFee > 0" class="flex justify-between">
                <span class="text-gray-600">Biaya Pengiriman</span>
                <span class="font-semibold">Rp {{ formatPrice(deliveryFee) }}</span>
              </div>
              <div class="border-t pt-4">
                <div class="flex justify-between">
                  <span class="text-lg font-bold text-gray-900">Total</span>
                  <span class="text-2xl font-bold text-emerald-600">Rp {{ formatPrice(grandTotal) }}</span>
                </div>
              </div>
            </div>

            <!-- Checkout Button -->
            <button 
              @click="proceedCheckout"
              :disabled="isEmpty || stockWarning"
              class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              Lanjut ke Pembayaran
            </button>

            <!-- Payment Methods -->
            <div class="mt-6 pt-6 border-t">
              <p class="text-sm text-gray-500 mb-3">Metode Pembayaran:</p>
              <div class="grid grid-cols-3 gap-2">
                <div class="border rounded-lg p-2 text-center hover:border-emerald-500 cursor-pointer transition-colors">
                  <div class="text-xs text-gray-500">Cash</div>
                </div>
                <div class="border rounded-lg p-2 text-center hover:border-emerald-500 cursor-pointer transition-colors">
                  <div class="text-xs text-gray-500">QRIS</div>
                </div>
                <div class="border rounded-lg p-2 text-center hover:border-emerald-500 cursor-pointer transition-colors">
                  <div class="text-xs text-gray-500">Transfer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const cart = ref([])
const deliveryFee = ref(5000)
const loading = ref(false)

// Lifecycle
onMounted(() => {
  loadCart()
})

// Computed
const totalItems = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const tax = computed(() => {
  return totalPrice.value * 0.1
})

const grandTotal = computed(() => {
  return totalPrice.value + tax.value + deliveryFee.value
})

const stockWarning = computed(() => {
  if (cart.value.length === 0) return false
  
  for (const item of cart.value) {
    if (item.quantity > item.stock) {
      return true
    }
  }
  return false
})

const isEmpty = computed(() => {
  return cart.value.length === 0
})

// Methods
function loadCart() {
  if (typeof window !== 'undefined') {
    const cartData = localStorage.getItem('greenomi_cart')
    if (cartData) {
      cart.value = JSON.parse(cartData)
    }
  }
}

function saveCart() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('greenomi_cart', JSON.stringify(cart.value))
  }
}

function getStockClass(stock) {
  if (stock === 0) return 'text-red-500'
  if (stock <= 5) return 'text-amber-500'
  if (stock <= 15) return 'text-yellow-500'
  return 'text-emerald-500'
}

function formatPrice(price) {
  const numPrice = Number(price) || 0
  return numPrice.toLocaleString('id-ID')
}

function handleImageError(event) {
  event.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
}

function increaseQuantity(itemId) {
  const item = cart.value.find(item => item.id === itemId)
  if (item && item.quantity < item.stock) {
    item.quantity += 1
    saveCart()
    showNotification('Jumlah berhasil ditambah', 'success')
  }
}

function decreaseQuantity(itemId) {
  const item = cart.value.find(item => item.id === itemId)
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1
      saveCart()
      showNotification('Jumlah berhasil dikurangi', 'success')
    } else {
      removeItem(itemId)
    }
  }
}

function updateQuantity(item, newQuantity) {
  const quantity = parseInt(newQuantity)
  if (isNaN(quantity) || quantity < 1) {
    item.quantity = 1
  } else if (quantity > item.stock) {
    item.quantity = item.stock
    showNotification(`Stok maksimal ${item.stock} unit`, 'error')
  } else {
    item.quantity = quantity
  }
  saveCart()
}

function removeItem(itemId) {
  if (confirm('Hapus item dari keranjang?')) {
    cart.value = cart.value.filter(item => item.id !== itemId)
    saveCart()
    showNotification('Item dihapus dari keranjang', 'success')
  }
}

function clearCart() {
  if (confirm('Kosongkan seluruh keranjang?')) {
    cart.value = []
    saveCart()
    showNotification('Keranjang dikosongkan', 'success')
  }
}

async function proceedCheckout() {
  if (isEmpty.value) {
    showNotification('Keranjang kosong', 'error')
    return
  }

  if (stockWarning.value) {
    showNotification('Beberapa item melebihi stok yang tersedia', 'error')
    return
  }

  // Create pending order
  const orderData = {
    id: `ORD-${Date.now()}`,
    items: cart.value,
    summary: {
      subtotal: totalPrice.value,
      tax: tax.value,
      deliveryFee: deliveryFee.value,
      total: grandTotal.value
    },
    date: new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    createdAt: new Date().toISOString(),
    status: 'pending'
  }

  // Save pending order to localStorage
  localStorage.setItem('pending_order', JSON.stringify(orderData))
  
  // Navigate to payment page
  window.location.href = '/pembayaran'
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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

/* Custom number input */
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>