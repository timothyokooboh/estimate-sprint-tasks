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

const { loading, title, titleAttrs, createNewTask, formValidationError, apiError } = useCreateTask()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="grow">Add Task</Button>
    </DialogTrigger>

    <DialogContent class="w-[90%] max-w-[425px]" backdrop-bg="bg-transparent">
      <DialogHeader>
        <DialogTitle class="mb-3">Add a task</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="createNewTask">
        <div class="mb-5 py-4">
          <div class="">
            <Label for="session-name" class="block mb-3"> Title of task </Label>
            <Input
              id="session-name"
              placeholder="e.g. Integrate API endpoint to user list preferences"
              class="mb-2"
              v-model="title"
              v-bind="titleAttrs"
            />
            <p v-if="formValidationError['title']" class="text-xs text-red-500 mb-2">
              {{ formValidationError['title'] }}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            Add Task
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
