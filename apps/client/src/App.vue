<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useParticipantJoinedSubscription } from '@/composables/useParticipantJoinedSubscription'
import { useVotingStartedSubscription } from '@/composables/useVotingStartedSubscription'
import { useTaskCreatedSubscription } from '@/composables/useTaskCreatedSubscription'
import { useVoteCastedSubscription } from '@/composables/useVoteCastedSubscription'
import { useVotesResetSubscription } from '@/composables/useVotesResetSubscription'

// subscriptions
useParticipantJoinedSubscription()
useVotingStartedSubscription()
useTaskCreatedSubscription()
useVoteCastedSubscription()
useVotesResetSubscription()
</script>

<template>
  <div class="min-h-screen text-white">
    <div class="max-w-[1200px] mx-auto py-3 px-4 sm:py-4 sm:px-5">
      <Toaster />
      <h1 class="text-white font-mono font-extrabold">SprintPoker🚀</h1>
      <RouterView />
    </div>
  </div>
</template>
