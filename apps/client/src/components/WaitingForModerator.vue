<script lang="ts" setup>
import { Clock } from 'lucide-vue-next'

defineProps<{
  moderatorName: string
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-8 px-4 border border-[#283244] rounded-[5px]"
  >
    <Clock :size="50" class="mb-3" />
    <p class="max-w-[200px] text-center">
      Waiting for {{ moderatorName }} to start the voting session
    </p>
  </div>
</template>
