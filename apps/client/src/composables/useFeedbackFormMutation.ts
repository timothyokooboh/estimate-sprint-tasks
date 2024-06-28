import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useFeedbackFormMutation = () => {
  const {
    mutate: sendFeedback,
    loading,
    onDone
  } = useMutation(gql`
    mutation SendFeedback($input: SendFeedbackInput!) {
      sendFeedback(input: $input) {
        id
        message
        fullName
        email
      }
    }
  `)

  return {
    sendFeedback,
    loading,
    onDone
  }
}
