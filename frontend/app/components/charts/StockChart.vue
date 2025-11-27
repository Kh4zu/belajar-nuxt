<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMenuStore } from '@/stores/useMenuStore'
import { Chart } from 'chart.js/auto'

const menuStore = useMenuStore()
const chartCanvas = ref(null)

onMounted(() => {
  const labels = menuStore.menu.map(m => m.title)
  const stock = menuStore.menu.map(m => m.stock)

  new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Sisa Stok',
        data: stock,
        backgroundColor: '#009879'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
})
</script>

<style>
canvas {
  height: 300px !important;
}
</style>
