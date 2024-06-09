<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { useViewSession } from '@/composables/useViewSession'
import ParticipantsList from '@/components/ParticipantsList.vue'
import NoTask from '@/components/NoTask.vue'
import InviteParticipant from '@/components/InviteParticipant.vue'
import TasksList from '@/components/TasksList.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { session, participants, loading, currentUser, isModerator } = useViewSession(
  route.params.sessionId as string,
  route.params.participantId as string
)
</script>

<template>
  <!-- TODO: USE SKELETON LOADER FOR LOADING STATE-->
  <div class="mt-5 flex flex-col gap-y-[20px] sm:flex-row sm:justify-between sm:items-center">
    <div>
      <p class="text-white text-[18px] sm:text-2xl">Hello, {{ currentUser?.name }}!</p>
      <p class="text-white">Welcome to {{ session?.session?.title }}</p>
    </div>

    <InviteParticipant class="sm:w-[300px]" />
  </div>

  <div class="mt-5 grid gap-x-[40px] gap-y-[20px] md:grid-cols-2">
    <!-- <NoTask v-if="isModerator && session?.session?.tasks?.length === 0" /> -->
    <NoTask />

    <!-- Participants-->
    <ParticipantsList :participants="participants" :is-moderator="isModerator" />
  </div>

  <!-- TASKS -->
  <div class="border border-[#283244] rounded-[5px] py-4 px-4 mt-5">
    <div class="flex justify-between items-center border-b-[1px] border-b-[#283244] pb-2">
      <span>Tasks</span>
      <Button variant="ghost">+ New</Button>
    </div>

    <TasksList />
  </div>
</template>
