<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <div class="min-h-screen bg-brand-bg text-white">
    <div class="min-h-screen max-w-[1200px] mx-auto py-3 px-4 sm:py-4 sm:px-5">
      <Toaster />
      <h1 class="text-white font-mono font-extrabold">SprintPoker🚀</h1>
      <RouterView />
    </div>
  </div>
</template>

<style>
.appx {
  background: rgb(27, 34, 64);
  background: linear-gradient(
    90deg,
    rgba(27, 34, 64, 1) 0%,
    rgba(31, 49, 102, 1) 50%,
    rgba(27, 34, 64, 1) 100%
  );
}
</style>
