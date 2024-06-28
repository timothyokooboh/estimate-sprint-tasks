<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'
import { UploadCloud, Loader2 } from 'lucide-vue-next'
import { useBulkUploadTask } from '@/composables/useBulkUploadTask'
import { useRoute } from 'vue-router'
import BaseTransition from './BaseTransition.vue'
import { useToast } from '@/components/ui/toast'

const route = useRoute()
const { getInputProps, getRootProps, isDragActive, fileName, loading, onDone } = useBulkUploadTask(
  route.params.sessionId as string
)

const props = defineProps<{
  isOpen: boolean
}>()

const { toast } = useToast()
const emit = defineEmits(['close:modal'])

onDone(() => {
  emit('close:modal')
  toast({
    title: 'Success',
    description: 'Tasks uploaded successfully'
  })
})
</script>

<template>
  <Dialog :open="props.isOpen" @update:open="$emit('close:modal')">
    <DialogContent class="w-[90%] max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="mb-3">Bulk Upload Tasks</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <button v-bind="getRootProps()" class="border border-dashed rounded-md mb-2">
        <input v-bind="getInputProps()" />
        <p v-if="isDragActive">Drop the files here ...</p>
        <div class="flex flex-col items-center justify-center py-4">
          <UploadCloud class="mb-3" />

          <BaseTransition from="bottom">
            <div v-if="loading" key="loader" class="flex items-center gap-x-[10px]">
              <Loader2 :size="40" class="animate-spin" />
              <p>Uploading tasks...</p>
            </div>

            <div v-else key="description">
              <p class="text-sm">Drag file here or click to upload.</p>
              <p class="text-xs mb-2">.csv file only.</p>
            </div>
          </BaseTransition>

          <p v-if="fileName" class="text-sm">{{ fileName }}</p>
        </div>
      </button>

      <div class="flex items-center gap-x-[20px]">
        <div class="grow h-[1px] bg-gray-200" />
        <p class="text-sm">OR</p>
        <div class="grow h-[1px] bg-gray-200" />
      </div>

      <div class="text-center">
        <a href="/bulk_upload_task_template.csv" download>
          <Button variant="link" class="text-white">Download a template</Button>
        </a>
      </div>
    </DialogContent>
  </Dialog>
</template>
