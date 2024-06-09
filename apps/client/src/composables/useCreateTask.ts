import { useRoute } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { useCreateTaskFormValidation } from '@/composables/useCreateTaskFormValidation'
import gql from 'graphql-tag'
import { useToast } from '@/components/ui/toast/use-toast'

export const useCreateTask = () => {
  const route = useRoute()
  const { toast } = useToast()

  const {
    errors: formValidationError,
    values,
    title,
    titleAttrs,
    handleSubmit
  } = useCreateTaskFormValidation()

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

  const createNewTask = handleSubmit((userInput) => {
    createTask({ input: { title: userInput.title, session: route.params.sessionId } })
  })

  onDone(() => {
    toast({
      title: 'Success',
      description: 'Task created successfully'
    })
  })

  return {
    formValidationError,
    values,
    title,
    titleAttrs,
    createNewTask,
    loading,
    apiError
  }
}
