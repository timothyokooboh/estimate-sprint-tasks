<script setup lang="ts">
import CreateSessionForm from '@/components/CreateSessionForm.vue'
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

        <CreateSessionForm />
      </div>
    </div>
  </main>
</template>
