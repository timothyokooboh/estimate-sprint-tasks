<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-vue-next'
import { useCreateSession } from '@/composables/useCreateSession'

const props = defineProps<{
  isOpen: boolean
}>()

defineEmits(['close:modal'])

const {
  startSession,
  loading,
  sessionTitle,
  sessionTitleAttrs,
  rememberSessionTitle,
  rememberSessionTitleAttrs,
  rememberModeratorName,
  rememberModeratorNameAttrs,
  moderatorName,
  moderatorNameAttrs,
  estimationMode,
  estimationModeAttrs,
  errors,
  isModalOpen
} = useCreateSession()
</script>

<template>
  <Dialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <DialogContent class="w-[90%] max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="mb-3">Start a session</DialogTitle>
        <DialogDescription> Enter your name and a title for the session. </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="startSession">
        <div class="grid gap-x-4 gap-y-6 py-4">
          <div class="">
            <Label for="session-name" class="block mb-3"> Title of session </Label>
            <Input
              id="session-name"
              v-model="sessionTitle"
              v-bind="sessionTitleAttrs"
              placeholder="e.g. Dev sprint planning"
              class="mb-2 bg-transparent"
            />
            <p class="text-xs text-red-500 mb-2">{{ errors['sessionTitle'] }}</p>
            <div class="flex items-center space-x-2">
              <Checkbox
                type="checkbox"
                id="remember-title"
                v-model:checked="rememberSessionTitle"
                v-bind="rememberSessionTitleAttrs"
              />
              <label for="remember-title" class="text-sm text-muted-foreground select-none">
                Remember this title for future sessions
              </label>
            </div>
          </div>

          <div>
            <Label for="username" class="block mb-3"> Your name </Label>
            <Input
              id="username"
              v-model="moderatorName"
              v-bind="moderatorNameAttrs"
              placeholder="e.g. John Doe"
              class="mb-2 bg-transparent"
            />
            <p class="text-xs text-red-500 mb-2">{{ errors['moderatorName'] }}</p>
            <div class="flex items-center space-x-2">
              <Checkbox
                type="checkbox"
                id="remember-name"
                v-model:checked="rememberModeratorName"
                v-bind="rememberModeratorNameAttrs"
              />
              <label for="remember-name" class="text-sm text-muted-foreground select-none">
                Remember my name for future sessions
              </label>
            </div>
          </div>
        </div>

        <div>
          <Label for="estimationMode" class="block mb-3"> How would tasks be estimated? </Label>
          <RadioGroup
            default-value="TIME_ESTIMATES"
            v-model="estimationMode"
            v-bind="estimationModeAttrs"
          >
            <div class="flex items-center space-x-2 mb-2">
              <RadioGroupItem id="time" value="TIME_ESTIMATES" />
              <Label for="time">Time estimates</Label>
            </div>

            <div class="flex items-center space-x-2">
              <RadioGroupItem id="storyPoints" value="STORY_POINTS" />
              <Label for="storyPoints">Story points</Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button type="submit" :disabled="loading" class="w-full mt-8">
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            Start Session
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
