<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateTask } from '@/composables/useCreateTask'
import { Loader2 } from 'lucide-vue-next'

const { loading, title, titleAttrs, createNewTask, formValidationError, onDone, apiError } =
  useCreateTask()

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close:modal'])

onDone(() => {
  emit('close:modal')
})
</script>

<template>
  <Dialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <DialogContent class="w-[90%] max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="mb-3">Add Task</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="createNewTask">
        <div class="mb-5 py-4">
          <div class="">
            <Label for="session-name" class="block mb-3"> Title of task </Label>
            <Input
              id="session-name"
              class="bg-transparent mb-2"
              placeholder="e.g. Integrate API endpoint to list user settings"
              v-model="title"
              v-bind="titleAttrs"
            />
            <p v-if="formValidationError['title']" class="text-xs text-[#94A3B8] mb-2">
              {{ formValidationError['title'] }}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" :disabled="loading">
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            Add Task
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
