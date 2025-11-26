import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),

  actions: {
    addToCart(item) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cart.push({ ...item, quantity: 1 })
      }
    },

    removeFromCart(id) {
      this.cart = this.cart.filter(item => item.id !== id)
    },

    updateQuantity(id, quantity) {
      const item = this.cart.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          this.removeFromCart(id)
        }
      }
    },

    clearCart() {
      this.cart = []
    }
  },

  getters: {
    totalItems: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    
    totalPrice: (state) => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  }
})