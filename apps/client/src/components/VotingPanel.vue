<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { useCastVoteMutation } from '@/composables/useCastVoteMutation'
import debounce from 'lodash.debounce'
import { ESTIMATION_MODE, type Task } from '@/types'
import { useViewSession } from '@/composables/useViewSession'
import { useRoute } from 'vue-router'
import { getObjectProperty } from '@/helpers'
import { on } from 'events'

const props = defineProps<{
  currentTask: Task
}>()

const route = useRoute()
const { currentUser, estimationMode } = useViewSession(route.params.sessionId as string)
const { castVote } = useCastVoteMutation()

const possibleVoteOptions = ref([
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10
])
const customVoteOption = ref<null | number>(null)
const selectedVote = ref<null | number>(null)

watch(customVoteOption, (newValue) => {
  if (newValue != null) {
    debounceCastVote()
  }
})

watch(
  () => currentUser?.value?.vote?.value,
  () => {
    selectedVote.value = currentUser.value?.vote?.value
    if (selectedVote.value == null) {
      customVoteOption.value = null
      return
    }
    if (!possibleVoteOptions.value.includes(Number(selectedVote.value))) {
      customVoteOption.value = selectedVote.value
    }
  },
  { immediate: true }
)

const debounceCastVote = debounce(function () {
  if (customVoteOption.value) {
    castVote({
      input: {
        value: Number(customVoteOption.value),
        taskId: props.currentTask?.id,
        participantId: currentUser.value.id
      }
    })
  }
}, 2000)

const handleCastVote = (score: number) => {
  customVoteOption.value = null
  selectedVote.value = score

  castVote({
    input: {
      value: Number(score),
      taskId: props.currentTask?.id,
      participantId: currentUser.value.id
    }
  })
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center py-4 px-2 border border-[#283244] rounded-[5px] sm:px-4 sm:py-5"
  >
    <p class="mb-2 text-sm text-center">{{ currentTask.title }}</p>
    <p class="mb-6 text-xs text-[#64748B] text-center uppercase">
      Cast your vote (in
      {{ estimationMode === ESTIMATION_MODE['STORY_POINTS'] ? 'story points' : 'hours' }})
    </p>
    <div class="flex flex-wrap justify-center gap-[20px] place-items-center">
      <button
        v-for="value in possibleVoteOptions"
        :key="value"
        @click="handleCastVote(value)"
        class="h-[50px] w-[50px] flex flex-col justify-center items-center border border-[#283244] rounded-[5px] text-sm hover:bg-gray-800 duration-200"
        :class="{
          'bg-primary text-[23px]': value == selectedVote
        }"
      >
        {{ value }}
      </button>

      <Input
        v-model="customVoteOption"
        placeholder="Other e.g 20"
        class="bg-transparent text-white text-center w-[120px]"
      />
    </div>
  </div>
</template>

<style scoped></style>
