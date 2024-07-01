<script lang="ts" setup>
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ChevronDown, Copy } from 'lucide-vue-next'
import { useInviteParticipant } from '@/composables/useInviteParticipant'
import { ref } from 'vue'

const { inviteURL, copyToClipboard, copied } = useInviteParticipant()
const isOpen = ref(true)
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <CollapsibleTrigger class="w-full mb-3">
      <div class="flex justify-between items-center">
        <p>Invite your teammates</p>
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

        <span v-if="copied">Copied!</span>

        <TooltipProvider v-else>
          <Tooltip>
            <TooltipTrigger @click="copyToClipboard">
              <Copy :size="30" v-if="!copied" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
