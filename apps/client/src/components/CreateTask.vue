<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateTaskMutation } from '@/composables/useCreateTaskMutation'
import { useCreateTaskFormValidation } from '@/composables/useCreateTaskFormValidation'
import { Loader2 } from 'lucide-vue-next'
import { computed, watch } from 'vue'
import { useUpdateTaskMutation } from '@/composables/useUpdateTaskMutation'
import type { Task } from '@/types'
import { useRoute } from 'vue-router'

const props = defineProps<{
  isOpen: boolean
  isEditing?: boolean
  defaultTask?: Task
}>()

const emit = defineEmits(['close:modal'])
const route = useRoute()

const {
  errors: formValidationError,
  title,
  titleAttrs,
  handleSubmit
} = useCreateTaskFormValidation()

const {
  loading: creatingTask,
  createTask,
  onDone: onCreatedTask,
  apiError
} = useCreateTaskMutation()
const { loading: updatingTask, updateTask, onUpdatedTask } = useUpdateTaskMutation()
const loading = computed(() => creatingTask.value || updatingTask.value)

watch(
  () => props.defaultTask?.title,
  () => {
    title.value = props.defaultTask?.title
  },
  {
    immediate: true
  }
)

const submitForm = handleSubmit((values) => {
  if (props.isEditing) {
    updateTask({ input: { id: props.defaultTask?.id, title: values.title } })
  } else {
    createTask({ input: { title: values.title, sessionId: route.params.sessionId } })
  }
})

onCreatedTask(() => {
  emit('close:modal')
})

onUpdatedTask(() => {
  emit('close:modal')
})
</script>

<template>
  <Dialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <DialogContent class="w-[90%] max-w-[425px]">
      <DialogHeader class="text-white">
        <DialogTitle class="mb-3 font-normal">{{
          isEditing ? 'Update Task' : 'Add Task'
        }}</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="submitForm">
        <div class="mb-5 py-4">
          <div class="">
            <Label for="session-name" class="block mb-3 text-white"> Title of task </Label>
            <Input
              id="session-name"
              class="mb-2 bg-transparent text-white"
              placeholder="e.g. Integrate API endpoint to list user settings"
              v-model="title"
              v-bind="titleAttrs"
            />
            <p v-if="formValidationError['title']" class="text-xs text-red-500 mb-2">
              {{ formValidationError['title'] }}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" :disabled="loading" class="w-full">
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'Update Task' : ' Add Task' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
