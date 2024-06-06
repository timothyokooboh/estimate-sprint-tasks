<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-brand-bg">
    <p
      class="fixed top-[10px] left-[20px] text-white font-mono font-extrabold sm:top-[20px] sm:left-[30px]"
    >
      SprintPoker🚀
    </p>
    <RouterView />
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
