<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <Dialog class="backdrop-opacity-0 backdrop-brightness-0">
    <DialogTrigger as-child>
      <Button class="grow">Add Task</Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]" backdrop-bg="bg-transparent">
      <DialogHeader>
        <DialogTitle class="mb-3">Add a task</DialogTitle>
      </DialogHeader>

      <form>
        <div class="grid gap-x-4 gap-y-6 py-4">
          <div class="">
            <Label for="session-name" class="block mb-2"> Title of task </Label>
            <Input
              id="session-name"
              placeholder="e.g. Integrate API endpoint to user list preferences"
              class="mb-2"
            />
            <p class="text-xs text-red-500 mb-2"></p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            class="transition-all duration-300 hover:bg-primary hover:translate-y-[-1px]"
          >
            <Loader2 v-if="false" class="w-4 h-4 mr-2 animate-spin" />
            Add Task
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
