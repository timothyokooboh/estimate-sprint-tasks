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
import { UploadCloud, Loader, Loader2, LoaderPinwheel } from 'lucide-vue-next'
import { useBulkUploadTask } from '@/composables/useBulkUploadTask'
import { useRoute } from 'vue-router'
import BaseTransition from './BaseTransition.vue'

const route = useRoute()
const { getInputProps, getRootProps, isDragActive, fileName, loading } = useBulkUploadTask(
  route.params.sessionId as string
)
</script>

<template>
  <Dialog class="backdrop-opacity-0 backdrop-brightness-0">
    <DialogTrigger as-child>
      <Button variant="outline" class="grow"> Bulk Upload Task </Button>
    </DialogTrigger>

    <DialogContent class="w-[90%] max-w-[425px]" backdrop-bg="bg-transparent">
      <DialogHeader>
        <DialogTitle class="mb-3">Bulk Upload Task</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <button v-bind="getRootProps()" class="border border-dashed border-[#283244] rounded-md">
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
        <Button variant="link">Download a template</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
