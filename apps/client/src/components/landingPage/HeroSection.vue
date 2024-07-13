<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Loader2 } from 'lucide-vue-next'
import { useAuth } from '@/store/useAuth'
import { storeToRefs } from 'pinia'

defineEmits(['open:modal'])

const { loading } = storeToRefs(useAuth())
</script>

<template>
  <div class="flex flex-col items-center px-5 mb-[48px] text-center">
    <h2
      class="text-white text-[32px] leading-[140%] mb-2 sm:text-[40px] sm:max-w-[550px] md:text-[63px] md:max-w-[750px]"
    >
      Effortless Task Estimation for Agile Teams
    </h2>

    <p class="mb-5">Simplify sprint task estimation process with SprintPoker 🚀.</p>

    <Button
      variant="secondary"
      class="rounded-[27px] mb-[34px] px-10"
      :disabled="loading"
      @click="$emit('open:modal')"
    >
      <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
      Start a session</Button
    >

    <img src="@/assets/demo.svg" class="mx-auto mb-[32px]" />
  </div>
</template>
