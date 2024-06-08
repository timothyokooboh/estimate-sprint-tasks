<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import CreateTask from '@/components/CreateTask.vue'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center border border-[#283244] rounded-[5px] py-8 px-4"
  >
    <p class="mb-5">You are yet to create any tasks</p>
    <div class="flex flex-wrap items-center justify-center gap-[10px]">
      <CreateTask />
      <Button variant="outline" class="grow"> Bulk Upload Task </Button>
    </div>
  </div>
</template>
