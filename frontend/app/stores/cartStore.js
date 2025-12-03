// stores/useCartStore.js
export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    menuStore: null
  }),

  actions: {
    setMenuStore(store) {
      this.menuStore = store
    },

    addToCart(item) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        // Check stock availability
        const menuItem = this.menuStore?.menu.find(m => m.id === item.id)
        if (menuItem && existingItem.quantity >= menuItem.stock) {
          return {
            success: false,
            message: 'Stok tidak mencukupi'
          }
        }
        existingItem.quantity += 1
      } else {
        this.cart.push({
          ...item,
          quantity: 1
        })
      }
      
      this.saveCart()
      return {
        success: true,
        message: 'Item ditambahkan ke keranjang'
      }
    },

    removeFromCart(itemId) {
      this.cart = this.cart.filter(item => item.id !== itemId)
      this.saveCart()
    },

    updateQuantity(itemId, quantity) {
      const item = this.cart.find(item => item.id === itemId)
      const menuItem = this.menuStore?.menu.find(m => m.id === itemId)
      
      if (item && menuItem) {
        if (quantity > menuItem.stock) {
          return {
            success: false,
            message: `Stok hanya tersedia ${menuItem.stock} unit`
          }
        }
        
        if (quantity < 1) {
          this.removeFromCart(itemId)
          return {
            success: true,
            message: 'Item dihapus dari keranjang'
          }
        }
        
        item.quantity = quantity
        this.saveCart()
        return {
          success: true,
          message: 'Jumlah berhasil diupdate'
        }
      }
      return {
        success: false,
        message: 'Item tidak ditemukan'
      }
    },

    increaseQuantity(itemId) {
      return this.updateQuantity(itemId, this.getItemQuantity(itemId) + 1)
    },

    decreaseQuantity(itemId) {
      return this.updateQuantity(itemId, this.getItemQuantity(itemId) - 1)
    },

    clearCart() {
      this.cart = []
      this.saveCart()
    },

    completeOrder(orderData) {
      if (this.menuStore) {
        // Add order to menu store
        const order = this.menuStore.addOrder({
          items: this.cart,
          total: this.totalPrice,
          customerName: orderData.customerName,
          customerEmail: orderData.customerEmail,
          shippingAddress: orderData.shippingAddress,
          paymentMethod: orderData.paymentMethod
        })
        
        // Clear cart
        this.clearCart()
        
        return {
          success: true,
          orderId: order.id,
          message: 'Pesanan berhasil dibuat'
        }
      }
      return {
        success: false,
        message: 'Gagal memproses pesanan'
      }
    },

    validateCartStock() {
      const items = []
      let valid = true
      
      for (const cartItem of this.cart) {
        const menuItem = this.menuStore?.menu.find(m => m.id === cartItem.id)
        if (menuItem && cartItem.quantity > menuItem.stock) {
          items.push({
            name: menuItem.name,
            quantityInCart: cartItem.quantity,
            availableStock: menuItem.stock
          })
          valid = false
        }
      }
      
      return {
        valid,
        items
      }
    },

    saveCart() {
      localStorage.setItem('greenomi_cart', JSON.stringify(this.cart))
    },

    loadCart() {
      const savedCart = localStorage.getItem('greenomi_cart')
      if (savedCart) {
        this.cart = JSON.parse(savedCart)
      }
    },

    getItemQuantity(itemId) {
      const item = this.cart.find(item => item.id === itemId)
      return item ? item.quantity : 0
    }
  },

  getters: {
    isEmpty: (state) => state.cart.length === 0,
    totalItems: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    cartItems: (state) => state.cart
  }
})