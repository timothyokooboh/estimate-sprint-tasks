<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { VisuallyHidden } from 'radix-vue'
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
}>()

const isShown = ref(false)

watchEffect(() => {
  isShown.value = props.isOpen
})
</script>

<template>
  <Dialog :open="isShown" @update:open="isShown = false">
    <DialogContent class="w-[90%] max-w-[425px]">
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
      </VisuallyHidden>
      <DialogDescription>
        <div class="flex justify-center items-center py-10">
          <Loader2 class="w-8 h-8 mr-2 animate-spin" /> Processing...
        </div>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>
