<script setup lang="ts">
const props = defineProps<{ count: number }>()
</script>

<template>
  <span
    class="w-auto h-4.4 flex-initial rounded-lg bg-gray-200 text-xs text-center leading-1.1rem"
    :class="props.count > 9 ? 'px-1' : 'px-1.4'"
  >
    {{ props.count }}
  </span>
</template>

<style scoped></style>
