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
import { ref, computed, watchEffect } from 'vue'

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
      <div class="flex justify-center items-center py-10">
        <Loader2 class="w-8 h-8 mr-2 animate-spin" /> Processing...
      </div>
    </DialogContent>
  </Dialog>
</template>
