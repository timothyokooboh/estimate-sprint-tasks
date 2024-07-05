<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useParticipantJoinedSubscription } from '@/composables/useParticipantJoinedSubscription'
import { useVotingStartedSubscription } from '@/composables/useVotingStartedSubscription'
import { useTaskCreatedSubscription } from '@/composables/useTaskCreatedSubscription'
import { useCastVoteSubscription } from '@/composables/useCastVoteSubscription'
import { useResetTaskSubscription } from '@/composables/useResetTaskSubscription'
import { useTaskUpdatedSubscription } from '@/composables/useTaskUpdatedSubscription'
import { useLeaveSessionSubscription } from '@/composables/useLeaveSessionSubscription'
import { useEndSessionSubscription } from '@/composables/useEndSessionSubscription'
import { useDeleteTaskSubscription } from '@/composables/useDeleteTaskSubscription'
import { onMounted } from 'vue'

// subscriptions
useParticipantJoinedSubscription()
useVotingStartedSubscription()
useTaskCreatedSubscription()
useCastVoteSubscription()
useResetTaskSubscription()
useTaskUpdatedSubscription()
useLeaveSessionSubscription()
useEndSessionSubscription()
useDeleteTaskSubscription()

function sendPathToParent() {
  window.parent.postMessage({ path: window.location.pathname }, '*')
}

onMounted(() => {
  // Listen for route changes
  window.addEventListener('popstate', sendPathToParent)
  // if using a library that triggers pushstate
  window.addEventListener('pushstate', sendPathToParent)
  // if using a library that triggers replacestate
  window.addEventListener('replacestate', sendPathToParent)
})

// Initial path on load
sendPathToParent()
</script>

<template>
  <div class="text-white">
    <div>
      <Toaster />
      <RouterView />
    </div>
  </div>
</template>
