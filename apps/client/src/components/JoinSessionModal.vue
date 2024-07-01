<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-vue-next'
import { useJoinSession } from '@/composables/useJoinSession'

const props = defineProps<{
  isOpen: boolean
}>()

defineEmits(['close:modal'])

const { submit, loading, rememberName, rememberNameAttrs, name, nameAttrs, errors } =
  useJoinSession()
</script>

<template>
  <Dialog
    :open="props.isOpen"
    @update:open="$emit('close:modal')"
    class="backdrop-opacity-0 backdrop-brightness-0"
  >
    <DialogContent class="w-[90%] max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="mb-3">Join session</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="submit">
        <div class="mb-6">
          <div>
            <Label for="username" class="block mb-3"> Your name </Label>
            <Input
              id="username"
              v-model="name"
              v-bind="nameAttrs"
              placeholder="e.g. John Doe"
              class="mb-2 bg-transparent"
            />
            <p class="text-xs text-red-500 mb-2">{{ errors['name'] }}</p>
            <div class="flex items-center space-x-2">
              <Checkbox
                type="checkbox"
                id="remember-name"
                v-model:checked="rememberName"
                v-bind="rememberNameAttrs"
              />
              <label for="remember-name" class="text-sm text-muted-foreground select-none">
                Remember my name for future sessions
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" :disabled="loading" class="w-full">
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            Join Session
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
