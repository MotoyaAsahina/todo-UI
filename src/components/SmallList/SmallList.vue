<script setup lang="ts">
import SmallListHeader from '/@/components/SmallList/SmallListHeader.vue'

const props = defineProps<{
  title: string
  count: number
}>()
</script>

<template>
  <div class="w-21rem max-w-full z-20 p-2">
    <div class="rounded-lg border-1 border-gray-200 bg-white shadow-md">
      <small-list-header :title="props.title" :count="props.count" />

      <div class="h-sm py-1.6 overflow-scroll">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
