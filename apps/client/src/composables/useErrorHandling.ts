import { useToast } from '@/components/ui/toast'
import { onError } from '@apollo/client/link/error'

export const useErrorHandling = () => {
  const { toast } = useToast()
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(
        ({ message, locations, path }) => {
          toast({
            title: 'Error',
            variant: 'destructive',
            description: message
          })
        }
        //console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      )
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
