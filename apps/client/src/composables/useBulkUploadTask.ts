import { ref } from 'vue'
import Papa from 'papaparse'
import { useDropzone } from 'vue3-dropzone'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useToast } from '@/components/ui/toast'

export const useBulkUploadTask = (session: string) => {
  const { toast } = useToast()
  const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop, accept: '.csv' })
  const {
    mutate: bulkUploadTaskMutation,
    loading,
    onDone
  } = useMutation(gql`
    mutation BulkUploadTask($input: BulkCreateTasksInput!) {
      bulkCreateTasks(input: $input) {
        id
        title
        status
      }
    }
  `)

  const file = ref<File>()
  const tasks = ref<string[]>([])

  const updateTasks = (data: { task: string }[]) => {
    /**
     * Use only data on the "task" column of the csv file.
     * Remove empty tasks.
     */
    tasks.value = data
      .map((task: { task: string }) => task.task)
      .filter((task: string) => Boolean(task))
  }

  const hasFiles = (files: File[]) => {
    if (files && files.length > 0) {
      file.value = files[0]
      return true
    }

    toast({
      title: 'Error',
      variant: 'destructive',
      description: 'Kindly upload a csv file'
    })

    return false
  }

  const isCsvFile = () => {
    const extension = file.value!.name.split('.').pop()?.toLowerCase()
    if (extension === 'csv') return true

    toast({
      title: 'Error',
      variant: 'destructive',
      description: 'Kindly upload a CSV file'
    })
    return false
  }

  const parseCsvToJson = () => {
    return new Promise((resolve, reject) => {
      Papa.parse(file.value!, {
        header: true,
        error: (err) => {
          toast({
            title: 'Error',
            variant: 'destructive',
            description: err.message
          })
          reject(err)
        },
        complete: (results: { data: any }) => {
          updateTasks(results.data)
          if (tasks.value.length === 0) {
            toast({
              title: 'Error',
              variant: 'destructive',
              description: 'Kindly add at least one task under the "task" column.'
            })
            reject(new Error('No tasks found in CSV'))
          } else {
            resolve(true)
          }
        }
      })
    })
  }

  const executeBulkUploadTask = () => {
    bulkUploadTaskMutation({ input: { tasks: tasks.value, sessionId: session } })
  }

  async function onDrop(acceptedFiles: File[]) {
    const operations = [
      async () => hasFiles(acceptedFiles),
      async () => isCsvFile(),
      async () => parseCsvToJson(),
      async () => executeBulkUploadTask()
    ]

    for (const operation of operations) {
      try {
        const result = await operation()
        if (!result) return
      } catch (error) {
        return
      }
    }
  }

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    fileName: file.value?.name,
    loading,
    onDone
  }
}
