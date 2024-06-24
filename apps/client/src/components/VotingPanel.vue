<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { useCastVoteMutation } from '@/composables/useCastVoteMutation'
import debounce from 'lodash.debounce'
import type { Task } from '@/types'
import { useViewSession } from '@/composables/useViewSession'
import { useRoute } from 'vue-router'
import { getObjectProperty } from '@/helpers'

const props = defineProps<{
  currentTask: Task
}>()

const route = useRoute()
const { currentUser } = useViewSession(route.params.sessionId as string)
const { createVote, updateVote } = useCastVoteMutation()

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
    castVote(customVoteOption.value)
  }
}, 2000)

const handleCastVote = (value: number) => {
  customVoteOption.value = null
  castVote(value)
}

const castVote = (score: number) => {
  selectedVote.value = score
  const vote = getObjectProperty(currentUser.value, 'vote', null)
  if (vote) {
    updateVote({ input: { id: vote.id, value: Number(score) } })
  } else {
    createVote({
      input: {
        value: Number(score),
        taskId: props.currentTask?.id,
        participantId: currentUser.value.id
      }
    })
  }
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center py-4 px-2 border border-[#283244] rounded-[5px] sm:px-4 sm:py-5"
  >
    <p class="mb-2 text-sm text-center">{{ currentTask.title }}</p>
    <p class="mb-6 text-sm text-[#64748B] text-center uppercase">Cast your vote</p>
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
