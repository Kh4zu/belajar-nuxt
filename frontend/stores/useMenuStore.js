import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menu: [
      {
        id: 1,
        title: 'Teh Hijau',
        desc: 'Minuman segar teh hijau',
        price: 12000,
        stock: 10,
        src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187'
      }
    ]
  }),

  actions: {
    addItem(newItem) {
      newItem.id = Date.now()
      this.menu.push(newItem)
    },

    updateItem(id, updated) {
      const index = this.menu.findIndex(m => m.id === id)
      if (index !== -1) {
        this.menu[index] = { ...this.menu[index], ...updated }
      }
    },

    deleteItem(id) {
      this.menu = this.menu.filter(m => m.id !== id)
    }
  }
})
