import { useRoute } from 'vue-router'
import { useViewSession } from './useViewSession'
import { computed } from 'vue'
import { TASK_STATUS, type Task } from '@/types'

export const useTasksList = () => {
  const route = useRoute()
  const { tasks } = useViewSession(
    route.params.sessionId as string,
    route.params.participantId as string
  )

  const activeTasks = computed(() => {
    return tasks.value?.filter((task: Task) => task.status === TASK_STATUS['ACTIVE'])
  })

  const completedTasks = computed(() => {
    return tasks.value?.filter((task: Task) => task.status === TASK_STATUS['COMPLETED'])
  })

  return {
    tasks,
    activeTasks,
    completedTasks
  }
}
