<script setup lang="ts">
import { ref } from 'vue'

import CreateSessionModal from '@/components/CreateSessionModal.vue'
import Button from '@/components/ui/button/Button.vue'
import { MoveRight, Heart } from 'lucide-vue-next'
import FeedbackForm from '@/components/FeedbackForm.vue'

const isModalOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-[#313131] text-white">
    <header class="py-4 px-[20px] mb-[30px] flex items-center border-b-[2px] border-[#3E3E3E]">
      <div class="flex items-center justify-center h-[35px] w-[35px] bg-white rounded-[50%]">
        <p class="text-[#161616] text-xs">Poker</p>
      </div>
      <div class="flex-grow flex justify-center">
        <h1 class="font-bold text-2xl font-mono">SprintPoker</h1>
      </div>
    </header>

    <div class="max-w-[1612px] mx-auto">
      <div class="flex flex-col items-center px-5 mb-[48px] text-center">
        <h2
          class="text-white text-[32px] leading-[140%] mb-2 sm:text-[40px] sm:max-w-[550px] md:text-[63px] md:max-w-[750px]"
        >
          Effortless Task Estimation for Agile Teams
        </h2>

        <p class="mb-5">Simplify sprint task estimation process with SprintPoker 🚀.</p>
        <Button
          variant="secondary"
          class="rounded-[27px] mb-[34px] px-10"
          @click="isModalOpen = true"
          >Start a session</Button
        >
        <img src="@/assets/demo.svg" class="mx-auto mb-[32px]" />
      </div>

      <section class="bg-[#161616] py-[48px] px-5 mb-5 md:px-10">
        <p class="uppercase text-white mb-3">Features</p>

        <div class="grid gap-y-[20px] md:grid-cols-2 md:gap-7">
          <div>
            <p class="text-white leading-[120%] text-[24px] mb-2">Seamless collaboration</p>
            <p class="text-sm mb-[34px] max-w-[350px]">
              Start a session, invite
              <span class="text-[#E27600]"> unlimited number of participants </span> and begin
              real-time collaboration for free.
            </p>

            <a
              href="#"
              class="w-fit flex items-center gap-x-[10px] mb-3 duration-200 hover:text-blue-500"
              @click.prevent="isModalOpen = true"
            >
              <MoveRight />
              <span>Start a session</span>
            </a>

            <img src="/collaboration.png" class="mx-auto mb-4" />
          </div>

          <div class="md:bg-[#313131] md:py-4 md:px-[20px] md:rounded-lg">
            <p class="text-white leading-[120%] text-[24px] mb-2">Create tasks</p>
            <p class="text-sm mb-[34px] max-w-[350px]">
              Add tasks to your session either
              <span class="text-[#E27600]"> manually or by bulk uploading</span> a csv file.
            </p>
            <a
              href="#"
              class="w-fit flex items-center gap-x-[10px] mb-3 duration-200 hover:text-blue-500"
              @click.prevent="isModalOpen = true"
            >
              <MoveRight />
              <span>Start a session</span>
            </a>
            <img src="/tasks-board.png" class="mx-auto mb-4" />
          </div>

          <div class="md:bg-[#313131] md:py-4 md:px-[20px] md:rounded-lg">
            <p class="text-white leading-[120%] text-[24px] mb-2">Estimate sprint tasks</p>
            <p class="text-sm mb-[34px] max-w-[350px]">
              Provide estimates for sprint tasks either in
              <span class="text-[#E27600]"> time estimates or story points. </span>
            </p>
            <a
              href="#"
              class="w-fit flex items-center gap-x-[10px] mb-3 duration-200 hover:text-blue-500"
              @click.prevent="isModalOpen = true"
            >
              <MoveRight />
              <span>Start a session</span>
            </a>

            <img src="/estimates.png" class="mx-auto mb-4" />
          </div>

          <div>
            <p class="text-white leading-[120%] text-[24px] mb-2">Download PDF report.</p>
            <p class="text-sm mb-[34px] max-w-[350px]">
              Download a PDF report containing
              <span class="text-[#E27600]"> relevant data captured during the session </span> such
              as participants, tasks, votes per participant and average vote per task.
            </p>
            <a
              href="#"
              class="w-fit flex items-center gap-x-[10px] mb-3 duration-200 hover:text-blue-500"
              @click.prevent="isModalOpen = true"
            >
              <MoveRight />
              <span>Start a session</span>
            </a>
            <img src="/report.png" class="mx-auto mb-4" />
          </div>
        </div>
      </section>

      <section class="py-[48px] px-5 mb-10 md:max-w-[900px] md:mx-auto">
        <p class="uppercase text-white mb-1">Feedback</p>
        <p class="text-white text-sm mb-4">Have any feedback? Let us know!</p>
        <FeedbackForm />
      </section>
    </div>

    <footer
      class="bg-[#161616] flex justify-between items-center flex-wrap gap-x-[30px] gap-y-[20px] py-[48px] px-5 text-white text-xs md:px-10"
    >
      <p>&copy; SprintPoker 2024</p>
      <div class="flex items-center">
        <span> Made with <Heart fill="red" class="inline mx-2 w-4 text-red-900" /> by &nbsp;</span>

        <a href="https://github.com/timothyokooboh" target="_blank" class="hover:text-blue-500">
          Timothy</a
        >
      </div>
    </footer>

    <CreateSessionModal :is-open="isModalOpen" @close:modal="isModalOpen = false" />
  </div>
</template>
