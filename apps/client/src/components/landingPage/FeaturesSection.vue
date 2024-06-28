<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { MoveRight } from 'lucide-vue-next'

defineEmits(['open:modal'])
</script>

<template>
  <section class="bg-[#161616] py-[48px] px-5 mb-5 md:px-10">
    <p class="uppercase text-white mb-3">Features</p>

    <div class="grid gap-y-[20px] md:grid-cols-2 md:gap-x-[30px] md:gap-y-[50px]">
      <div class="border border-[#313131] py-3 px-5 rounded-lg">
        <p class="text-white leading-[120%] text-[24px] mb-2">Seamless collaboration</p>
        <p class="text-sm mb-[34px] max-w-[350px]">
          Start a session, invite
          <span class="text-[#E27600]"> unlimited number of participants </span> and begin real-time
          collaboration for free.
        </p>

        <a
          href="#"
          class="w-fit flex items-center gap-x-[10px] mb-3 duration-200 hover:text-blue-500"
          @click="$emit('open:modal')"
        >
          <MoveRight />
          <span>Start a session</span>
        </a>

        <img src="/collaboration.png" class="mx-auto mb-4" />
      </div>

      <div class="border border-[#313131] py-3 px-5 rounded-lg">
        <p class="text-white leading-[120%] text-[24px] mb-2">Create tasks</p>
        <p class="text-sm mb-[34px] max-w-[350px]">
          Add tasks to your session either
          <span class="text-[#E27600]"> manually or by bulk uploading</span> a csv file.
        </p>
        <a
          href="#"
          class="w-fit flex items-center gap-x-[10px] mb-3 duration-200 hover:text-blue-500"
          @click="$emit('open:modal')"
        >
          <MoveRight />
          <span>Start a session</span>
        </a>
        <img src="/tasks-board.png" class="mx-auto mb-4" />
      </div>

      <div class="border border-[#313131] py-3 px-5 rounded-lg">
        <p class="text-white leading-[120%] text-[24px] mb-2">Estimate sprint tasks</p>
        <p class="text-sm mb-[34px] max-w-[350px]">
          Provide estimates for sprint tasks either in
          <span class="text-[#E27600]"> time estimates or story points. </span>
        </p>
        <a
          href="#"
          class="w-fit flex items-center gap-x-[10px] mb-3 duration-200 hover:text-blue-500"
          @click="$emit('open:modal')"
        >
          <MoveRight />
          <span>Start a session</span>
        </a>

        <img src="/estimates.png" class="mx-auto mb-4" />
      </div>

      <div class="border border-[#313131] py-3 px-5 rounded-lg">
        <p class="text-white leading-[120%] text-[24px] mb-2">Download PDF report.</p>
        <p class="text-sm mb-[34px] max-w-[350px]">
          Download a PDF report containing
          <span class="text-[#E27600]"> relevant data captured during the session </span> such as
          participants, tasks, votes per participant and average vote per task.
        </p>
        <a
          href="#"
          class="w-fit flex items-center gap-x-[10px] mb-3 duration-200 hover:text-blue-500"
          @click="$emit('open:modal')"
        >
          <MoveRight />
          <span>Start a session</span>
        </a>
        <img src="/report.png" class="mx-auto mb-4" />
      </div>
    </div>

    <div
      class="bg-[#313131] rounded-lg flex flex-col justify-center items-center mt-10 py-8 px-5 md:py-[70px] md:px-10 md:mx-[100px]"
    >
      <p
        class="text-center text-2xl leading-[160%] max-w-[450px] mb-5 md:text-3xl md:leading-[160%]"
      >
        Simplify sprint task estimation process with SprintPoker
      </p>
      <Button class="px-10 rounded-[27px]" @click="$emit('open:modal')">Start a session</Button>
    </div>
  </section>
</template>
