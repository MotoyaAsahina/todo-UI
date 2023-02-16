<script setup lang="ts">
import ItemCount from '/@/components/UI/ItemCount.vue'
import AddIcon from '/@/components/UI/Icon/AddIcon.vue'
import DotsIcon from '/@/components/UI/Icon/DotsHorizontalIcon.vue'

const props = defineProps<{
  groupId: string
  length: number
  name: string
}>()
</script>

<template>
  <div class="h-8.8 pt-2.4 pb-1.4 px-2 flex items-center relative">
    <item-count :count="props.length" />
    <h3 class="flex-1 pl-1.6 text-base font-semibold leading-1.1rem">
      {{ props.name }}
    </h3>
    <a @click="operateTaskEditor"><add-icon /></a>
    <a @click="operateMenu"><dots-icon class="ml-0.5" /></a>
  </div>
</template>

<style scoped></style>
