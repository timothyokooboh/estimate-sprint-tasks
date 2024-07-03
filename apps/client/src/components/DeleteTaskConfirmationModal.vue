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
import { Loader2 } from 'lucide-vue-next'
import ModalSpinner from '@/components/ModalSpinner.vue'
import type { Task } from '@/types'

const props = defineProps<{
  isOpen: boolean
  task: Task
}>()

defineEmits(['close:modal'])

const { deleteTask, loading: deletingTask } = useDeleteTaskMutation()
</script>

<template>
  <AlertDialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Task</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this task? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="border border-gray-300">Cancel</AlertDialogCancel>
        <AlertDialogAction class="bg-red-500 hover:bg-red-600" @click="deleteTask({ id: task.id })">
          <Loader2 v-if="deletingTask" class="w-4 h-4 mr-2 animate-spin" />
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <ModalSpinner :is-open="deletingTask" />
</template>
