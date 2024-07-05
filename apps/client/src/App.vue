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
import { useRouter } from 'vue-router'

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
</script>

<template>
  <div class="text-white">
    <div>
      <Toaster />
      <RouterView />
    </div>
  </div>
</template>
