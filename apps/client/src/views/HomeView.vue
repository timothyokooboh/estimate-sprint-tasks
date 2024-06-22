<script setup lang="ts">
import { ref } from 'vue'

import CreateSessionModal from '@/components/CreateSessionModal.vue'
import Button from '@/components/ui/button/Button.vue'

const isModalOpen = ref(false)
</script>

<template>
  <main>
    <div class="min-h-screen grid sm:grid-cols-2">
      <div class="py-4">
        <h1 class="font-mono font-extrabold pb-3 px-6">SprintPoker🚀</h1>
        <div class="mt-5 px-3 flex flex-col items-center justify-center sm:h-screen sm:mt-0">
          <div class="mb-4 flex flex-col items-center">
            <p
              class="text-[28px] text-center font-[K2D] leading-[120%] mb-2 sm:text-[32px] md:text-[53px]"
            >
              Estimate Sprint Tasks
            </p>
            <p class="max-w-[350px] text-sm text-center mb-5">
              Collaborate in realtime with your product teammates to provide estimates for agile
              sprint tasks.
            </p>

            <Button @click="isModalOpen = true">Start Session 🚀</Button>

            <CreateSessionModal :is-open="isModalOpen" @close:modal="isModalOpen = false" />
          </div>
        </div>
      </div>

      <div class="sm:h-screen">
        <img src="/g.svg" class="w-full h-full" />
      </div>
    </div>
  </main>
</template>
