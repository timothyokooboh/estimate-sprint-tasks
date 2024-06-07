<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:border focus-visible:border-white disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b data-[state=active]:border-white data-[state=active]:text-white data-[state=active]:shadow-sm',
        props.class
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
