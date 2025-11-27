<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#009879] mb-2">Management User</h1>
      <p class="text-gray-600">Kelola user dan role akses</p>
    </div>

    <!-- Actions -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex gap-4">
        <button @click="showAddUser = true" class="bg-[#009879] text-white px-4 py-2 rounded-lg hover:bg-[#007a63] transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Tambah User
        </button>
      </div>
      
      <div class="relative">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Cari user..." 
          class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009879] w-64"
        >
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
    </div>

    <!-- User Table -->
    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-[#009879] text-white">
          <tr>
            <th class="py-4 px-6 text-left">User</th>
            <th class="py-4 px-6 text-left">Username</th>
            <th class="py-4 px-6 text-left">Role</th>
            <th class="py-4 px-6 text-left">Department</th>
            <th class="py-4 px-6 text-left">Status</th>
            <th class="py-4 px-6 text-left">Terakhir Login</th>
            <th class="py-4 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="border-b hover:bg-gray-50">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="getUserAvatarClass(user.role)">
                  <span class="font-semibold text-white">{{ user.name.charAt(0) }}</span>
                </div>
                <div>
                  <p class="font-semibold">{{ user.name }}</p>
                  <p class="text-gray-500 text-sm">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span class="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{{ user.username }}</span>
            </td>
            <td class="py-4 px-6">
              <select v-model="user.role" @change="updateUserRole(user)" class="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#009879]" :class="getRoleSelectClass(user.role)">
                <option value="user">User</option>
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td class="py-4 px-6">
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getDepartmentClass(user.department)">
                {{ user.department }}
              </span>
            </td>
            <td class="py-4 px-6">
              <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="{
                'bg-green-100 text-green-800': user.status === 'active',
                'bg-red-100 text-red-800': user.status === 'inactive'
              }">
                {{ user.status === 'active' ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="py-4 px-6">
              <span class="text-sm text-gray-600">{{ formatDate(user.lastLogin) }}</span>
            </td>
            <td class="py-4 px-6 text-center">
              <div class="flex justify-center gap-2">
                <button @click="editUser(user)" class="text-blue-600 hover:text-blue-800 transition p-1 rounded" title="Edit User">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button @click="toggleUserStatus(user)" class="transition p-1 rounded" :class="user.status === 'active' ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'" :title="user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="user.status === 'active'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button @click="showChangePassword(user)" class="text-purple-600 hover:text-purple-800 transition p-1 rounded" title="Ubah Password">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                  </svg>
                </button>
                <button @click="loginAsUser(user)" class="text-green-600 hover:text-green-800 transition p-1 rounded" title="Login sebagai User">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
        </svg>
        <p class="text-gray-500 text-lg">Tidak ada user ditemukan</p>
        <button @click="showAddUser = true" class="mt-4 bg-[#009879] text-white px-6 py-2 rounded-lg hover:bg-[#007a63] transition">
          Tambah User Pertama
        </button>
      </div>
    </div>

    <!-- User Statistics -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-500 text-sm">Total Users</h3>
            <p class="text-2xl font-bold text-gray-800">{{ users.length }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-500 text-sm">Admin</h3>
            <p class="text-2xl font-bold text-red-600">{{ adminCount }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-500 text-sm">Staff</h3>
            <p class="text-2xl font-bold text-green-600">{{ staffCount }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-500 text-sm">Aktif</h3>
            <p class="text-2xl font-bold text-purple-600">{{ activeUsersCount }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-md">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-800">Tambah User Baru</h3>
        </div>
        
        <form @submit.prevent="saveUser" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
            <input v-model="userForm.name" type="text" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="Masukkan nama lengkap">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username *</label>
            <input v-model="userForm.username" type="text" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="Masukkan username">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input v-model="userForm.email" type="email" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="email@example.com">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <input v-model="userForm.password" type="password" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="Masukkan password">
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select v-model="userForm.role" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]">
                <option value="user">User</option>
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Department *</label>
              <select v-model="userForm.department" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]">
                <option value="">Pilih Department</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Management">Management</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
          </div>

          <div>
            <label class="flex items-center">
              <input 
                v-model="userForm.status"
                type="checkbox" 
                true-value="active"
                false-value="inactive"
                class="rounded border-gray-300 text-[#009879] focus:ring-[#009879]"
                checked
              >
              <span class="ml-2 text-sm text-gray-700">User aktif</span>
            </label>
          </div>
          
          <div class="flex gap-3 pt-4">
            <button type="submit" class="flex-1 bg-[#009879] text-white py-3 rounded-lg hover:bg-[#007a63] transition font-semibold">
              Simpan User
            </button>
            <button type="button" @click="closeModal" class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-md">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-800">Ubah Password</h3>
          <p class="text-sm text-gray-600 mt-1">Untuk user: {{ selectedUser?.name }}</p>
        </div>
        
        <form @submit.prevent="changePassword" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password Baru *</label>
            <input v-model="passwordForm.newPassword" type="password" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="Masukkan password baru">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password *</label>
            <input v-model="passwordForm.confirmPassword" type="password" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="Konfirmasi password baru">
          </div>
          
          <div class="flex gap-3 pt-4">
            <button type="submit" class="flex-1 bg-[#009879] text-white py-3 rounded-lg hover:bg-[#007a63] transition font-semibold">
              Ubah Password
            </button>
            <button type="button" @click="closePasswordModal" class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin',
  layout: 'admin'
});

const searchQuery = ref('')
const showAddUser = ref(false)
const showPasswordModal = ref(false)
const selectedUser = ref(null)

// Load users from database on component mount
const users = ref([])

onMounted(() => {
  loadUsersFromDatabase()
})

// Form data
const userForm = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  role: 'user',
  department: 'Customer',
  status: 'active'
})

