<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import InviteParticipant from '@/components/InviteParticipant.vue'
import { UserCheck, UserCheckIcon } from 'lucide-vue-next'
import type { Participant } from '@/types'

defineProps<{
  participants: Participant[]
  isModerator: boolean
}>()
</script>

<template>
  <div class="border border-[#283244] rounded-[5px] py-8 px-4">
    <h3 class="mb-3 border-b-[1px] border-b-[#283244] pb-3">Participants</h3>

    <div
      v-for="participant in participants"
      :key="participant.id"
      class="flex justify-between items-center border-b-[1px] border-b-[#283244] pb-3 mb-3"
    >
      <div class="flex items-center">
        <TooltipProvider v-if="isModerator">
          <Tooltip>
            <TooltipTrigger>
              <UserCheck :size="30" class="mr-2" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Moderator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <UserCheck v-else :size="30" class="mr-2" />

        <span>{{ participant.name }}</span>
      </div>
    </div>

    <InviteParticipant />
  </div>
</template>

<style scoped></style>
