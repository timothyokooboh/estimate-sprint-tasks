<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    from?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  {
    from: 'bottom'
  }
)

const transform = computed(() => {
  if (props.from === 'top') return 'translateY(-30px)'
  else if (props.from === 'bottom') return 'translateY(30px)'
  else if (props.from === 'left') return 'translateX(-30px)'
  return 'translateX(30px)'
})
</script>

<template>
  <Transition name="slide" mode="out-in" appear>
    <slot />
  </Transition>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: v-bind(transform);
}
</style>
