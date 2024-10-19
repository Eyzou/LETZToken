<template>
  <Line :data="chartData" :options="chartOptions"/>
</template>

<script setup>

import {Line} from 'vue-chartjs';
import {Bar} from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js'
import {ref} from "vue";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
)

const chartData = ref({
  labels: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
  datasets: [
    {
      label: 'dataset',
      backgroundColor: '#5fad79',
      borderColor: '#5fad79',
      data: [115654, 113438, 114843, 119439, 122911, 123234, 121859, 123432],
      fill: true,
      tension: 0.3,
      pointRadius: 0,
    },
  ],
});

// Options for the line chart
const chartOptions = ref({
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
  },
  scales: {
    y: {
      min: 100000,
      max: 135000,
      ticks: {
        color: "#b6baca",
      },
      grid: {
        drawnTicks: false,
      },
      border: {
        dash: [5, 10],
      },
    },
    x: {
      ticks: {
        color: "#b6baca",
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },

});
</script>

<style scoped lang="scss">

</style>