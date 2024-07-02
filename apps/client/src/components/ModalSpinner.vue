<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <Dialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <DialogContent class="w-[90%] max-w-[425px]">
      <div class="flex justify-center items-center py-10">
        <Loader2 class="w-8 h-8 mr-2 animate-spin" /> Processing...
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
