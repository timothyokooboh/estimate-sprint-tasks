import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useDeleteTaskMutation = () => {
  const { mutate: deleteTask, loading } = useMutation(gql`
    mutation deleteTask($id: ID!) {
      deleteTask(id: $id)
    }
  `)

  return {
    deleteTask,
    loading
  }
}
