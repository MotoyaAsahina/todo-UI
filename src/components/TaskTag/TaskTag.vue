<script setup lang="ts">
import { tags } from '/@/lib/fetch'

const props = defineProps<{
  tagId: string
}>()

const pickBlackOrWhite = (color: string) => {
  if (!color) return '#ffffff'
  let colorStr = color.slice(-6)
  let r = parseInt(colorStr.slice(0, 2), 16)
  let g = parseInt(colorStr.slice(2, 4), 16)
  let b = parseInt(colorStr.slice(4, 6), 16)
  let yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}
</script>

<template>
  <div
    class="h-1.1rem cursor-pointer px-2 rounded-xl inline-block"
    :style="{
      'background-color': tags[props.tagId]?.color,
      color: pickBlackOrWhite(tags[props.tagId]?.color)
    }"
  >
    <p class="text-xs leading-1.1rem font-medium">
      {{ tags[props.tagId]?.name }}
    </p>
  </div>
</template>

<style scoped></style>
