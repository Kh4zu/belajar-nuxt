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
                <button @click="deleteUser(user)" class="text-red-600 hover:text-red-800 transition p-1 rounded" title="Hapus User">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
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
            <h3 class="text-gray-500 text-sm">User</h3>
            <p class="text-2xl font-bold text-green-600">{{ userCount }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
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

    <!-- Add/Edit User Modal -->
    <div v-if="showAddUser || showEditUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-md">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-800">{{ isEditing ? 'Edit User' : 'Tambah User Baru' }}</h3>
        </div>
        
        <form @submit.prevent="saveUser" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
            <input v-model="userForm.name" type="text" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="Masukkan nama lengkap">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username *</label>
            <input 
              v-model="userForm.username" 
              type="text" 
              required 
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" 
              placeholder="Masukkan username"
              :readonly="isEditing"
              :class="isEditing ? 'bg-gray-100' : ''"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input v-model="userForm.email" type="email" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="email@example.com">
          </div>

          <div v-if="!isEditing">
            <label class="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <input v-model="userForm.password" type="password" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]" placeholder="Masukkan password">
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select v-model="userForm.role" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Department *</label>
              <select v-model="userForm.department" required class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009879]">
                <option value="Customer">Customer</option>
                <option value="IT">IT</option>
                <option value="Management">Management</option>
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
                :checked="userForm.status === 'active'"
              >
              <span class="ml-2 text-sm text-gray-700">User aktif</span>
            </label>
          </div>
          
          <div class="flex gap-3 pt-4">
            <button type="submit" class="flex-1 bg-[#009879] text-white py-3 rounded-lg hover:bg-[#007a63] transition font-semibold">
              {{ isEditing ? 'Update User' : 'Simpan User' }}
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

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-md">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-800">Konfirmasi Hapus User</h3>
        </div>
        
        <div class="p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-full flex items-center justify-center bg-red-100">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800">Hapus User: {{ userToDelete?.name }}</p>
              <p class="text-sm text-gray-600">Username: {{ userToDelete?.username }}</p>
            </div>
          </div>
          
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p class="text-red-700 text-sm">
              ⚠️ Tindakan ini tidak dapat dibatalkan. Semua data user akan dihapus permanen.
              Pastikan user ini tidak sedang login ke sistem.
            </p>
          </div>
          
          <div class="flex gap-3">
            <button @click="confirmDelete" class="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold">
              Ya, Hapus User
            </button>
            <button @click="cancelDelete" class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold">
              Batal
            </button>
          </div>
        </div>
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
const showEditUser = ref(false)
const showPasswordModal = ref(false)
const showDeleteModal = ref(false)
const selectedUser = ref(null)
const userToDelete = ref(null)
const isEditing = ref(false)

// Load users from database on component mount
const users = ref([])

onMounted(() => {
  loadUsersFromDatabase()
})

// Form data
const userForm = ref({
  id: '',
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
        name: 'Customer Demo',
        username: 'user',
        email: 'user@greenomi.com',
        password: 'user123',
        role: 'user',
        department: 'Customer',
        status: 'active',
        lastLogin: '2024-01-20T09:15:00Z',
        createdAt: '2024-01-02T00:00:00Z'
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
const userCount = computed(() => users.value.filter(user => user.role === 'user').length)
const activeUsersCount = computed(() => users.value.filter(user => user.status === 'active').length)

// Styling functions
const getUserAvatarClass = (role) => {
  const classes = {
    'admin': 'bg-red-500',
    'user': 'bg-blue-500'
  }
  return classes[role] || 'bg-gray-500'
}

const getRoleSelectClass = (role) => {
  const classes = {
    'admin': 'bg-red-50 border-red-200',
    'user': 'bg-blue-50 border-blue-200'
  }
  return classes[role] || 'bg-gray-50 border-gray-200'
}

const getDepartmentClass = (department) => {
  const classes = {
    'IT': 'bg-blue-100 text-blue-800',
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
  isEditing.value = true
  showEditUser.value = true
  userForm.value = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    password: '', // Password tidak ditampilkan saat edit
    role: user.role,
    department: user.department,
    status: user.status
  }
}

const deleteUser = (user) => {
  // Cek jika user sedang login
  const currentUser = JSON.parse(localStorage.getItem('current_user') || 'null')
  if (currentUser && currentUser.id === user.id) {
    showNotification('Tidak bisa menghapus user yang sedang login!', 'error')
    return
  }
  
  // Cek jika user adalah admin dan ini adalah satu-satunya admin
  if (user.role === 'admin') {
    const adminCount = users.value.filter(u => u.role === 'admin' && u.id !== user.id).length
    if (adminCount === 0) {
      showNotification('Tidak bisa menghapus satu-satunya admin! Tambahkan admin lain terlebih dahulu.', 'error')
      return
    }
  }
  
  userToDelete.value = user
  showDeleteModal.value = true
}

const confirmDelete = () => {
  const index = users.value.findIndex(u => u.id === userToDelete.value.id)
  if (index !== -1) {
    users.value.splice(index, 1)
    saveUsersToDatabase()
    showNotification(`User ${userToDelete.value.name} berhasil dihapus`, 'success')
  }
  cancelDelete()
}

const cancelDelete = () => {
  showDeleteModal.value = false
  userToDelete.value = null
  setTimeout(() => {
    userToDelete.value = null
  }, 300)
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
    } else {
      navigateTo('/')
    }
  }, 1000)
}

const saveUser = () => {
  // Check if username already exists (for new user only)
  if (!isEditing.value) {
    const existingUser = users.value.find(user => user.username === userForm.value.username)
    if (existingUser) {
      showNotification('Username sudah digunakan! Silakan gunakan username lain.', 'error')
      return
    }
  }

  if (isEditing.value) {
    // Update existing user
    const index = users.value.findIndex(u => u.id === userForm.value.id)
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        name: userForm.value.name,
        email: userForm.value.email,
        role: userForm.value.role,
        department: userForm.value.department,
        status: userForm.value.status
      }
      saveUsersToDatabase()
      showNotification(`User ${userForm.value.name} berhasil diperbarui`, 'success')
    }
  } else {
    // Add new user
    const newUser = {
      ...userForm.value,
      id: Date.now().toString(),
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
    
    users.value.unshift(newUser)
    saveUsersToDatabase()
    showNotification(`User ${newUser.name} berhasil ditambahkan`, 'success')
  }
  
  closeModal()
}

const closeModal = () => {
  showAddUser.value = false
  showEditUser.value = false
  isEditing.value = false
  userForm.value = {
    id: '',
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