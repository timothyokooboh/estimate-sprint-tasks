v
<script lang="ts" setup>
import { useRoute } from 'vue-router'
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
import ModalSpinner from '@/components/ModalSpinner.vue'
import { Loader2 } from 'lucide-vue-next'
import { useEndSessionMutation } from '@/composables/useEndSessionMutation'

const props = defineProps<{
  isOpen: boolean
}>()

defineEmits(['close:modal'])

const route = useRoute()
const { endSession, loading: endingSession } = useEndSessionMutation()
</script>

<template>
  <AlertDialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>End Session</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to end this session? You can first download the report incase you
          have not done so.
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

  <ModalSpinner :is-open="endingSession" />
</template>
