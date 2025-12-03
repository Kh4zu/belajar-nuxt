import { defineStore } from 'pinia'

export const useFinancialStore = defineStore('financial', {
  state: () => ({
    transactions: [],
    period: 'month',
    startDate: null,
    endDate: null
  }),

  actions: {
    initialize() {
      if (process.client) {
        this.loadTransactions()
        this.setDefaultDates()
      }
    },

    setDefaultDates() {
      const today = new Date()
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
      
      this.startDate = this.formatDate(firstDay)
      this.endDate = this.formatDate(today)
    },

    formatDate(date) {
      return date.toISOString().split('T')[0]
    },

    loadTransactions() {
      if (process.client) {
        const saved = localStorage.getItem('financial_transactions')
        if (saved) {
          try {
            this.transactions = JSON.parse(saved)
          } catch (error) {
            console.error('Error loading transactions:', error)
            this.transactions = []
          }
        } else {
          // Load from orders if exists
          this.loadFromOrders()
        }
      }
    },

    loadFromOrders() {
      if (process.client) {
        const savedOrders = localStorage.getItem('greenomi_orders')
        if (savedOrders) {
          try {
            const orders = JSON.parse(savedOrders)
            this.transactions = orders.map(order => ({
              id: order.id || `TRX-${Date.now()}`,
              date: order.createdAt || new Date().toISOString(),
              amount: order.summary?.total || 0,
              customer: order.shipping?.nama || 'Guest',
              items: order.items || [],
              status: 'completed',
              paymentMethod: order.payment?.method || 'unknown'
            }))
            this.saveTransactions()
          } catch (error) {
            console.error('Error loading from orders:', error)
          }
        }
      }
    },

    saveTransactions() {
      if (process.client) {
        localStorage.setItem('financial_transactions', JSON.stringify(this.transactions))
      }
    },

    recordTransaction(transactionData) {
      const transaction = {
        id: `TRX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString(),
        ...transactionData
      }

      this.transactions.unshift(transaction)
      this.saveTransactions()
      
      return transaction
    },

    setPeriod(period, startDate, endDate) {
      this.period = period
      if (startDate) this.startDate = startDate
      if (endDate) this.endDate = endDate
    }
  },

  getters: {
    filteredTransactions: (state) => {
      if (!state.startDate || !state.endDate) {
        return state.transactions
      }

      const start = new Date(state.startDate)
      const end = new Date(state.endDate)
      
      return state.transactions.filter(transaction => {
        const transDate = new Date(transaction.date)
        return transDate >= start && transDate <= end
      })
    },

    totalRevenue: (state) => {
      const filtered = state.filteredTransactions
      return filtered.reduce((sum, t) => sum + (t.amount || 0), 0)
    },

    recentTransactions: (state) => {
      return state.transactions
        .slice(0, 10)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    },

    monthlyRevenue: (state) => {
      const today = new Date()
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
      
      return state.transactions
        .filter(t => {
          if (!t?.date) return false
          const transDate = new Date(t.date)
          return transDate >= firstDay && transDate <= today
        })
        .reduce((sum, t) => sum + (t.amount || 0), 0)
    },

    // Tambahan untuk dashboard
    dailyTransactions: (state) => {
      const today = new Date()
      const todayString = today.toDateString()
      
      return state.transactions.filter(t => {
        if (!t?.date) return false
        const transDate = new Date(t.date)
        return transDate.toDateString() === todayString
      })
    },

    weeklyTransactions: (state) => {
      const today = new Date()
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - 7)
      
      return state.transactions.filter(t => {
        if (!t?.date) return false
        const transDate = new Date(t.date)
        return transDate >= weekStart && transDate <= today
      })
    }
  }
})