<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import InviteParticipant from '@/components/InviteParticipant.vue'
import { User, UserCheck, Settings } from 'lucide-vue-next'
import type { Participant, Task } from '@/types'
import { computed } from 'vue'
import { getObjectProperty } from '@/helpers'

const props = defineProps<{
  participants: Participant[]
  currentTaskId: null | string
  tasks: Task[]
}>()

const currentTask = computed(() => {
  return props.tasks?.find((task: Task) => task.id === props.currentTaskId)
})

const isVotingOngoing = computed(() => {
  if (!currentTask.value) return false
  return currentTask.value.status === 'ACTIVE'
})

const numberOfParticipantsYetToVote = computed(() => {
  return props.participants?.filter((participant: Participant) => participant.vote == null).length
})
</script>

<template>
  <div class="max-h-[350px] overflow-auto">
    <div class="mb-3 border-b-[1px] border-b-[#283244] pb-3">
      <h3>Participants</h3>
      <p v-if="isVotingOngoing && numberOfParticipantsYetToVote > 0" class="text-[#64748B] mt-2">
        {{ numberOfParticipantsYetToVote }}
        {{ numberOfParticipantsYetToVote === 1 ? 'participant is' : 'participants are' }} yet to
        vote
      </p>
    </div>

    <div
      v-for="participant in participants"
      :key="participant.id"
      class="flex justify-between items-center border-b-[1px] border-b-[#283244] pb-3 mb-3"
    >
      <div class="flex items-center">
        <TooltipProvider v-if="participant.isModerator">
          <Tooltip>
            <TooltipTrigger>
              <Settings :size="20" class="mr-2 text-[#64748B]" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Moderator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <User v-if="!participant.isModerator" :size="20" class="mr-2 text-[#64748B]" />

        <span class="text-[#64748B]">{{ participant.name }}</span>
      </div>
      <p class="text-lg">{{ getObjectProperty(participant, 'vote.value', null) }}</p>
    </div>

    <InviteParticipant />
  </div>
</template>

<style scoped></style>
