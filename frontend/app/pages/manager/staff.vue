<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#009879] mb-2">Kelola Staff</h1>
      <p class="text-gray-600">Management tim staff</p>
    </div>
    
    <div class="bg-white p-6 rounded-2xl shadow">
      <p class="text-center text-gray-500">Halaman Kelola Staff</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'manager',
  layout: 'manager'
});
</script>