const passwordForm = ref({
  newPassword: '',
  confirmPassword: ''
})

// Database functions
const loadUsersFromDatabase = () => {
  const storedUsers = localStorage.getItem('greenomi_users')
  if (storedUsers) {
    users.value = JSON.parse(storedUsers)
  } else {
    // Initialize with default users if database is empty
    const defaultUsers = [
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
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Budi Santoso',
        username: 'manager',
        email: 'budi.manager@greenomi.com',
        password: 'manager123',
        role: 'manager',
        department: 'Management',
        status: 'active',
        lastLogin: '2024-01-20T09:15:00Z',
        createdAt: '2024-01-02T00:00:00Z'
      },
      {
        id: '3',
        name: 'Sari Indah',
        username: 'staff_it',
        email: 'sari.it@greenomi.com',
        password: 'staff123',
        role: 'staff',
        department: 'IT',
        status: 'active',
        lastLogin: '2024-01-19T16:45:00Z',
        createdAt: '2024-01-03T00:00:00Z'
      }
    ]
    users.value = defaultUsers
    saveUsersToDatabase()
  }
}

const saveUsersToDatabase = () => {
  localStorage.setItem('greenomi_users', JSON.stringify(users.value))
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  return users.value.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Statistics
const adminCount = computed(() => users.value.filter(user => user.role === 'admin').length)
const staffCount = computed(() => users.value.filter(user => user.role === 'staff').length)
const activeUsersCount = computed(() => users.value.filter(user => user.status === 'active').length)
const customerCount = computed(() => users.value.filter(user => user.department === 'Customer').length)

// Styling functions
const getUserAvatarClass = (role) => {
  const classes = {
    'admin': 'bg-red-500',
    'manager': 'bg-orange-500',
    'staff': 'bg-green-500',
    'user': 'bg-blue-500'
  }
  return classes[role] || 'bg-gray-500'
}

const getRoleSelectClass = (role) => {
  const classes = {
    'admin': 'bg-red-50 border-red-200',
    'manager': 'bg-orange-50 border-orange-200',
    'staff': 'bg-green-50 border-green-200',
    'user': 'bg-blue-50 border-blue-200'
  }
  return classes[role] || 'bg-gray-50 border-gray-200'
}

const getDepartmentClass = (department) => {
  const classes = {
    'IT': 'bg-blue-100 text-blue-800',
    'Marketing': 'bg-green-100 text-green-800',
    'Finance': 'bg-purple-100 text-purple-800',
    'Operations': 'bg-orange-100 text-orange-800',
    'Customer Service': 'bg-pink-100 text-pink-800',
    'Management': 'bg-red-100 text-red-800',
    'Customer': 'bg-gray-100 text-gray-800'
  }
  return classes[department] || 'bg-gray-100 text-gray-800'
}

// Date formatting
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Actions
const updateUserRole = (user) => {
  saveUsersToDatabase()
  showNotification(`Role ${user.name} diubah menjadi ${user.role}`, 'success')
}

const toggleUserStatus = (user) => {
  user.status = user.status === 'active' ? 'inactive' : 'active'
  saveUsersToDatabase()
  showNotification(`User ${user.name} ${user.status === 'active' ? 'diaktifkan' : 'dinonaktifkan'}`, 'success')
}

const editUser = (user) => {
  // Implement edit user functionality
  showNotification(`Edit user: ${user.name}`, 'info')
}

const showChangePassword = (user) => {
  selectedUser.value = user
  passwordForm.value = {
    newPassword: '',
    confirmPassword: ''
  }
  showPasswordModal.value = true
}

const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    showNotification('Password dan konfirmasi password tidak sama!', 'error')
    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    showNotification('Password minimal 6 karakter!', 'error')
    return
  }

  const userIndex = users.value.findIndex(u => u.id === selectedUser.value.id)
  if (userIndex !== -1) {
    users.value[userIndex].password = passwordForm.value.newPassword
    saveUsersToDatabase()
    showNotification(`Password ${selectedUser.value.name} berhasil diubah`, 'success')
    closePasswordModal()
  }
}

