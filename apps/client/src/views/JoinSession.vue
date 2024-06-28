<script setup lang="ts">
import { ref } from 'vue'

import Button from '@/components/ui/button/Button.vue'
import JoinSessionModal from '@/components/JoinSessionModal.vue'
import { Heart } from 'lucide-vue-next'

const isModalOpen = ref(false)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#313131] text-white">
    <header class="py-4 px-[20px] mb-[30px] flex items-center border-b-[2px] border-[#3E3E3E]">
      <RouterLink :to="{ name: 'HomeView' }">
        <div class="flex items-center justify-center h-[35px] w-[35px] bg-white rounded-[50%]">
          <p class="text-[#161616] text-xs">Poker</p>
        </div>
      </RouterLink>
      <div class="flex-grow flex justify-center">
        <RouterLink :to="{ name: 'HomeView' }">
          <h1 class="font-bold text-2xl font-mono">SprintPoker</h1>
        </RouterLink>
      </div>
    </header>

    <div class="max-w-[1612px] mx-auto">
      <div class="flex flex-col items-center px-5 mb-[48px] text-center">
        <h2
          class="text-white text-[32px] leading-[140%] mb-2 sm:text-[40px] sm:max-w-[550px] md:text-[63px] md:max-w-[750px]"
        >
          Effortless Task Estimation for Agile Teams
        </h2>

        <p class="mb-5">You have been invited to join a session on SprintPoker.</p>
        <Button
          variant="secondary"
          class="rounded-[27px] mb-[34px] px-10"
          @click="isModalOpen = true"
          >Join session</Button
        >
        <img src="@/assets/demo.svg" class="mx-auto" />
      </div>
    </div>

    <footer
      class="bg-[#161616] mt-auto flex justify-between items-center flex-wrap gap-x-[30px] gap-y-[20px] py-[48px] px-5 text-white text-xs md:px-10"
    >
      <p>&copy; SprintPoker 2024</p>
      <div class="flex items-center">
        <span> Made with <Heart fill="red" class="inline mx-2 w-4 text-red-900" /> by &nbsp;</span>

        <a href="https://github.com/timothyokooboh" target="_blank"> Timothy</a>
      </div>
    </footer>

    <JoinSessionModal :is-open="isModalOpen" @close:modal="isModalOpen = false" />
  </div>
</template>
