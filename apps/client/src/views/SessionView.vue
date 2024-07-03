<script lang="ts" setup>
import { computed, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ParticipantsList from '@/components/ParticipantsList.vue'
import InviteParticipant from '@/components/InviteParticipant.vue'
import TasksList from '@/components/TasksList.vue'
import Button from '@/components/ui/button/Button.vue'
import { useToast } from '@/components/ui/toast'
import TheHeader from '@/components/TheHeader.vue'
import SessionLoader from '@/components/SessionLoader.vue'
import AppTransition from '@/components/AppTransition.vue'
import { Loader2 } from 'lucide-vue-next'
import { useViewSession } from '@/composables/useViewSession'
import { useResetTaskMutation } from '@/composables/useResetTaskMutation'
import { useUpdateTaskMutation } from '@/composables/useUpdateTaskMutation'
import { useStartVoting } from '@/composables/useStartVoting'
import { useTasksList } from '@/composables/useTasksList'
import { getObjectProperty } from '@/helpers'
import { SESSION_STATUS, TASK_STATUS, type Activity, type Task } from '@/types'

// Async components
const NoTask = defineAsyncComponent(() => import('@/components/NoTask.vue'))
const VotingStartPrompt = defineAsyncComponent(() => import('@/components/VotingStartPrompt.vue'))
const VotingPanel = defineAsyncComponent(() => import('@/components/VotingPanel.vue'))
const WaitingForModerator = defineAsyncComponent(
  () => import('@/components/WaitingForModerator.vue')
)
const BarChart = defineAsyncComponent(() => import('@/components/BarChart.vue'))

const router = useRouter()
const route = useRoute()
const { toast } = useToast()

const { variables, session, activeParticipants, loading, currentUser, refetch } = useViewSession(
  route.params.sessionId as string
)
const { tasks, activeTasks } = useTasksList()
const { updateTask, loading: updatingTask, onUpdatedTask } = useUpdateTaskMutation()
const { resetTask, loading: resettingTask } = useResetTaskMutation()
const { startVoting, loading: nextTaskLoading } = useStartVoting()

const isModerator = computed(() => getObjectProperty(currentUser.value, 'isModerator', false))
const showNoTasks = computed(() => isModerator.value && tasks.value?.length === 0)
const showVotingStartPrompt = computed(() => {
  return isModerator.value && activeTasks.value?.length > 0 && !currentTask.value
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

const currentTask = computed(() => {
  return tasks.value?.find((task: Task) => task.id === session.value?.currentTaskId)
})

const activity = computed<Activity>(() => {
  if (showNoTasks.value) return 'No task'
  if (showVotingStartPrompt.value) return 'Start voting'
  if (isWaitingForModerator.value) return 'Waiting for moderator'
  if (currentTask.value && currentTask.value.status === TASK_STATUS['ACTIVE']) return 'Voting panel'
  else if (currentTask.value && currentTask.value.status === TASK_STATUS['COMPLETED'])
    return 'Bar chart'
  return 'No task'
})

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

const setNextTask = () => {
  startVoting({
    input: {
      taskId: activeTasks.value[0].id,
      sessionId: route.params.sessionId
    }
  })
}
</script>

<template>
  <div class="bg-[#161616] min-h-screen p-4 md:p-8">
    <SessionLoader v-if="loading" />

    <div v-else class="max-w-[1512px] mx-auto">
      <TheHeader />

      <div>
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
          <AppTransition>
            <NoTask v-if="activity === 'No task'" />

            <VotingStartPrompt
              v-if="activity === 'Start voting'"
              :task-id="tasks[0]?.id"
              :session-id="route.params.sessionId as string"
            />

            <WaitingForModerator
              v-if="activity === 'Waiting for moderator'"
              :moderatorName="getObjectProperty(session, 'moderator.name', '')"
              class="flex flex-col items-center justify-center py-8 px-4 border border-[#283244] rounded-md"
            />

            <VotingPanel v-if="activity === 'Voting panel'" :current-task="currentTask" />

            <BarChart
              v-if="activity === 'Bar chart'"
              :current-task="currentTask"
              :participants="activeParticipants"
              :average-vote="Number(currentTask?.averageVote)"
              :estimation-mode="session.estimationMode"
              class="mt-3"
            />
          </AppTransition>

          <div class="border border-[#283244] rounded-md py-5 px-4 h-fit">
            <div class="flex gap-x-[10px] mb-4">
              <AppTransition from="top">
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
              </AppTransition>

              <Button
                v-if="currentUser?.isModerator && currentTask"
                variant="outline"
                @click="resetTask({ id: currentTask.id })"
                :disabled="resettingTask"
              >
                <Loader2 v-if="resettingTask" class="w-4 h-4 mr-2 animate-spin" />
                Clear votes
              </Button>

              <Button v-if="showNextTaskButton" variant="outline" @click="setNextTask">
                <Loader2 v-if="nextTaskLoading" class="w-4 h-4 mr-2 animate-spin" />
                Next Task
              </Button>
            </div>

            <ParticipantsList
              :participants="activeParticipants"
              :is-moderator="isModerator"
              :tasks="tasks"
              :current-task-id="getObjectProperty(session, 'currentTaskId', null)"
            />
          </div>
        </div>

        <TasksList :currentUser="currentUser" />
      </div>
    </div>
  </div>
</template>
