import { useToast } from '@/components/ui/toast'
import { onError } from '@apollo/client/link/error'
import { ApolloServerErrorCode } from '@apollo/server/errors'

export const useErrorHandling = () => {
  const { toast } = useToast()
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      const { message, extensions } = graphQLErrors[0]
      let toastMessage = message
      if (extensions.code === ApolloServerErrorCode.INTERNAL_SERVER_ERROR) {
        toastMessage = 'Unable to process request at this time. Please try again.'
      }

      toast({
        title: 'Error',
        variant: 'destructive',
        description: toastMessage
      })
    }

    if (networkError) {
      if (networkError.message) {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: networkError.message
        })
      }
    }
  })

  return {
    errorLink
  }
}
