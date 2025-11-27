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
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
          {
            label: 'Pemasukan',
            data: [12000000, 19000000, 15000000, 18000000, 22000000, 19500000, 23000000, 21000000, 24500000, 22000000, 26000000, 28000000],
            borderColor: '#009879',
            backgroundColor: 'rgba(0, 152, 121, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Pengeluaran',
            data: [8000000, 12000000, 9500000, 11000000, 14000000, 12500000, 15000000, 13500000, 16000000, 14500000, 17000000, 18500000],
            borderColor: '#FF6B6B',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            tension: 0.4,
            fill: true
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
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += 'Rp ' + context.raw.toLocaleString('id-ID');
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return 'Rp ' + value.toLocaleString('id-ID');
              }
            }
          }
        }
      }
    })
  }
})
</script>