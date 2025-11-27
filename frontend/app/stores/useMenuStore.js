import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menu: [
      {
        id: '1',
        name: 'Nasi Goreng Spesial',
        category: 'Makanan Utama',
        price: 25000,
        stock: 15,
        description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
        image: 'https://images.unsplash.com/photo-1630917757656-4d13d47b0f5f?w=400&h=300&fit=crop',
        status: 'active',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Es Teh Manis',
        category: 'Minuman',
        price: 8000,
        stock: 50,
        description: 'Es teh manis segar',
        image: 'https://images.unsplash.com/photo-1567942402668-4270fe62d4d5?w=400&h=300&fit=crop',
        status: 'active',
        createdAt: '2024-01-15T11:00:00Z'
      },
      {
        id: '3',
        name: 'Gado-gado',
        category: 'Makanan Utama',
        price: 20000,
        stock: 8,
        description: 'Sayuran segar dengan bumbu kacang',
        image: 'https://images.unsplash.com/photo-1585937421612-70ca4e7a3e5c?w=400&h=300&fit=crop',
        status: 'active',
        createdAt: '2024-01-14T09:15:00Z'
      },
      {
        id: '4',
        name: 'Pisang Goreng',
        category: 'Dessert',
        price: 12000,
        stock: 0,
        description: 'Pisang goreng crispy dengan madu',
        image: 'https://images.unsplash.com/photo-1573147339261-8fa5c9c8b8c8?w=400&h=300&fit=crop',
        status: 'inactive',
        createdAt: '2024-01-13T14:20:00Z'
      }
    ]
  }),

  getters: {
    activeMenu: (state) => state.menu.filter(item => item.status === 'active'),
    outOfStock: (state) => state.menu.filter(item => item.stock === 0),
    lowStock: (state) => state.menu.filter(item => item.stock > 0 && item.stock <= 10)
  },

  actions: {
    addMenu(newMenu) {
      this.menu.unshift(newMenu)
    },
    
    updateMenu(updatedMenu) {
      const index = this.menu.findIndex(item => item.id === updatedMenu.id)
      if (index !== -1) {
        this.menu[index] = updatedMenu
      }
    },
    
    deleteMenu(menuId) {
      this.menu = this.menu.filter(item => item.id !== menuId)
    },
    
    toggleMenuStatus(menuId) {
      const menu = this.menu.find(item => item.id === menuId)
      if (menu) {
        menu.status = menu.status === 'active' ? 'inactive' : 'active'
      }
    }
  }
})