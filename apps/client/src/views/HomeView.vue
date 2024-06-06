<script setup lang="ts">
import { Mail } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import StartSessionForm from '@/components/StartSessionForm.vue'
</script>

<template>
  <main>
    <div class="h-screen flex flex-col items-center justify-center">
      <div class="mb-4 flex flex-col items-center">
        <p class="text-white text-2xl font-bold font-mono mb-2 sm:text-3xl">
          Estimate Sprint Tasks
        </p>
        <p class="max-w-[250px] text-sm text-white text-center mb-5">
          Collaborate with your agile team mates realtime to provide estimates for sprint tasks.
        </p>

        <StartSessionForm />
      </div>
    </div>
  </main>
</template>
