import { useRoute } from 'vue-router'
import { useViewSession } from './useViewSession'
import { computed, watch } from 'vue'
import { TASK_STATUS, type Task } from '@/types'

export const useTasksList = () => {
  const route = useRoute()
  const { tasks, variables } = useViewSession(route.params.sessionId as string)

  watch(
    () => route.params.sessionId,
    (newValue) => {
      if (newValue) {
        variables.value = { id: newValue as string }
      }
    },
    {
      immediate: true
    }
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
