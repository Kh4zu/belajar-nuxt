<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-64 bg-[#009879] text-white shadow-lg">
      <div class="p-6">
        <h1 class="text-2xl font-bold">Greenomi Admin</h1>
        <p class="text-green-200 text-sm mt-2">Super Administrator Panel</p>
      </div>
      
      <nav class="mt-8">
        <ul class="space-y-2 px-4">
          <li>
            <NuxtLink to="/admin" class="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Dashboard
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/menu" class="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Kelola Menu
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/stock" class="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"/>
              </svg>
              Management Stok
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/users" class="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
              Management User
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/finance" class="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6v1m0 1v1m6-12h2m-10 0h2m-2 12h2m-2 0v2m0-14v2"/>
              </svg>
              Laporan Keuangan
            </NuxtLink>
          </li>
        </ul>
      </nav>
      
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span class="font-bold">{{ user?.name?.charAt(0) || 'A' }}</span>
          </div>
          <div>
            <p class="font-semibold">{{ user?.name }}</p>
            <p class="text-green-200 text-xs">Administrator</p>
          </div>
        </div>
        <button @click="logout" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="ml-64">
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
});

const user = ref(null);

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem('current_user') || 'null');
  console.log('👤 Admin Layout - User data:', userData);
  
  if (!userData || userData.role !== 'admin') {
    console.log('🚫 Not admin, redirecting to unauthorized');
    navigateTo('/unauthorized');
  } else {
    user.value = userData;
    console.log('✅ Admin access granted in layout');
  }
});

const logout = () => {
  localStorage.removeItem('current_user');
  navigateTo('/');
};
</script>
