<script lang="ts" setup>
import { computed, ref } from 'vue'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

import type { Participant } from '@/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{
  averageVote: number
  currentTaskId: string
  participants: Participant[]
}>()

const labels = computed(() =>
  props.participants?.map((participant: Participant) => participant.name)
)

const values = computed(() => {
  return props.participants?.map((participant) => {
    const votes = participant.votes
    const score = votes.find((vote) => vote.taskId === props.currentTaskId)?.value
    return score
  })
})

const data = ref({
  labels: labels.value,
  datasets: [
    {
      label: 'Vote',
      data: values,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ]
    }
  ]
})

const options = ref({
  responsive: true
})
</script>

<template>
  <div>
    <p class="text-[#64748B]">Average vote: {{ averageVote }}</p>
    <Bar :data="data" :options="options" />
  </div>
</template>