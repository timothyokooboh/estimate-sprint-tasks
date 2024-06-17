<script setup lang="ts">
import { ref } from 'vue'

import CreateSessionModal from '@/components/CreateSessionModal.vue'
import Button from '@/components/ui/button/Button.vue'

const isModalOpen = ref(false)
</script>

<template>
  <main>
    <div class="h-screen flex flex-col items-center justify-center">
      <div class="mb-4 flex flex-col items-center">
        <p class="text-white text-2xl font-bold font-mono mb-2 sm:text-3xl">
          Estimate Sprint Tasks
        </p>
        <p class="max-w-[270px] text-sm text-white text-center mb-5">
          Collaborate in realtime with your product teammates to provide estimates for sprint tasks.
        </p>

        <Button @click="isModalOpen = true">Start Session 🚀</Button>

        <CreateSessionModal :is-open="isModalOpen" @close:modal="isModalOpen = false" />
      </div>
    </div>
  </main>
</template>
