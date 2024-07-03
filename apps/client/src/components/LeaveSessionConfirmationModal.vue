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
import { useLeaveSessionMutation } from '@/composables/useLeaveSessionMutation'
import { Loader2 } from 'lucide-vue-next'
import ModalSpinner from '@/components/ModalSpinner.vue'

const props = defineProps<{
  isOpen: boolean
}>()

defineEmits(['close:modal'])

const route = useRoute()
const { leaveSession, loading: leavingSession } = useLeaveSessionMutation()
</script>

<template>
  <AlertDialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Leave Session</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to leave this session?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="border border-gray-300">Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="bg-red-500 hover:bg-red-600"
          @click="
            leaveSession({
              participant: route.params.participantId as string
            })
          "
        >
          <Loader2 v-if="leavingSession" class="w-4 h-4 mr-2 animate-spin" />
          Yes, leave
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <ModalSpinner :is-open="leavingSession" />
</template>
