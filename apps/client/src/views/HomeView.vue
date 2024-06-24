<script setup lang="ts">
import { ref } from 'vue'

import CreateSessionModal from '@/components/CreateSessionModal.vue'
import Button from '@/components/ui/button/Button.vue'

const isModalOpen = ref(false)
</script>

<template>
  <main class="min-h-screen py-4 px-4 sm:px-10">
    <h1 class="font-mono font-extrabold">SprintPoker🚀</h1>
    <div class="mt-[70px] p flex flex-wrap justify-center items-center gap-x-[100px] gap-y-[50px]">
      <div class="mb-4 flex flex-col items-center">
        <p
          class="text-[28px] text-center font-[K2D] leading-[120%] mb-2 sm:text-[32px] md:text-[43px]"
        >
          Estimate Sprint Tasks
        </p>
        <p class="max-w-[350px] text-sm text-center mb-5">
          Collaborate in realtime with your product teammates to provide estimates for agile sprint
          tasks.
        </p>

        <Button @click="isModalOpen = true">Start a session 🚀</Button>

        <CreateSessionModal :is-open="isModalOpen" @close:modal="isModalOpen = false" />
      </div>

      <img src="/demo.svg" class="hidden sm:block h-[500px]" />
      <img src="/demo-mobile.svg" class="sm:hidden h-[500px]" />
    </div>
  </main>
</template>
