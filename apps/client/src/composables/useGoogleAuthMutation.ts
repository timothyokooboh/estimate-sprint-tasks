import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useGoogleAuthMutation = () => {
  const { mutate, loading, onDone } = useMutation(gql`
    mutation GoogleSignIn($access_token: String!) {
      googleSignIn(access_token: $access_token) {
        token
        user {
          id
          email
          name
          picture
        }
      }
    }
  `)

  return {
    mutate,
    loading,
    onDone
  }
}
