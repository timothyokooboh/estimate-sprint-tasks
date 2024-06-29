<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'
import Button from '@/components/ui/button/Button.vue'

// Async components
const CreateTaskModal = defineAsyncComponent(() => import('@/components/CreateTaskModal.vue'))
const BulkUploadTaskModal = defineAsyncComponent(
  () => import('@/components/BulkUploadTaskModal.vue')
)

const isCreateTaskModalOpen = ref(false)
const isBulkUploadModalOpen = ref(false)
</script>

<template>
  <div
    class="flex flex-col items-center justify-center border border-[#283244] rounded-md py-8 px-4"
  >
    <p class="mb-5">Create Tasks</p>
    <div class="flex flex-wrap items-center justify-center gap-[10px]">
      <Button class="grow" @click="isCreateTaskModalOpen = true">Add Task</Button>
      <Button variant="outline" class="grow" @click="isBulkUploadModalOpen = true">
        Bulk Upload Task
      </Button>
    </div>

    <CreateTaskModal
      v-if="isCreateTaskModalOpen"
      :is-open="isCreateTaskModalOpen"
      @close:modal="isCreateTaskModalOpen = false"
    />

    <BulkUploadTaskModal
      v-if="isBulkUploadModalOpen"
      :is-open="isBulkUploadModalOpen"
      @close:modal="isBulkUploadModalOpen = false"
    />
  </div>
</template>
