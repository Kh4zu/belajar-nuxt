<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Icon -->
      <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
      </div>

      <!-- Title & Message -->
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Akses Ditolak</h1>
      <p class="text-gray-600 mb-8">
        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. 
        Silakan hubungi administrator untuk mendapatkan akses yang sesuai.
      </p>

      <!-- User Info -->
      <div v-if="currentUser" class="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="getUserAvatarClass(currentUser.role)">
              <span class="font-semibold text-white text-sm">{{ currentUser.name.charAt(0) }}</span>
            </div>
            <div class="text-left">
              <p class="font-medium text-gray-900">{{ currentUser.name }}</p>
              <p class="text-sm text-gray-500 capitalize">{{ currentUser.role }} • {{ currentUser.department }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-3">
        <button 
          @click="goToDashboard" 
          class="w-full bg-[#009879] text-white py-3 rounded-lg hover:bg-[#007a63] transition font-semibold"
        >
          Kembali ke Dashboard
        </button>
        
        <button 
          @click="logout" 
          class="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
        >
          Login sebagai User Lain
        </button>
        
        <button 
          @click="goHome" 
          class="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
        >
          Kembali ke Homepage
        </button>
      </div>

      <!-- Support Info -->
      <div class="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p class="text-sm text-blue-800">
          <strong>Butuh bantuan?</strong> Hubungi tim IT di 
          <a href="mailto:it-support@greenomi.com" class="underline">it-support@greenomi.com</a>
          atau ext. 123
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Get current user from localStorage
const currentUser = ref(null)

onMounted(() => {
  const userData = localStorage.getItem('current_user')
  if (userData) {
    try {
      currentUser.value = JSON.parse(userData)
    } catch (error) {
      console.error('Error parsing user data:', error)
    }
  }
})

const getUserAvatarClass = (role) => {
  const classes = {
    'admin': 'bg-red-500',
    'manager': 'bg-orange-500',
    'staff': 'bg-green-500',
    'user': 'bg-blue-500'
  }
  return classes[role] || 'bg-gray-500'
}

const goToDashboard = () => {
  if (!currentUser.value) {
    return navigateTo('/login')
  }

  // Redirect based on user role
  const routes = {
    'admin': '/admin',
    'manager': '/manager', 
    'staff': '/staff',
    'user': '/user'
  }
  
  const route = routes[currentUser.value.role] || '/'
  return navigateTo(route)
}

const logout = () => {
  localStorage.removeItem('current_user')
  return navigateTo('/login')
}

const goHome = () => {
  return navigateTo('/')
}
</script>