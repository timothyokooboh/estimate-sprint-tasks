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

// subscriptions
useParticipantJoinedSubscription()
useVotingStartedSubscription()
useTaskCreatedSubscription()
useVoteCastedSubscription()
useVotesResetSubscription()
useTaskUpdatedSubscription()
useLeaveSessionSubscription()
useEndSessionSubscription()
</script>

<template>
  <div class="min-h-screen text-white">
    <div class="max-w-[1200px] mx-auto py-5 px-4 sm:py-10 sm:px-6">
      <Toaster />
      <TheHeader />
      <RouterView />
    </div>
  </div>
</template>
