import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const addToCart = (item) => {
    const existing = cart.value.find(i => i.id === item.id)
    if(existing) existing.qty++
    else cart.value.push({ ...item, qty: 1 })
  }

  const removeFromCart = (id) => {
    cart.value = cart.value.filter(i => i.id !== id)
  }

  const updateQty = (id, qty) => {
    const item = cart.value.find(i => i.id === id)
    if(item) item.qty = qty < 1 ? 1 : qty
  }

  const clearCart = () => cart.value = []

  const totalPrice = () => cart.value.reduce((sum, i) => sum + i.price * i.qty, 0)

  return { cart, addToCart, removeFromCart, updateQty, clearCart, totalPrice }
})
