<script setup lang="ts">
import TaskPanelHeader from '/@/components/TaskPanel/TaskPanelHeader.vue'
import { tasks } from '/@/lib/fetch'

const group = defineProps<{
  id: string
  name: string
}>()
</script>

<template>
  <div class="w-84 p-1.6 h-full <sm:(snap-start snap-m-1.6)">
    <div class="w-80.8 h-full rounded-lg border-1 border-gray-200 bg-gray-50">
      <task-panel-header
        :length="tasks[group.id]?.length || 0"
        :name="group.name"
      />
    </div>
  </div>
</template>

<style scoped></style>
