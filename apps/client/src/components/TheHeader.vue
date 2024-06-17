<template>
  <header class="flex justify-between items-center mb-[50px]">
    <h1 class="text-white font-mono font-extrabold">SprintPoker🚀</h1>
    <Button
      v-if="currentUser && currentUser.isModerator"
      variant="destructive"
      :disabled="endingSession"
      @click="
        endSession({
          id: route.params.sessionId as string
        })
      "
    >
      <Loader2 v-if="endingSession" class="w-4 h-4 mr-2 animate-spin" />
      End session
    </Button>
    <Button
      v-else-if="currentUser && !currentUser.isModerator"
      variant="destructive"
      :disabled="loading"
      @click="
        leaveSession({
          participant: route.params.participantId as string
        })
      "
    >
      <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
      Leave session
    </Button>
  </header>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useEndSessionMutation } from '@/composables/useEndSessionMutation'
import { useLeaveSessionMutation } from '@/composables/useLeaveSessionMutation'
import { useViewSession } from '@/composables/useViewSession'
import { Loader2 } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { currentUser, variables } = useViewSession(route.params.sessionId as string)
const { leaveSession, loading } = useLeaveSessionMutation()
const { endSession, loading: endingSession } = useEndSessionMutation()

watch(
  () => route.params.sessionId,
  (newValue) => {
    if (newValue) {
      variables.value = { id: newValue as string }
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped></style>
