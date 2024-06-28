<script setup lang="ts">
import { ref } from 'vue'

import CreateSessionModal from '@/components/CreateSessionModal.vue'
import HeroSection from '@/components/landingPage/HeroSection.vue'
import FeaturesSection from '@/components/landingPage/FeaturesSection.vue'
import FooterSection from '@/components/landingPage/FooterSection.vue'
import FeedbackForm from '@/components/FeedbackForm.vue'

const isModalOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-[#313131] text-white">
    <header class="py-4 px-[20px] mb-[30px] flex items-center border-b-[2px] border-[#3E3E3E]">
      <div class="flex items-center justify-center h-[35px] w-[35px] bg-white rounded-[50%]">
        <p class="text-[#161616] text-xs">Poker</p>
      </div>
      <div class="flex-grow flex justify-center">
        <h1 class="font-bold text-2xl font-mono">SprintPoker</h1>
      </div>
    </header>

    <main class="max-w-[1612px] mx-auto">
      <HeroSection @open:modal="isModalOpen = true" />
      <FeaturesSection @open:modal="isModalOpen = true" />
      <section class="py-[48px] px-5 mb-10 md:max-w-[800px] md:mx-auto">
        <p class="uppercase text-white mb-1">Feedback</p>
        <p class="text-white text-sm mb-4">Have any feedback? Let us know!</p>
        <FeedbackForm />
      </section>
      <FooterSection />

      <CreateSessionModal :is-open="isModalOpen" @close:modal="isModalOpen = false" />
    </main>
  </div>
</template>
