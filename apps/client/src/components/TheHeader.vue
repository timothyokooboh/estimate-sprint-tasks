<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { useViewSession } from '@/composables/useViewSession'
import LeaveSessionConfirmationModal from '@/components/LeaveSessionConfirmationModal.vue'
import EndSessionConfirmationModal from '@/components/EndSessionConfirmationModal.vue'

const route = useRoute()
const { currentUser, variables } = useViewSession(route.params.sessionId as string)

const isLeaveSessionModalOpen = ref(false)
const isEndSessionModalOpen = ref(false)

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

<template>
  <div>
    <header class="flex justify-between items-center mb-[50px]">
      <h1 class="text-white font-mono font-extrabold">SprintPoker🚀</h1>
      <Button
        v-if="currentUser && currentUser.isModerator"
        variant="destructive"
        @click="isEndSessionModalOpen = true"
      >
        End session
      </Button>
      <Button
        v-else-if="currentUser && !currentUser.isModerator"
        variant="destructive"
        @click="isLeaveSessionModalOpen = true"
      >
        Leave session
      </Button>
    </header>

    <LeaveSessionConfirmationModal
      :is-open="isLeaveSessionModalOpen"
      @close:modal="isLeaveSessionModalOpen = false"
    />

    <EndSessionConfirmationModal
      :is-open="isEndSessionModalOpen"
      @close:modal="isEndSessionModalOpen = false"
    />
  </div>
</template>
