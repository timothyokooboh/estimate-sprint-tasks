<script lang="ts" setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center border border-[#283244] rounded-[5px] py-8 px-4"
  >
    <p class="mb-5">You are yet to create any tasks</p>
    <div class="flex items-center justify-center">
      <Button class="mr-3">Create Task</Button>
      <Button variant="outline"> Bulk Upload Task </Button>
    </div>
  </div>
</template>
