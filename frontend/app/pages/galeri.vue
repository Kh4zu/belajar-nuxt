<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
    <!-- Header -->
    <div class="pt-24 pb-12 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
            <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Menu Kami
            </span>
          </h1>
          <p class="text-xl text-gray-600">Pilihan terbaik dari dapur kami untuk Anda</p>
        </div>

        <!-- Filter -->
        <div class="flex flex-wrap gap-3 justify-center mb-8">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="toggleCategory(category)"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all"
            :class="activeCategories.includes(category) 
              ? 'bg-emerald-500 text-white shadow-lg' 
              : 'bg-white text-gray-700 shadow hover:shadow-md'"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Grid -->
    <div class="px-4 sm:px-6 pb-16">
      <div class="max-w-7xl mx-auto">
        <!-- Empty State -->
        <div v-if="filteredMenu.length === 0" class="text-center py-12">
          <div class="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Menu Tidak Ditemukan</h3>
          <p class="text-gray-500">Coba pilih kategori lain</p>
        </div>

        <!-- Menu Items -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="item in filteredMenu" 
            :key="item.id"
            class="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="item.image" 
                :alt="item.name"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                @error="handleImageError"
              />
              
              <!-- Badges -->
              <div class="absolute top-3 left-3 flex gap-2">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-700">
                  {{ item.category }}
                </span>
                <span v-if="item.stock === 0" class="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                  Habis
                </span>
                <span v-else-if="item.stock <= item.minStock" class="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-semibold">
                  Terbatas
                </span>
              </div>
              
              <!-- Popular Badge -->
              <div v-if="item.popularity > 90" class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Terlaris
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <h3 class="font-bold text-gray-900 text-lg mb-1">{{ item.name }}</h3>
                  <p class="text-emerald-600 font-semibold">Rp {{ formatPrice(item.price) }}</p>
                </div>
                <span class="text-sm text-gray-500">{{ item.salesCount || 0 }} terjual</span>
              </div>

              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ item.description }}</p>

              <!-- Stock Info -->
              <div class="mb-4">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Stok tersedia:</span>
                  <span :class="getStockClass(item.stock)" class="font-semibold">
                    {{ item.stock }} unit
                  </span>
                </div>
                <div v-if="item.stock > 0 && item.stock <= item.minStock" class="text-amber-600 text-xs mt-1">
                  ⚠️ Stok terbatas, segera pesan!
                </div>
              </div>

              <!-- Ingredients -->
              <div class="mb-6">
                <p class="text-gray-500 text-sm mb-2">Bahan utama:</p>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="(ingredient, index) in (item.ingredients || []).slice(0, 3)" 
                    :key="index"
                    class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {{ ingredient }}
                  </span>
                  <span v-if="(item.ingredients || []).length > 3" class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    +{{ (item.ingredients || []).length - 3 }} lainnya
                  </span>
                </div>
              </div>

              <!-- Add to Cart Button -->
              <button 
                @click="addToCart(item)"
                :disabled="item.stock === 0"
                class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                :class="item.stock === 0 
                  ? 'bg-gray-200 text-gray-500' 
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                {{ item.stock === 0 ? 'Stok Habis' : 'Tambahkan ke Keranjang' }}
              </button>
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
const activeCategories = ref([])
const menuItems = ref([])

// Load menu from localStorage
onMounted(() => {
  loadMenuData()
})

const loadMenuData = () => {
  if (typeof window !== 'undefined') {
    const savedMenu = localStorage.getItem('greenomi_menu')
    if (savedMenu) {
      menuItems.value = JSON.parse(savedMenu)
    } else {
      // Default menu items
      menuItems.value = [
        {
          id: '1',
          name: 'Nasi Goreng Spesial',
          category: 'Makanan Utama',
          price: 35000,
          stock: 25,
          minStock: 10,
          description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
          ingredients: ['Nasi', 'Telur', 'Ayam', 'Sayuran', 'Bumbu Khas'],
          popularity: 95,
          salesCount: 42
        },
        {
          id: '2',
          name: 'Es Teh Manis',
          category: 'Minuman',
          price: 15000,
          stock: 50,
          minStock: 20,
          description: 'Es teh segar dengan gula pasir pilihan',
          image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=300&fit=crop',
          ingredients: ['Teh', 'Gula', 'Es Batu', 'Lemon'],
          popularity: 88,
          salesCount: 38
        },
        {
          id: '3',
          name: 'Pisang Goreng',
          category: 'Snack',
          price: 20000,
          stock: 30,
          minStock: 15,
          description: 'Pisang goreng renyah dengan taburan keju',
          image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
          ingredients: ['Pisang', 'Tepung', 'Keju', 'Minyak Goreng'],
          popularity: 92,
          salesCount: 25
        }
      ]
    }
  }
}

// Computed
const categories = computed(() => {
  const allCategories = menuItems.value.map(item => item.category).filter(Boolean)
  return [...new Set(allCategories)]
})

const filteredMenu = computed(() => {
  let filtered = menuItems.value.filter(item => item.stock > 0)
  
  // Filter by active categories
  if (activeCategories.value.length > 0) {
    filtered = filtered.filter(item => 
      activeCategories.value.includes(item.category)
    )
  }
  
  return filtered
})

// Methods
const toggleCategory = (category) => {
  const index = activeCategories.value.indexOf(category)
  if (index > -1) {
    activeCategories.value.splice(index, 1)
  } else {
    activeCategories.value.push(category)
  }
}

const formatPrice = (price) => {
  const numPrice = Number(price) || 0
  return numPrice.toLocaleString('id-ID')
}

const getStockClass = (stock) => {
  if (stock === 0) return 'text-red-500'
  if (stock <= 5) return 'text-amber-500'
  if (stock <= 15) return 'text-yellow-500'
  return 'text-emerald-500'
}

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
}

const addToCart = (item) => {
  if (item.stock === 0) {
    showNotification('Maaf, stok item ini habis', 'error')
    return
  }
  
  // Load existing cart
  const cart = JSON.parse(localStorage.getItem('greenomi_cart') || '[]')
  
  // Check if item already in cart
  const existingItem = cart.find(cartItem => cartItem.id === item.id)
  
  if (existingItem) {
    // Check if adding more exceeds stock
    if (existingItem.quantity >= item.stock) {
      showNotification(`Stok hanya tersedia ${item.stock} unit`, 'error')
      return
    }
    existingItem.quantity += 1
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      category: item.category,
      quantity: 1,
      stock: item.stock
    })
  }
  
  // Save cart
  localStorage.setItem('greenomi_cart', JSON.stringify(cart))
  
  showNotification(`${item.name} ditambahkan ke keranjang`, 'success')
  
  // Navigate to cart page after a delay
  setTimeout(() => {
    navigateTo('/keranjang')
  }, 1500)
}

const showNotification = (message, type = 'info') => {
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

const navigateTo = (path) => {
  window.location.href = path
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
</style>