<script setup lang="ts">
import { ref } from 'vue'
import CreateSessionModal from '@/components/CreateSessionModal.vue'
import HeroSection from '@/components/landingPage/HeroSection.vue'
import FeaturesSection from '@/components/landingPage/FeaturesSection.vue'
import FooterSection from '@/components/landingPage/FooterSection.vue'
import FeedbackForm from '@/components/FeedbackForm.vue'
import TheHeader from '@/components/TheHeader.vue'
import { useAuth } from '@/store/useAuth'
import { storeToRefs } from 'pinia'

const { isLoggedIn } = storeToRefs(useAuth())
const { login } = useAuth()
const isModalOpen = ref(false)

const handleStartSession = async () => {
  if (isLoggedIn.value) {
    isModalOpen.value = true
  } else {
    await login()
    isModalOpen.value = true
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#313131] text-white">
    <TheHeader />

    <main class="max-w-[1612px] mx-auto">
      <HeroSection @open:modal="handleStartSession" />
      <FeaturesSection @open:modal="handleStartSession" />
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
