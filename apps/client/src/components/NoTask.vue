<script lang="ts" setup>
import CreateTask from '@/components/CreateTask.vue'
import BulkUploadTask from '@/components/BulkUploadTask.vue'
import Button from './ui/button/Button.vue'
import { ref } from 'vue'

const isCreateTaskModalOpen = ref(false)
const isBulkUploadModalOpen = ref(false)
</script>

<template>
  <div
    class="flex flex-col items-center justify-center border border-[#283244] rounded-[5px] py-8 px-4"
  >
    <p class="mb-5">You are yet to create any tasks</p>
    <div class="flex flex-wrap items-center justify-center gap-[10px]">
      <Button class="grow" @click="isCreateTaskModalOpen = true">Add Task</Button>
      <Button variant="outline" class="grow" @click="isBulkUploadModalOpen = true">
        Bulk Upload Task
      </Button>
    </div>

    <CreateTask :is-open="isCreateTaskModalOpen" @close:modal="isCreateTaskModalOpen = false" />
    <BulkUploadTask :is-open="isBulkUploadModalOpen" @close:modal="isBulkUploadModalOpen = false" />
  </div>
</template>
