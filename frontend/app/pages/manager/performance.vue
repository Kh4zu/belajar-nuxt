<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Performance Tim</h1>
      <p class="text-gray-600 mt-2">Monitor performa dan produktivitas tim Anda</p>
    </div>

    <!-- Performance Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Rata-rata Waktu Penyelesaian</p>
        <p class="text-2xl font-bold text-gray-900 mt-2">12.5 menit</p>
        <p class="text-sm text-green-600 mt-1">-2.3 menit dari minggu lalu</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Kepuasan Pelanggan</p>
        <p class="text-2xl font-bold text-gray-900 mt-2">4.8/5.0</p>
        <p class="text-sm text-green-600 mt-1">+0.2 dari bulan lalu</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Tingkat Kehadiran</p>
        <p class="text-2xl font-bold text-gray-900 mt-2">96.2%</p>
        <p class="text-sm text-green-600 mt-1">+1.5% dari bulan lalu</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Pesanan per Staff</p>
        <p class="text-2xl font-bold text-gray-900 mt-2">45/hari</p>
        <p class="text-sm text-green-600 mt-1">+3 dari minggu lalu</p>
      </div>
    </div>

    <!-- Team Performance Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Detail Performa Staff</h3>
      </div>
      
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="py-4 px-6 text-left text-sm font-medium text-gray-700">Staff</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Pesanan/Hari</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Rating</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Waktu Rata-rata</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Status</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="staff in teamPerformance" :key="staff.id" class="hover:bg-gray-50 transition">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span class="font-semibold text-white text-sm">{{ staff.name.charAt(0) }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ staff.name }}</p>
                  <p class="text-sm text-gray-500">{{ staff.role }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="font-semibold text-gray-900">{{ staff.ordersPerDay }}</span>
            </td>
            <td class="py-4 px-6 text-center">
              <div class="flex items-center justify-center gap-1">
                <span class="font-semibold text-gray-900">{{ staff.rating }}</span>
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="font-semibold text-gray-900">{{ staff.avgTime }} menit</span>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                {{ staff.status === 'active' ? 'Aktif' : 'Off' }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <button @click="viewStaffDetails(staff)" class="text-blue-600 hover:text-blue-800 transition font-medium text-sm">
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'manager',
  layout: 'manager'
});

// Team performance data
const teamPerformance = ref([
  {
    id: 1,
    name: 'Sari Indah',
    role: 'Kitchen Staff',
    ordersPerDay: 52,
    rating: 4.8,
    avgTime: 10.2,
    status: 'active'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    role: 'Cashier',
    ordersPerDay: 48,
    rating: 4.9,
    avgTime: 8.5,
    status: 'active'
  },
  {
    id: 3,
    name: 'Rina Melati',
    role: 'Waitress',
    ordersPerDay: 45,
    rating: 4.7,
    avgTime: 12.8,
    status: 'active'
  },
  {
    id: 4,
    name: 'Ahmad Fauzi',
    role: 'Delivery',
    ordersPerDay: 38,
    rating: 4.6,
    avgTime: 15.3,
    status: 'active'
  }
])

const viewStaffDetails = (staff) => {
  alert(`Detail performa untuk: ${staff.name}\n\nAkan menampilkan detail lengkap performa staff...`)
}
</script>