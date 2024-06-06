<script setup lang="ts">
import { computed } from 'vue'

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
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/toast/use-toast'
import { Loader2 } from 'lucide-vue-next'

import { useCreateSessionFormValidation } from '@/composables/useCreateSessionFormValidation'
import { useCreateSessionForm } from '@/composables/useCreateSessionForm'
import { useAddParticipant } from '@/composables/useAddParticipant'
import { useHandleRememberSessionTitle } from '@/composables/useHandleRememberSessionTitle'

const { toast } = useToast()

const {
  sessionTitle,
  sessionTitleAttrs,
  moderatorName,
  moderatorNameAttrs,
  rememberSessionTitle,
  rememberSessionTitleAttrs,
  rememberModeratorName,
  rememberModeratorNameAttrs,
  errors,
  values,
  handleSubmit
} = useCreateSessionFormValidation()

const { createSession, creatingSession, onCreatedSession } = useCreateSessionForm()

const { handleRememberSessionTitle } = useHandleRememberSessionTitle()

const {
  addParticipant: addModerator,
  addingParticipant: addingModerator,
  onAddedParticipant: onAddedModerator
} = useAddParticipant()

const startSession = handleSubmit((values) => {
  createSession({ input: { title: values.sessionTitle } })
})

onCreatedSession((result) => {
  const { createSession: session } = result.data
  handleRememberSessionTitle(values.rememberSessionTitle!, sessionTitle.value)
  addModerator({ input: { name: values.moderatorName, session: session.id, isModerator: true } })
})

onAddedModerator(() => {
  toast({
    title: 'Success',
    description: 'Your session has been created'
  })
})

const loading = computed(() => creatingSession.value || addingModerator.value)
</script>

<template>
  <Dialog class="backdrop-opacity-0 backdrop-brightness-0">
    <DialogTrigger as-child>
      <Button class="transition-all duration-300 hover:bg-primary hover:translate-y-[-1px]"
        >Start a session 🚀</Button
      >
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]" backdrop-bg="bg-transparent">
      <DialogHeader>
        <DialogTitle class="mb-3">Start a session</DialogTitle>
        <DialogDescription> Enter your name and a title for the session. </DialogDescription>
      </DialogHeader>

      <form @submit="startSession">
        <div class="grid gap-x-4 gap-y-5 py-4">
          <div class="">
            <Label for="session-name" class="block mb-2"> Title of session </Label>
            <Input
              id="session-name"
              v-model="sessionTitle"
              v-bind="sessionTitleAttrs"
              placeholder="e.g. Dev sprint planning"
              class="col-span-3 mb-2"
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
            <Label for="username" class="block mb-2"> Your name </Label>
            <Input
              id="username"
              v-model="moderatorName"
              v-bind="moderatorNameAttrs"
              placeholder="e.g. John Doe"
              class="col-span-3 mb-2"
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

        <DialogFooter>
          <Button
            type="submit"
            :disabled="loading"
            class="transition-all duration-300 hover:bg-primary hover:translate-y-[-1px]"
          >
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            Start Session
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
