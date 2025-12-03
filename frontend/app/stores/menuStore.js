// stores/useMenuStore.js
export const useMenuStore = defineStore('menu', {
  state: () => ({
    menu: [],
    orders: [],
    users: [],
    stockHistory: [],
    revenue: 0
  }),

  actions: {
    // Initialize from localStorage
    initialize() {
      const savedMenu = localStorage.getItem('greenomi_menu')
      const savedOrders = localStorage.getItem('greenomi_orders')
      const savedUsers = localStorage.getItem('greenomi_users')
      const savedRevenue = localStorage.getItem('greenomi_revenue')
      
      if (savedMenu) this.menu = JSON.parse(savedMenu)
      if (savedOrders) this.orders = JSON.parse(savedOrders)
      if (savedUsers) this.users = JSON.parse(savedUsers)
      if (savedRevenue) this.revenue = JSON.parse(savedRevenue)
      
      // Set default menu if empty
      if (this.menu.length === 0) {
        this.setDefaultMenu()
      }
      
      // Set default users if empty
      if (this.users.length === 0) {
        this.setDefaultUsers()
      }
    },
    
    setDefaultMenu() {
      this.menu = [
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
          status: 'active',
          popularity: 95,
          salesCount: 42,
          createdAt: new Date('2024-01-01').toISOString(),
          updatedAt: new Date().toISOString()
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
          status: 'active',
          popularity: 88,
          salesCount: 38,
          createdAt: new Date('2024-01-01').toISOString(),
          updatedAt: new Date().toISOString()
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
          status: 'active',
          popularity: 92,
          salesCount: 25,
          createdAt: new Date('2024-01-01').toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      this.saveMenuToStorage()
    },
    
    setDefaultUsers() {
      this.users = [
        {
          id: '1',
          name: 'Administrator System',
          username: 'admin',
          email: 'admin@greenomi.com',
          password: 'admin123',
          role: 'admin',
          department: 'IT',
          status: 'active',
          lastLogin: '2024-01-20T10:30:00Z',
          createdAt: '2024-01-01T00:00:00Z',
          totalSpent: 0,
          orderCount: 0
        },
        {
          id: '2',
          name: 'Customer Demo',
          username: 'user',
          email: 'user@greenomi.com',
          password: 'user123',
          role: 'user',
          department: 'Customer',
          status: 'active',
          lastLogin: '2024-01-20T09:15:00Z',
          createdAt: '2024-01-02T00:00:00Z',
          totalSpent: 125000,
          orderCount: 3
        }
      ]
      this.saveUsersToStorage()
    },
    
    // Menu Management
    addMenu(item) {
      const newItem = {
        ...item,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        popularity: 50,
        salesCount: 0
      }
      this.menu.unshift(newItem)
      this.saveMenuToStorage()
      return newItem
    },
    
    updateMenu(id, updates) {
      const index = this.menu.findIndex(item => item.id === id)
      if (index !== -1) {
        this.menu[index] = {
          ...this.menu[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
        this.saveMenuToStorage()
      }
    },
    
    deleteMenu(id) {
      this.menu = this.menu.filter(item => item.id !== id)
      this.saveMenuToStorage()
    },
    
    // Order Management
    addOrder(order) {
      // Update stock for each item in the order
      order.items.forEach(item => {
        const menuItem = this.menu.find(m => m.id === item.id)
        if (menuItem) {
          menuItem.stock -= item.quantity
          menuItem.salesCount += item.quantity
          
          // Add stock history
          this.addStockHistory({
            menuId: item.id,
            menuName: item.name,
            type: 'out',
            quantity: item.quantity,
            notes: `Penjualan order ${order.id}`,
            previousStock: menuItem.stock + item.quantity,
            newStock: menuItem.stock,
            date: new Date().toISOString()
          })
        }
      })
      
      const newOrder = {
        ...order,
        id: 'ORD-' + Date.now().toString(),
        orderDate: new Date().toISOString(),
        status: 'completed'
      }
      
      this.orders.unshift(newOrder)
      
      // Update revenue
      this.revenue += order.total
      this.saveOrdersToStorage()
      this.saveMenuToStorage()
      this.saveRevenueToStorage()
      
      return newOrder
    },
    
    // Stock Management
    updateStock(menuId, quantity, notes = '') {
      const menuItem = this.menu.find(item => item.id === menuId)
      if (menuItem) {
        const previousStock = menuItem.stock
        menuItem.stock += quantity
        menuItem.updatedAt = new Date().toISOString()
        
        // Add stock history
        this.addStockHistory({
          menuId,
          menuName: menuItem.name,
          type: quantity > 0 ? 'in' : 'out',
          quantity: Math.abs(quantity),
          notes,
          previousStock,
          newStock: menuItem.stock,
          date: new Date().toISOString()
        })
        
        this.saveMenuToStorage()
        return menuItem
      }
      return null
    },
    
    addStockHistory(record) {
      this.stockHistory.unshift(record)
      this.saveStockHistoryToStorage()
    },
    
    // User Management
    addUser(user) {
      const newUser = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        totalSpent: 0,
        orderCount: 0,
        status: 'active'
      }
      this.users.push(newUser)
      this.saveUsersToStorage()
      return newUser
    },
    
    updateUser(id, updates) {
      const index = this.users.findIndex(user => user.id === id)
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          ...updates
        }
        this.saveUsersToStorage()
      }
    },
    
    // Analytics
    getRevenueData(period = 'month') {
      const now = new Date()
      let startDate
      
      switch(period) {
        case 'day':
          startDate = new Date(now.setDate(now.getDate() - 1))
          break
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7))
          break
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1))
          break
        case 'year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1))
          break
        default:
          startDate = new Date(now.setMonth(now.getMonth() - 1))
      }
      
      return this.orders.filter(order => 
        new Date(order.orderDate) >= startDate
      )
    },
    
    getTopSellingItems(limit = 5) {
      return [...this.menu]
        .sort((a, b) => b.salesCount - a.salesCount)
        .slice(0, limit)
    },
    
    getLowStockItems() {
      return this.menu.filter(item => item.stock <= item.minStock)
    },
    
    getRecentOrders(limit = 5) {
      return [...this.orders]
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, limit)
    },
    
    // Storage
    saveMenuToStorage() {
      localStorage.setItem('greenomi_menu', JSON.stringify(this.menu))
    },
    
    saveOrdersToStorage() {
      localStorage.setItem('greenomi_orders', JSON.stringify(this.orders))
    },
    
    saveUsersToStorage() {
      localStorage.setItem('greenomi_users', JSON.stringify(this.users))
    },
    
    saveStockHistoryToStorage() {
      localStorage.setItem('greenomi_stock_history', JSON.stringify(this.stockHistory))
    },
    
    saveRevenueToStorage() {
      localStorage.setItem('greenomi_revenue', JSON.stringify(this.revenue))
    }
  },
  
  getters: {
    activeMenu: (state) => state.menu.filter(item => item.status === 'active'),
    totalOrders: (state) => state.orders.length,
    totalRevenue: (state) => state.orders.reduce((sum, order) => sum + order.total, 0),
    averageOrderValue: (state) => {
      return state.orders.length > 0 
        ? state.orders.reduce((sum, order) => sum + order.total, 0) / state.orders.length 
        : 0
    },
    outOfStockItems: (state) => state.menu.filter(item => item.stock === 0),
    lowStockItems: (state) => state.menu.filter(item => item.stock > 0 && item.stock <= item.minStock),
    totalCustomers: (state) => state.users.filter(user => user.role === 'user').length,
    recentCustomers: (state) => state.users
      .filter(user => user.role === 'user')
      .sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))
      .slice(0, 5)
  }
})