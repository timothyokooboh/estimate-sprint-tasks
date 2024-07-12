<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getObjectProperty } from '@/helpers/getObjectProperty'
import jsPDF from 'jspdf'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { DownloadCloud, Loader2 } from 'lucide-vue-next'
import { useViewSession } from '@/composables/useViewSession'

const route = useRoute()
const { activeParticipants, tasks, session } = useViewSession(route.params.sessionId as string)

const loading = ref(false)

const exportReport = async () => {
  loading.value = true
  const container = document.querySelector('#container')
  const html = container?.innerHTML!

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  })

  doc.html(html, {
    callback: function (doc) {
      doc.save('report.pdf')
      loading.value = false
    }
  })
}
</script>

<template>
  <div>
    <Button variant="outline" :disabled="loading" @click="exportReport">
      <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
      <DownloadCloud class="w-4 h-4 mr-2" /> Download report
    </Button>

    <div class="hidden" id="container">
      <div id="report" class="font-sans w-[595px] text-[12px]">
        <div
          class="flex flex-col justify-center mb-3 bg-slate-900 text-white pt-2 pb-5 px-3 h-[150px]"
        >
          <p class="mb-2">SprintPoker</p>
          <p class="mb-2">
            <span class="font-bold">Title: </span>
            <span>{{ getObjectProperty(session, 'title') }}</span>
          </p>
          <p>
            {{ format(Number(session.createdAt), 'dd MMM, yyyy') }}
          </p>
        </div>

        <div class="py-2 px-3 border-b">
          <p class="font-bold mb-1">Participants ({{ activeParticipants.length }})</p>
          <div
            v-for="(participant, index) in activeParticipants"
            :key="participant.id"
            class="mb-2"
          >
            <p>
              {{ index + 1 }}.
              {{ participant.name }}
              <span
                v-if="participant.id === session?.moderator?.id"
                class="text-gray-600 text-[8px]"
              >
                (Moderator)</span
              >
            </p>
          </div>
        </div>

        <div class="py-2 px-3">
          <p class="font-bold mb-1">Tasks ({{ tasks.length }})</p>
          <p v-if="tasks.length === 0">There are no tasks yet.</p>

          <div v-for="(task, index) in tasks" :key="task.id" class="mb-2">
            <p class="mb-1">{{ index + 1 }}. {{ task.title }}</p>
            <div>
              <p class="text-gray-700 font-bold text-[8px] uppercase">Breakdown of votes</p>
              <p
                v-for="vote in task.votes"
                :key="`task_${vote.id}`"
                class="text-gray-700 text-[10px]"
              >
                {{ vote.participant.name }} => {{ vote.value }}
                {{ session.estimationMode === 'STORY_POINTS' ? 'SP' : 'hr' }}
              </p>
              <p class="text-gray-700 font-bold text-[10px]">
                Average vote => {{ task.averageVote ? Number(task.averageVote).toFixed(2) : 0 }}
                {{ session.estimationMode === 'STORY_POINTS' ? 'SP' : 'hr' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
