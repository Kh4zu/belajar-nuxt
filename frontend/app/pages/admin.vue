<template>
  <div class="p-10">
    <h1 class="text-3xl font-bold text-[#009879]">Dashboard Admin</h1>
    <p class="mt-4 text-gray-700">Halo admin! Anda berhasil login.</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "admin",
});
</script>
