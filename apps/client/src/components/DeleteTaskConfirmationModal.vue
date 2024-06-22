<script lang="ts" setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useDeleteTaskMutation } from '@/composables/useDeleteTaskMutation'
import type { Task } from '@/types'
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  task: Task
}>()

const { deleteTask, loading: deletingTask } = useDeleteTaskMutation()
</script>

<template>
  <AlertDialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this task? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="deleteTask({ id: task.id })">
          <Loader2 v-if="deletingTask" class="w-4 h-4 mr-2 animate-spin" />
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
