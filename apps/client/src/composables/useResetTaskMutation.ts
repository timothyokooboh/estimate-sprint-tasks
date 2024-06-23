import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useResetTaskMutation = () => {
  const {
    mutate: resetTask,
    loading,
    error
  } = useMutation(gql`
    mutation resetTask($id: ID!) {
      resetTask(id: $id) {
        id
        title
        status
      }
    }
  `)

  return { resetTask, loading, error }
}
