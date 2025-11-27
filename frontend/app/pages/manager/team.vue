<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Management Tim</h1>
      <p class="text-gray-600 mt-2">Kelola anggota tim dan jadwal kerja</p>
    </div>

    <!-- Team Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Total Staff</p>
        <p class="text-2xl font-bold text-gray-900 mt-2">{{ teamStats.totalStaff }}</p>
        <p class="text-sm text-green-600 mt-1">+2 dari bulan lalu</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Staff Aktif</p>
        <p class="text-2xl font-bold text-gray-900 mt-2">{{ teamStats.activeStaff }}</p>
        <p class="text-sm text-green-600 mt-1">96% kehadiran</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Sedang Cuti</p>
        <p class="text-2xl font-bold text-gray-900 mt-2">{{ teamStats.onLeave }}</p>
        <p class="text-sm text-gray-600 mt-1">Akan kembali besok</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p class="text-sm font-medium text-gray-600">Overtime</p>
        <p class="text-2xl font-bold text-gray-900 mt-2">{{ teamStats.overtime }} jam</p>
        <p class="text-sm text-orange-600 mt-1">Bulan ini</p>
      </div>
    </div>

    <!-- Team Members -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-900">Anggota Tim</h3>
        <button class="bg-[#009879] text-white px-4 py-2 rounded-lg hover:bg-[#007a63] transition flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Tambah Staff
        </button>
      </div>
      
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="py-4 px-6 text-left text-sm font-medium text-gray-700">Staff</th>
            <th class="py-4 px-6 text-left text-sm font-medium text-gray-700">Posisi</th>
            <th class="py-4 px-6 text-left text-sm font-medium text-gray-700">Shift</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Status</th>
            <th class="py-4 px-6 text-center text-sm font-medium text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="member in teamMembers" :key="member.id" class="hover:bg-gray-50 transition">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span class="font-semibold text-white text-sm">{{ member.name.charAt(0) }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ member.name }}</p>
                  <p class="text-sm text-gray-500">{{ member.email }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getPositionClass(member.position)">
                {{ member.position }}
              </span>
            </td>
            <td class="py-4 px-6">
              <span class="font-medium text-gray-900">{{ member.shift }}</span>
            </td>
            <td class="py-4 px-6 text-center">
              <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                {{ member.status === 'active' ? 'Aktif' : 'Off' }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <div class="flex justify-center gap-2">
                <button @click="editStaff(member)" class="text-blue-600 hover:text-blue-800 transition p-1 rounded" title="Edit Staff">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button @click="viewSchedule(member)" class="text-green-600 hover:text-green-800 transition p-1 rounded" title="Jadwal">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Schedule Overview -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Overview Jadwal Minggu Ini</h3>
      <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div v-for="day in schedule" :key="day.name" class="text-center">
          <p class="font-medium text-gray-900 mb-3">{{ day.name }}</p>
          <div class="space-y-2">
            <div v-for="shift in day.shifts" :key="shift.type" class="p-2 border border-gray-200 rounded-lg">
              <p class="text-sm font-medium text-gray-900">{{ shift.type }}</p>
              <p class="text-xs text-gray-500">{{ shift.staff }} staff</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'manager',
  layout: 'manager'
});

// Team statistics
const teamStats = ref({
  totalStaff: 12,
  activeStaff: 10,
  onLeave: 2,
  overtime: 45
})

// Team members data
const teamMembers = ref([
  {
    id: 1,
    name: 'Sari Indah',
    email: 'sari@greenomi.com',
    position: 'Kitchen Staff',
    shift: 'Pagi (07:00-15:00)',
    status: 'active'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    email: 'budi@greenomi.com',
    position: 'Cashier',
    shift: 'Siang (12:00-20:00)',
    status: 'active'
  },
  {
    id: 3,
    name: 'Rina Melati',
    email: 'rina@greenomi.com',
    position: 'Waitress',
    shift: 'Pagi (07:00-15:00)',
    status: 'active'
  },
  {
    id: 4,
    name: 'Ahmad Fauzi',
    email: 'ahmad@greenomi.com',
    position: 'Delivery',
    shift: 'Siang (12:00-20:00)',
    status: 'active'
  },
  {
    id: 5,
    name: 'Dewi Lestari',
    email: 'dewi@greenomi.com',
    position: 'Kitchen Staff',
    shift: 'Malam (15:00-23:00)',
    status: 'active'
  }
])

// Schedule data
const schedule = ref([
  {
    name: 'Senin',
    shifts: [
      { type: 'Pagi', staff: 4 },
      { type: 'Siang', staff: 3 },
      { type: 'Malam', staff: 2 }
    ]
  },
  {
    name: 'Selasa',
    shifts: [
      { type: 'Pagi', staff: 4 },
      { type: 'Siang', staff: 3 },
      { type: 'Malam', staff: 2 }
    ]
  },
  {
    name: 'Rabu',
    shifts: [
      { type: 'Pagi', staff: 3 },
      { type: 'Siang', staff: 4 },
      { type: 'Malam', staff: 2 }
    ]
  },
  {
    name: 'Kamis',
    shifts: [
      { type: 'Pagi', staff: 4 },
      { type: 'Siang', staff: 3 },
      { type: 'Malam', staff: 3 }
    ]
  },
  {
    name: 'Jumat',
    shifts: [
      { type: 'Pagi', staff: 5 },
      { type: 'Siang', staff: 4 },
      { type: 'Malam', staff: 3 }
    ]
  },
  {
    name: 'Sabtu',
    shifts: [
      { type: 'Pagi', staff: 5 },
      { type: 'Siang', staff: 5 },
      { type: 'Malam', staff: 4 }
    ]
  },
  {
    name: 'Minggu',
    shifts: [
      { type: 'Pagi', staff: 4 },
      { type: 'Siang', staff: 4 },
      { type: 'Malam', staff: 3 }
    ]
  }
])

// Utility functions
const getPositionClass = (position) => {
  const classes = {
    'Kitchen Staff': 'bg-orange-100 text-orange-800',
    'Cashier': 'bg-blue-100 text-blue-800',
    'Waitress': 'bg-green-100 text-green-800',
    'Delivery': 'bg-purple-100 text-purple-800'
  }
  return classes[position] || 'bg-gray-100 text-gray-800'
}

const editStaff = (staff) => {
  alert(`Edit staff: ${staff.name}\n\nAkan membuka form edit staff...`)
}

const viewSchedule = (staff) => {
  alert(`Jadwal ${staff.name}: ${staff.shift}\n\nAkan menampilkan detail jadwal...`)
}
</script>