<template>
  <div class="w-full h-80">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const chartCanvas = ref(null)
let chart = null

onMounted(() => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d')
    
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Admin', 'Manager', 'Staff IT', 'Staff MKT', 'User Premium', 'User Regular'],
        datasets: [
          {
            label: 'Login Hari Ini',
            data: [12, 8, 15, 22, 45, 38],
            backgroundColor: '#009879',
            borderColor: '#007a63',
            borderWidth: 1
          },
          {
            label: 'Login Minggu Ini',
            data: [45, 32, 67, 89, 156, 124],
            backgroundColor: '#4FD1C5',
            borderColor: '#38B2AC',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Aktivitas Login User'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20
            }
          }
        }
      }
    })
  }
})
</script>