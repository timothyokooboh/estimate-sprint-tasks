<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useParticipantJoinedSubscription } from '@/composables/useParticipantJoinedSubscription'
import { useVotingStartedSubscription } from '@/composables/useVotingStartedSubscription'
import { useTaskCreatedSubscription } from '@/composables/useTaskCreatedSubscription'
import { useVoteCastedSubscription } from '@/composables/useVoteCastedSubscription'
import { useVotesResetSubscription } from '@/composables/useVotesResetSubscription'
import { useTaskUpdatedSubscription } from '@/composables/useTaskUpdatedSubscription'
import TheHeader from '@/components/TheHeader.vue'
import { useLeaveSessionSubscription } from '@/composables/useLeaveSessionSubscription'
import { useEndSessionSubscription } from '@/composables/useEndSessionSubscription'
import { useDeleteTaskSubscription } from '@/composables/useDeleteTaskSubscription'

// subscriptions
useParticipantJoinedSubscription()
useVotingStartedSubscription()
useTaskCreatedSubscription()
useVoteCastedSubscription()
useVotesResetSubscription()
useTaskUpdatedSubscription()
useLeaveSessionSubscription()
useEndSessionSubscription()
useDeleteTaskSubscription()
</script>

<template>
  <div class="min-h-screen max-w-[1512px] mx-auto text-white">
    <div>
      <Toaster />
      <RouterView />
    </div>
  </div>
</template>
