<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center justify-center h-16 border-b border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-[#009879] rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span class="text-xl font-bold text-[#009879]">Greenomi</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <NuxtLink 
            to="/manager" 
            class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-[#009879] hover:text-white transition"
            :class="{ 'bg-[#009879] text-white': $route.path === '/manager' }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Dashboard
          </NuxtLink>

          <NuxtLink 
            to="/manager/performance" 
            class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-[#009879] hover:text-white transition"
            :class="{ 'bg-[#009879] text-white': $route.path.includes('/manager/performance') }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Performance
          </NuxtLink>

          <NuxtLink 
            to="/manager/reports" 
            class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-[#009879] hover:text-white transition"
            :class="{ 'bg-[#009879] text-white': $route.path.includes('/manager/reports') }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Laporan
          </NuxtLink>

          <NuxtLink 
            to="/manager/team" 
            class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-[#009879] hover:text-white transition"
            :class="{ 'bg-[#009879] text-white': $route.path.includes('/manager/team') }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            Tim Saya
          </NuxtLink>

          <NuxtLink 
            to="/manager/inventory" 
            class="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-[#009879] hover:text-white transition"
            :class="{ 'bg-[#009879] text-white': $route.path.includes('/manager/inventory') }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"/>
            </svg>
            Inventory
          </NuxtLink>
        </nav>

        <!-- User Profile -->
        <div class="p-4 border-t border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span class="font-semibold text-white text-sm">M</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">Manager Greenomi</p>
              <p class="text-xs text-gray-500 truncate">manager@greenomi.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="ml-64">
      <!-- Top Bar -->
      <header class="bg-white shadow-sm z-30 relative">
        <div class="flex items-center justify-between h-16 px-8">
          <div>
            <h1 class="text-2xl font-semibold text-gray-800">{{ pageTitle }}</h1>
          </div>
          
          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button class="relative p-2 text-gray-600 hover:text-gray-900 transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 010 11.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- User Menu -->
            <div class="relative">
              <button @click="toggleUserMenu" class="user-menu-trigger flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span class="font-semibold text-white text-sm">M</span>
                </div>
                <span class="text-sm font-medium text-gray-700">Manager</span>
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">Settings</a>
                <div class="border-t border-gray-200 my-1"></div>
                <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const showUserMenu = ref(false)

// Set page title based on current route
const pageTitle = computed(() => {
  const titles = {
    '/manager': 'Dashboard Manager',
    '/manager/performance': 'Performance Tim',
    '/manager/reports': 'Laporan & Analytics',
    '/manager/team': 'Management Tim',
    '/manager/inventory': 'Inventory Overview'
  }
  return titles[route.path] || 'Dashboard Manager'
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  // Clear user session
  localStorage.removeItem('current_user')
  navigateTo('/login')
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (showUserMenu.value && !e.target.closest('.user-menu-trigger')) {
      showUserMenu.value = false
    }
  })
})
</script>

<style scoped>
.router-link-active {
  background-color: #009879;
  color: white;
}
</style>