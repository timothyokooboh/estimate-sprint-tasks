import { useRoute } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { useCreateTaskFormValidation } from '@/composables/useCreateTaskFormValidation'
import gql from 'graphql-tag'
import { useToast } from '@/components/ui/toast/use-toast'

export const useCreateTaskMutation = () => {
  const route = useRoute()

  const {
    mutate: createTask,
    loading,
    onDone,
    error: apiError
  } = useMutation(gql`
    mutation CreateTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        id
        title
        status
      }
    }
  `)

  return {
    createTask,
    loading,
    apiError,
    onDone
  }
}
