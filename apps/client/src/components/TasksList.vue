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
import DeleteTaskConfirmationModal from '@/components/DeleteTaskConfirmationModal.vue'
import { MoreVertical } from 'lucide-vue-next'
import { useTasksList } from '@/composables/useTasksList'
import { getObjectProperty } from '@/helpers'
import type { Participant, Task } from '@/types'
import { useDeleteTaskMutation } from '@/composables/useDeleteTaskMutation'
import { useStartVoting } from '@/composables/useStartVoting'
import { useRoute } from 'vue-router'

defineProps<{
  currentUser: Participant
}>()

const route = useRoute()
const { tasks, activeTasks, completedTasks } = useTasksList()
const { startVoting, loading: comencingVoting } = useStartVoting()

const isCreateTaskModalOpen = ref(false)
const isBulkUploadModalOpen = ref(false)
const isDeleteTaskModalOpen = ref(false)
const selectedTask = ref<Task | undefined>(undefined)
const isEditing = ref(false)

const commenceVoting = (task: Task) => {
  startVoting({
    input: {
      taskId: task.id,
      sessionId: route.params.sessionId
    }
  })
}

const openModalToEditTask = (task: Task) => {
  isEditing.value = true
  selectedTask.value = task
  isCreateTaskModalOpen.value = true
}

const openModalToDeleteTask = (task: Task) => {
  console.log('delete task')
  selectedTask.value = task
  isDeleteTaskModalOpen.value = true
}

const closeModal = () => {
  isEditing.value = false
  isCreateTaskModalOpen.value = false
}
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
      </TabsList>

      <TabsContent value="active" class="max-h-[200px] overflow-auto">
        <p v-if="activeTasks.length === 0" class="bg-gray-800 py-3 px-4 mb-2 text-center">
          There are no active tasks
        </p>

        <div
          v-for="task in activeTasks"
          :key="task.id"
          class="flex justify-between items-center bg-gray-800 py-3 px-4 mb-2"
        >
          <p>
            {{ task.title }}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical :size="20" tabindex="0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem class="cursor-pointer" @click="commenceVoting(task)"
                >Commence voting</DropdownMenuItem
              >
              <DropdownMenuItem class="cursor-pointer" @click="openModalToEditTask(task)"
                >Edit</DropdownMenuItem
              >
              <DropdownMenuItem class="cursor-pointer" @click="openModalToDeleteTask(task)"
                >Delete</DropdownMenuItem
              >
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TabsContent>

      <TabsContent value="completed" class="max-h-[200px] overflow-auto">
        <p v-if="completedTasks.length === 0" class="bg-gray-800 py-3 px-4 mb-2 text-center">
          There are no completed tasks
        </p>

        <div
          v-for="task in completedTasks"
          :key="task.id"
          class="flex justify-between items-center bg-gray-800 py-3 px-4 mb-2"
        >
          <p>
            {{ task.title }}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical :size="20" tabindex="0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem class="cursor-pointer" @click="openModalToDeleteTask(task)"
                >Delete</DropdownMenuItem
              >
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TabsContent>
    </Tabs>
  </div>

  <CreateTask
    :is-editing="isEditing"
    :is-open="isCreateTaskModalOpen"
    @close:modal="closeModal"
    :default-task="selectedTask"
  />

  <BulkUploadTask :is-open="isBulkUploadModalOpen" @close:modal="isBulkUploadModalOpen = false" />

  <DeleteTaskConfirmationModal
    :is-open="isDeleteTaskModalOpen"
    :task="selectedTask!"
    @close:modal="isDeleteTaskModalOpen = false"
  />
</template>
