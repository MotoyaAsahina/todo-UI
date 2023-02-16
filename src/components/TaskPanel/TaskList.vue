<script setup lang="ts">
import TaskCard from '/@/components/TaskPanel/TaskCard.vue'
import { tasks } from '/@/lib/fetch'

const props = defineProps<{ groupId: string }>()
</script>

<template>
  <div
    style="width: 100%; height: calc(100% - 2.2rem)"
    class="px-1.6 overflow-scroll"
  >
    <template v-for="task in tasks[props.groupId] || []" :key="task.id">
      <task-card
        :group-id="props.groupId"
        :task-id="task.id"
        :title="task.title"
        :due-date="task.due_date"
        :description="task.description"
        :tag-ids="Array.from(task.tags || [])"
      />
    </template>
  </div>
</template>

<style scoped></style>
