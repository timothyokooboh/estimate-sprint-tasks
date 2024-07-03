<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import ModalSpinner from '@/components/ModalSpinner.vue'
import DeleteTaskConfirmationModal from '@/components/DeleteTaskConfirmationModal.vue'
import { MoreVertical } from 'lucide-vue-next'
import { useTasksList } from '@/composables/useTasksList'
import { useStartVoting } from '@/composables/useStartVoting'
import { getObjectProperty } from '@/helpers'
import type { Participant, Task } from '@/types'

// Async components
const CreateTaskModal = defineAsyncComponent(() => import('@/components/CreateTaskModal.vue'))
const BulkUploadTaskModal = defineAsyncComponent(
  () => import('@/components/BulkUploadTaskModal.vue')
)

defineProps<{
  currentUser: Participant
}>()

const route = useRoute()
const { activeTasks, completedTasks } = useTasksList()
const { startVoting, loading: initiatingVoting } = useStartVoting()

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
  selectedTask.value = task
  isDeleteTaskModalOpen.value = true
}

const closeModal = () => {
  isEditing.value = false
  isCreateTaskModalOpen.value = false
}
</script>

<template>
  <div class="border border-[#283244] rounded-md py-4 px-4 mt-5">
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

      <TabsContent value="active" class="">
        <p v-if="activeTasks.length === 0" class="bg-gray-800 py-3 px-4 mb-2 text-center">
          There are no active tasks
        </p>

        <div
          v-for="task in activeTasks"
          :key="task.id"
          class="bg-gray-800 flex justify-between items-center py-3 px-4 mb-2"
        >
          <p>
            {{ task.title }}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical
                :size="20"
                tabindex="0"
                v-if="getObjectProperty(currentUser, 'isModerator', false)"
              />
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

      <TabsContent value="completed" class="">
        <p v-if="completedTasks.length === 0" class="bg-gray-800 py-3 px-4 mb-2 text-center">
          There are no completed tasks
        </p>

        <div
          v-for="task in completedTasks"
          :key="task.id"
          class="bg-gray-800 flex justify-between items-center py-3 px-4 mb-2"
        >
          <p>
            {{ task.title }}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical
                :size="20"
                tabindex="0"
                v-if="getObjectProperty(currentUser, 'isModerator', false)"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem class="cursor-pointer" @click="openModalToDeleteTask(task)"
                >Delete</DropdownMenuItem
              >
              <DropdownMenuItem class="cursor-pointer" @click="commenceVoting(task)"
                >Re-initiate voting</DropdownMenuItem
              >
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TabsContent>
    </Tabs>
  </div>

  <CreateTaskModal
    v-if="isCreateTaskModalOpen"
    :is-editing="isEditing"
    :is-open="isCreateTaskModalOpen"
    @close:modal="closeModal"
    :default-task="selectedTask"
  />

  <BulkUploadTaskModal
    v-if="isBulkUploadModalOpen"
    :is-open="isBulkUploadModalOpen"
    @close:modal="isBulkUploadModalOpen = false"
  />

  <DeleteTaskConfirmationModal
    v-if="selectedTask"
    :is-open="isDeleteTaskModalOpen"
    :task="selectedTask"
    @close:modal="isDeleteTaskModalOpen = false"
  />

  <ModalSpinner :is-open="initiatingVoting" />
</template>
