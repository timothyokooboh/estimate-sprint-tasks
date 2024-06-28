<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div>
    <div class="flex justify-between flex-wrap gap-5 items-center mb-10">
      <Skeleton class="w-24 h-5" />
      <div class="flex items-center gap-x-3">
        <Skeleton class="w-24 h-5" />
        <Skeleton class="w-24 h-5" />
      </div>
    </div>

    <div class="flex justify-between flex-wrap gap-5 items-center mb-10">
      <div>
        <Skeleton class="w-[150px] h-5 mb-3" />
        <Skeleton class="w-[150px] h-5" />
      </div>

      <div>
        <Skeleton class="w-[150px] h-5 mb-3" />
        <Skeleton class="w-[150px] h-5" />
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-x-[100px] gap-y-[50px] mb-10">
      <Skeleton class="w-full h-[200px]" />
      <Skeleton class="w-full h-[200px]" />
    </div>

    <Skeleton class="w-full h-[200px]" />
  </div>
</template>

<style scoped></style>
