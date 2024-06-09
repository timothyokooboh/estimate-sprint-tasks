<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    from?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  {
    from: 'top'
  }
)

const transform = computed(() => {
  if (props.from === 'top') {
    return 'translateY(-10px)'
  } else if (props.from === 'bottom') {
    return 'translateY(10px)'
  } else if (props.from === 'left') {
    return 'translateX(-10px)'
  }
  return 'translateX(10px)'
})
</script>

<template>
  <Transition name="slide" mode="out-in" appear>
    <slot />
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 200s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: v-bind(transform);
}
</style>
