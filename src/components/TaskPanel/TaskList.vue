<script setup lang="ts">
import { computed } from 'vue'
import { tasks } from '/@/lib/fetch'
import TaskCard from '/@/components/TaskPanel/TaskCard.vue'

const props = defineProps<{ groupId: string }>()

const groupTasks = computed(() => tasks.get(props.groupId))
</script>

<template>
  <div
    style="width: 100%; height: calc(100% - 2.2rem)"
    class="px-1.6 overflow-scroll"
  >
    <template v-for="task in groupTasks" :key="task.id">
      <task-card
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
