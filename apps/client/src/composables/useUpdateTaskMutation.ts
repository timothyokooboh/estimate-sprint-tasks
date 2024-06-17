import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useUpdateTaskMutation = () => {
  const {
    mutate: updateTask,
    onDone: onUpdatedTask,
    loading,
    error
  } = useMutation(gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
      updateTask(input: $input) {
        id
        title
        status
      }
    }
  `)

  return {
    updateTask,
    onUpdatedTask,
    loading,
    error
  }
}
