<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { NumberField, NumberFieldContent, NumberFieldInput } from '@/components/ui/number-field'

import VotingStartPrompt from '@/components/VotingStartPrompt.vue'
import WaitingForModerator from '@/components/WaitingForModerator.vue'
import ParticipantsList from '@/components/ParticipantsList.vue'
import NoTask from '@/components/NoTask.vue'
import InviteParticipant from '@/components/InviteParticipant.vue'
import TasksList from '@/components/TasksList.vue'
import { useViewSession } from '@/composables/useViewSession'
import type { Participant, Task } from '@/types'
import { getObjectProperty } from '@/helpers'
import Button from '@/components/ui/button/Button.vue'
import { Loader2 } from 'lucide-vue-next'
import { useCastVoteMutation } from '@/composables/useCastVoteMutation'
import { useResetVotesMutation } from '@/composables/useResetVotesMutation'

const route = useRoute()
const { session, participants, loading, currentUser, tasks } = useViewSession(
  route.params.sessionId as string,
  route.params.participantId as string
)
const { resetVotes, loading: resettingVotes } = useResetVotesMutation()
const handleResetVotes = () => {
  const votes = participants.value
    ?.filter((participant: Participant) => participant.vote != null)
    .map((participant: Participant) => {
      return participant.vote.id
    })

  resetVotes({ input: { votes } })
}

const { createVote, updateVote } = useCastVoteMutation()
const castVote = (score: number) => {
  const vote = getObjectProperty(currentUser.value, 'vote', null)
  if (vote) {
    updateVote({ input: { id: vote.id, value: String(score) } })
  } else {
    createVote({
      input: {
        value: String(score),
        task: currentTask.value.id,
        participant: currentUser.value.id
      }
    })
  }
}

const selectedVote = ref(null)
const currentTask = computed(() => {
  return tasks.value?.find((task: Task) => task.id === session.value?.currentTaskId)
})

const isModerator = computed(() => getObjectProperty(currentUser.value, 'isModerator', false))
const showNoTasks = computed(() => isModerator.value && tasks.value?.length === 0)
const showVotingStartPrompt = computed(() => {
  return isModerator.value && tasks.value?.length > 0 && !currentTask.value
})
const isWaitingForModerator = computed(() => !isModerator.value && !currentTask.value)
const isVotingOngoing = computed(() => {
  if (!currentTask.value) return false
  return currentTask.value.status === 'ACTIVE'
})

const u = ref(8)
const possibleValues = ref([
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10
])
</script>

<template>
  <!-- TODO: USE SKELETON LOADER FOR LOADING STATE-->
  <div class="mt-5 flex flex-col gap-y-[20px] sm:flex-row sm:justify-between sm:items-center">
    <div>
      <p class="text-white text-[18px] sm:text-2xl">
        Hello, {{ getObjectProperty(currentUser, 'name') }}!
      </p>
      <p class="text-[#64748B]">Welcome to {{ getObjectProperty(session, 'title') }}.</p>
    </div>

    <InviteParticipant class="sm:w-[300px]" />
  </div>

  <div class="mt-5 grid gap-x-[40px] gap-y-[20px] md:grid-cols-2">
    <NoTask v-if="showNoTasks" />

    <VotingStartPrompt
      v-if="showVotingStartPrompt"
      :task-id="tasks[0]?.id"
      :session-id="route.params.sessionId as string"
    />

    <WaitingForModerator
      v-if="isWaitingForModerator"
      :moderatorName="getObjectProperty(session, 'moderator.name', '')"
      class="flex flex-col items-center justify-center py-8 px-4 border border-[#283244] rounded-[5px]"
    />

    <div v-if="currentTask" class="py-5 px-4 border border-[#283244] rounded-[5px]">
      <p class="mb-2 text-sm text-center">{{ currentTask.title }}</p>
      <p class="mb-6 text-sm text-[#64748B] text-center uppercase">Cast your vote</p>
      <div class="flex flex-wrap justify-center gap-[20px] place-items-center">
        <button
          v-for="value in possibleValues"
          :key="value"
          @click="castVote(value)"
          class="h-[50px] w-[50px] flex flex-col justify-center items-center border border-[#283244] rounded-[5px] text-sm hover:bg-[#212121] duration-200"
        >
          {{ value }}
        </button>

        <NumberField id="other">
          <NumberFieldContent>
            <NumberFieldInput placeholder="Other e.g 20" class="bg-transparent text-white" />
          </NumberFieldContent>
        </NumberField>
      </div>
    </div>

    <div class="border border-[#283244] rounded-[5px] py-5 px-4 h-fit">
      <div v-if="currentUser?.isModerator && isVotingOngoing" class="flex gap-x-[10px] mb-4">
        <Button variant="outline">End voting</Button>
        <Button variant="outline" @click="handleResetVotes" :disabled="resettingVotes">
          <Loader2 v-if="resettingVotes" class="w-4 h-4 mr-2 animate-spin" />
          Clear votes
        </Button>
      </div>

      <ParticipantsList
        :participants="participants"
        :tasks="tasks"
        :current-task-id="getObjectProperty(session, 'currentTaskId', null)"
      />
    </div>
  </div>

  <TasksList :currentUser="currentUser" />
</template>
