v
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
import { useEndSessionMutation } from '@/composables/useEndSessionMutation'
import { Loader2 } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const props = defineProps<{
  isOpen: boolean
}>()

const route = useRoute()
const { endSession, loading: endingSession } = useEndSessionMutation()
</script>

<template>
  <AlertDialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>End Session</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to end this session?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="border border-gray-300">Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="bg-red-500 hover:bg-red-600"
          @click="
            endSession({
              id: route.params.sessionId as string
            })
          "
        >
          <Loader2 v-if="endingSession" class="w-4 h-4 mr-2 animate-spin" />
          Yes, End
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
