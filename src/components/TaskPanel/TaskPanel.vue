<script setup lang="ts">
import TaskEditor from '/@/components/TaskEditor/TaskEditor.vue'
import TaskList from '/@/components/TaskPanel/TaskList.vue'
import TaskPanelHeader from '/@/components/TaskPanel/TaskPanelHeader.vue'
import { tasks } from '/@/lib/fetch'

const group = defineProps<{
  id: string
  name: string
}>()
</script>

<template>
  <div class="w-84 p-1.6 h-full <sm:(snap-start snap-m-1.6)">
    <div
      class="w-80.8 h-full rounded-lg border-1 border-gray-200 bg-gray-50 relative"
    >
      <task-panel-header
        :group-id="group.id"
        :length="tasks[group.id]?.length || 0"
        :name="group.name"
      />

      <task-editor :id="group.id" class="right-1 top-9 absolute z-8" />

      <task-list :group-id="group.id" />
    </div>
  </div>
</template>

<style scoped></style>