const loginAsUser = (user) => {
  if (user.status !== 'active') {
    showNotification('User tidak aktif! Tidak bisa login.', 'error')
    return
  }

  // Update last login time
  const userIndex = users.value.findIndex(u => u.id === user.id)
  if (userIndex !== -1) {
    users.value[userIndex].lastLogin = new Date().toISOString()
    saveUsersToDatabase()
  }

  // Save user session
  const userSession = {
    ...user,
    loginTime: new Date().toISOString(),
    sessionId: generateSessionId()
  }
  
  localStorage.setItem('current_user', JSON.stringify(userSession))
  
  showNotification(`Login sebagai ${user.name} berhasil!`, 'success')
  
  // Redirect based on role
  setTimeout(() => {
    if (user.role === 'admin') {
      navigateTo('/admin')
    } else if (user.role === 'manager') {
      navigateTo('/manager')
    } else if (user.role === 'staff') {
      navigateTo('/staff')
    } else {
      navigateTo('/')
    }
  }, 1000)
}

const saveUser = () => {
  // Check if username already exists
  const existingUser = users.value.find(user => user.username === userForm.value.username)
  if (existingUser) {
    showNotification('Username sudah digunakan! Silakan gunakan username lain.', 'error')
    return
  }

  const newUser = {
    ...userForm.value,
    id: Date.now().toString(),
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
  
  users.value.unshift(newUser)
  saveUsersToDatabase()
  closeModal()
  showNotification(`User ${newUser.name} berhasil ditambahkan`, 'success')
}

const closeModal = () => {
  showAddUser.value = false
  userForm.value = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'user',
    department: 'Customer',
    status: 'active'
  }
}

const closePasswordModal = () => {
  showPasswordModal.value = false
  selectedUser.value = null
  passwordForm.value = {
    newPassword: '',
    confirmPassword: ''
  }
}

const generateSessionId = () => {
  return Math.random().toString(36).substr(2, 12) + Date.now().toString(36)
}

const showNotification = (message, type = 'info') => {
  if (type === 'error') {
    alert('❌ ' + message)
  } else if (type === 'success') {
    alert('✅ ' + message)
  } else {
    alert('ℹ️ ' + message)
  }
}
</script>