<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import VotingStartPrompt from '@/components/VotingStartPrompt.vue'
import WaitingForModerator from '@/components/WaitingForModerator.vue'
import ParticipantsList from '@/components/ParticipantsList.vue'
import NoTask from '@/components/NoTask.vue'
import InviteParticipant from '@/components/InviteParticipant.vue'
import TasksList from '@/components/TasksList.vue'
import Button from '@/components/ui/button/Button.vue'
import BarChart from '@/components/BarChart.vue'
import { useToast } from '@/components/ui/toast'
import VotingPanel from '@/components/VotingPanel.vue'

import { Loader2 } from 'lucide-vue-next'
import { useViewSession } from '@/composables/useViewSession'
import { useResetVotesMutation } from '@/composables/useResetVotesMutation'
import { useUpdateTaskMutation } from '@/composables/useUpdateTaskMutation'
import { useTasksList } from '@/composables/useTasksList'

import { getObjectProperty } from '@/helpers'
import { SESSION_STATUS, TASK_STATUS, type Participant, type Task } from '@/types'

const router = useRouter()
const route = useRoute()
const { toast } = useToast()
const { variables, session, activeParticipants, loading, currentUser, tasks, refetch } =
  useViewSession(route.params.sessionId as string)

watch(
  () => route.params.sessionId,
  (newValue) => {
    if (newValue) {
      variables.value = { id: newValue as string }
      refetch({ id: route.params.sessionId as string })
    }
  },
  {
    immediate: true
  }
)

watch(
  () => session.value?.status,
  (newValue) => {
    if (newValue === SESSION_STATUS['INACTIVE']) {
      toast({
        title: 'Session ended',
        description: 'This session has ended'
      })

      setTimeout(() => {
        router.push({ name: 'HomeView' })
      }, 3000)
    }
  },
  {
    immediate: true
  }
)

const { activeTasks } = useTasksList()
const { updateTask, loading: updatingTask } = useUpdateTaskMutation()
const { resetVotes, loading: resettingVotes } = useResetVotesMutation()

const currentTask = computed(() => {
  return tasks.value?.find((task: Task) => task.id === session.value?.currentTaskId)
})

const handleResetVotes = () => {
  const votes = activeParticipants.value
    ?.filter((participant: Participant) => participant.vote != null)
    .map((participant: Participant) => {
      return participant.vote.id
    })

  if (currentTask.value?.status === TASK_STATUS['COMPLETED']) {
    updateTask({ input: { id: currentTask.value.id, status: TASK_STATUS['ACTIVE'] } })
  }
  resetVotes({ input: { votes } })
}

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
const showNextTaskButton = computed(() => {
  return (
    currentUser.value?.isModerator &&
    activeTasks.value.length > 0 &&
    currentTask.value?.status === TASK_STATUS['COMPLETED']
  )
})
</script>

<template>
  <div>
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

      <VotingPanel
        v-if="currentTask?.status === TASK_STATUS['ACTIVE']"
        :current-task="currentTask"
      />

      <BarChart
        v-if="currentTask?.status === TASK_STATUS['COMPLETED']"
        :current-task-id="currentTask?.id"
        :participants="activeParticipants"
        :average-vote="Number(currentTask?.averageVote)"
        class="mt-3"
      />

      <div class="border border-[#283244] rounded-[5px] py-5 px-4 h-fit">
        <div class="flex gap-x-[10px] mb-4">
          <Button
            v-if="currentUser?.isModerator && isVotingOngoing"
            variant="outline"
            :disabled="updatingTask"
            @click="
              updateTask({ input: { id: currentTask?.id, status: TASK_STATUS['COMPLETED'] } })
            "
          >
            <Loader2 v-if="updatingTask" class="w-4 h-4 mr-2 animate-spin" />
            End voting
          </Button>

          <Button
            v-if="currentUser?.isModerator && currentTask"
            variant="outline"
            @click="handleResetVotes"
            :disabled="resettingVotes"
          >
            <Loader2 v-if="resettingVotes" class="w-4 h-4 mr-2 animate-spin" />
            Clear votes
          </Button>

          <Button v-if="showNextTaskButton" variant="outline">
            <Loader2 v-if="false" class="w-4 h-4 mr-2 animate-spin" />
            Next Task
          </Button>
        </div>

        <ParticipantsList
          :participants="activeParticipants"
          :tasks="tasks"
          :current-task-id="getObjectProperty(session, 'currentTaskId', null)"
        />
      </div>
    </div>

    <TasksList :currentUser="currentUser" />
  </div>
</template>
