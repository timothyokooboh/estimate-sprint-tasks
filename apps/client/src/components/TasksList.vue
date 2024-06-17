<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import CreateTask from '@/components/CreateTask.vue'
import BulkUploadTask from '@/components/BulkUploadTask.vue'
import { useTasksList } from '@/composables/useTasksList'
import { getObjectProperty } from '@/helpers'
import type { Participant } from '@/types'

defineProps<{
  currentUser: Participant
}>()

const { tasks, activeTasks, completedTasks } = useTasksList()

const isCreateTaskModalOpen = ref(false)
const isBulkUploadModalOpen = ref(false)
</script>

<template>
  <div class="border border-[#283244] rounded-[5px] py-4 px-4 mt-5">
    <div class="flex justify-between items-center border-b-[1px] border-b-[#283244] pb-2">
      <span>Tasks</span>

      <DropdownMenu v-if="getObjectProperty(currentUser, 'isModerator', false)">
        <DropdownMenuTrigger>+ New</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="isCreateTaskModalOpen = true" class="cursor-pointer"
            >Create Task</DropdownMenuItem
          >
          <DropdownMenuItem @click="isBulkUploadModalOpen = true" class="cursor-pointer"
            >Bulk Upload Tasks</DropdownMenuItem
          >
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <Tabs default-value="active" class="mt-5">
      <TabsList class="bg-transparent">
        <TabsTrigger value="active"> Active </TabsTrigger>
        <TabsTrigger value="completed"> Completed </TabsTrigger>
        <TabsTrigger value="all"> All </TabsTrigger>
      </TabsList>

      <TabsContent value="active" class="max-h-[200px] overflow-auto">
        <p v-if="activeTasks.length === 0" class="bg-[#212121] py-3 px-4 mb-2 text-center">
          There are no active tasks
        </p>

        <p v-for="task in activeTasks" :key="task.id" class="bg-[#212121] py-3 px-4 mb-2">
          {{ task.title }}
        </p>
      </TabsContent>

      <TabsContent value="completed" class="max-h-[200px] overflow-auto">
        <p v-if="completedTasks.length === 0" class="bg-[#212121] py-3 px-4 mb-2 text-center">
          There are no completed tasks
        </p>

        <p v-for="task in completedTasks" :key="task.id" class="bg-[#212121] py-3 px-4 mb-2">
          {{ task.title }}
        </p>
      </TabsContent>

      <TabsContent value="all" class="max-h-[200px] overflow-auto">
        <p v-if="tasks.length === 0" class="bg-[#212121] py-3 px-4 mb-2 text-center">
          There are no tasks
        </p>

        <p v-for="task in tasks" :key="task.id" class="bg-[#212121] py-3 px-4 mb-2">
          {{ task.title }}
        </p>
      </TabsContent>
    </Tabs>
  </div>

  <CreateTask :is-open="isCreateTaskModalOpen" @close:modal="isCreateTaskModalOpen = false" />
  <BulkUploadTask :is-open="isBulkUploadModalOpen" @close:modal="isBulkUploadModalOpen = false" />
</template>

<style scoped></style>
