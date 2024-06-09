<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTasksList } from '@/composables/useTasksList'
const { tasks, activeTasks, completedTasks } = useTasksList()
</script>

<template>
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
</template>

<style scoped></style>
