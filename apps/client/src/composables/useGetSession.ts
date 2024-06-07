import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { watchEffect } from 'vue'

export const useGetSession = (id: string) => {
  const { result, loading } = useQuery(
    gql`
      query getSession($id: ID!) {
        session(id: $id) {
          title
          status
          tasks {
            id
            title
            averageVote
            status
          }
          moderator {
            id
            name
          }

          participants {
            id
            name
            status
            votes {
              id
              value
              time
              taskId
            }
          }
        }
      }
    `,
    {
      id: id
    }
  )

  watchEffect(() => {
    console.log(result.value)
  })

  return {
    loading,
    session: result
  }
}
