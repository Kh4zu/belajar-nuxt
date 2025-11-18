import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const menu = ref([
    { id: 1, src: '/panas.jpg', title: 'Teh Hijau Asli', desc: 'Teh hijau murni dengan aroma alami dan rasa segar.', price: 15000 },
    { id: 2, src: '/meelati.jpg', title: 'Teh Melati', desc: 'Kombinasi teh hijau dan bunga melati.', price: 18000 },
    { id: 3, src: '/maduu.jpg', title: 'Teh Madu', desc: 'Teh hijau dengan madu alami.', price: 20000 }
  ])

  const addItem = (item) => {
    item.id = Date.now()
    menu.value.push({ ...item })
  }

  const updateItem = (id, updated) => {
    const index = menu.value.findIndex(i => i.id === id)
    if (index !== -1) menu.value[index] = { ...menu.value[index], ...updated }
  }

  const deleteItem = (id) => {
    menu.value = menu.value.filter(i => i.id !== id)
  }

  return { menu, addItem, updateItem, deleteItem }
})
