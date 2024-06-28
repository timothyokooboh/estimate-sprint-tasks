<script lang="ts" setup>
import { Heart } from 'lucide-vue-next'
</script>

<template>
  <footer
    class="bg-[#161616] flex justify-between items-center flex-wrap gap-x-[30px] gap-y-[20px] py-[48px] px-5 text-white text-xs md:px-10"
  >
    <p>&copy; SprintPoker 2024</p>
    <div class="flex items-center">
      <span> Made with <Heart fill="red" class="inline mx-2 w-4 text-red-900" /> by &nbsp;</span>

      <a href="https://github.com/timothyokooboh" target="_blank" class="hover:text-blue-500">
        Timothy</a
      >
    </div>
  </footer>
</template>
