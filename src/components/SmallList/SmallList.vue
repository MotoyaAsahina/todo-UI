<script setup lang="ts">
import SmallListHeader from '/@/components/SmallList/SmallListHeader.vue'
import { computed } from 'vue'

const props = defineProps<{
  type: 'group' | 'tag'
  count: number
}>()

const title = computed(() => {
  return { group: 'Groups', tag: 'Tags' }[props.type]
})
</script>

<template>
  <div class="w-21rem max-w-full z-20 p-2">
    <div class="rounded-lg border-1 border-gray-200 bg-white shadow-md">
      <small-list-header
        :type="props.type"
        :title="title"
        :count="props.count"
      />
      <div class="h-sm py-1.6 overflow-scroll">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
