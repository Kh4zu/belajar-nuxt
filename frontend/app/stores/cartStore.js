import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  
  // Load cart dari localStorage berdasarkan user
  const loadCart = () => {
    const user = JSON.parse(localStorage.getItem('current_user') || '{}')
    let storedCart = []
    
    if (user.id) {
      // Coba load cart spesifik user
      const userCart = localStorage.getItem(`cart_${user.id}`)
      storedCart = userCart ? JSON.parse(userCart) : []
    } else {
      // Fallback ke cart global (untuk kompatibilitas)
      const globalCart = localStorage.getItem('cart')
      storedCart = globalCart ? JSON.parse(globalCart) : []
    }
    
    cart.value = storedCart
  }
  
  // Save cart ke localStorage berdasarkan user
  const saveCart = () => {
    const user = JSON.parse(localStorage.getItem('current_user') || '{}')
    if (user.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart.value))
    }
    // Simpan juga ke cart global untuk kompatibilitas
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }
  
  // Panggil loadCart saat store diinisialisasi
  loadCart()
  
  // Fungsi untuk menambah item ke keranjang
  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.qty += 1
    } else {
      cart.value.push({
        ...product,
        qty: 1
      })
    }
    
    saveCart()
  }
  
  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (id) => {
    cart.value = cart.value.filter(item => item.id !== id)
    saveCart()
  }
  
  // Fungsi untuk update quantity
  const updateQty = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id)
      return
    }
    
    const item = cart.value.find(item => item.id === id)
    if (item) {
      item.qty = qty
      saveCart()
    }
  }
  
  // Fungsi untuk clear cart
  const clearCart = () => {
    cart.value = []
    saveCart()
  }
  
  // Fungsi untuk menghitung total harga
  const totalPrice = () => {
    return cart.value.reduce((total, item) => total + (item.price * item.qty), 0)
  }
  
  return {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    totalPrice,
    loadCart,
    saveCart
  }
})