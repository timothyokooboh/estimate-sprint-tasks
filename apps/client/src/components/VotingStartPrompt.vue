<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { useStartVoting } from '@/composables/useStartVoting'
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  taskId: string
  sessionId: string
}>()

const { startVoting, loading } = useStartVoting()
const handleStartVoting = () => {
  startVoting({
    input: {
      taskId: props.taskId,
      sessionId: props.sessionId
    }
  })
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-8 px-4 border border-[#283244] rounded-[5px]"
  >
    <p class="text-center mb-2">Click "Start" to begin voting.</p>
    <p class="max-w-[230px] text-center mb-5 text-sm">
      Or use the "Commence voting" option on any of your active tasks.
    </p>
    <Button class="w-[70%]" @click="handleStartVoting" :disabled="loading">
      <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
      Start
    </Button>
  </div>
</template>
