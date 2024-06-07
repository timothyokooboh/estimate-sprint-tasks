<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { UserCheck, UserCheckIcon, ChevronDown } from 'lucide-vue-next'
import type { Participant } from '@/types'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

defineProps<{
  participants: Participant[]
  isModerator: boolean
}>()

const route = useRoute()
const inviteURL = `localhost:5173/session/${route.params.sessionId}/invite`
</script>

<template>
  <div class="border border-[#283244] rounded-[5px] py-8 px-4">
    <h3 class="mb-3 border-b-[1px] border-b-[#283244] pb-3">Participants</h3>

    <div
      v-for="participant in participants"
      :key="participant.id"
      class="flex justify-between items-center border-b-[1px] border-b-[#283244] pb-3 mb-3"
    >
      <div class="flex items-center">
        <TooltipProvider v-if="isModerator">
          <Tooltip>
            <TooltipTrigger>
              <UserCheck :size="30" class="mr-2" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Moderator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <UserCheck v-else :size="30" class="mr-2" />

        <span>{{ participant.name }}</span>
      </div>
    </div>

    <Collapsible>
      <CollapsibleTrigger class="w-full mb-3">
        <div class="flex justify-between items-center">
          <p>Invite a teammate</p>
          <button>
            <ChevronDown />
            <span class="sr-only">Toggle</span>
          </button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent class="space-y-2">
        <div class="flex flex-wrap gap-y-[10px] items-center justify-between gap-x-[20px]">
          <input
            readonly
            :value="inviteURL"
            class="bg-transparent outline-none grow border border-[#283244] py-2 px-3 rounded-[5px]"
          />

          <Button variant="ghost">Copy URL</Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<style scoped></style>
