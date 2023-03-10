<script setup lang="ts">
import TaskTag from '/@/components/TaskTag/TaskTag.vue'
import CheckIcon from '/@/components/UI/Icon/CheckIcon.vue'
import DeleteIcon from '/@/components/UI/Icon/DeleteIcon.vue'
import { apis } from '/@/lib/apis'
import { useEditingTaskInfo } from '/@/lib/editor'
import { fetchData } from '/@/lib/fetch'
import { selectStamp } from '/@/lib/stamp'
import { useTaskPanelMenuState } from '/@/lib/state'
import {
  checkPending,
  formatDueDate,
  makeBR,
  makeURL,
  removeAnnotations
} from '/@/lib/text'
import { computed, ref } from 'vue'

const task = defineProps<{
  groupId: string
  taskId: string
  title: string
  dueDate: string
  description: string
  tagIds: string[]
}>()

const cardHover = ref(false)
const cardClick = ref(false)

const isPending = computed(() => checkPending(task.description))
const description = computed(() =>
  !cardClick.value
    ? makeURL(removeAnnotations(task.description))
    : makeBR(makeURL(removeAnnotations(task.description)))
)

const editingTaskInfo = useEditingTaskInfo()
const taskPanelMenuState = useTaskPanelMenuState()

const editTask = () => {
  taskPanelMenuState.opening[task.groupId] = false

  const raw = `${task.title}\n${task.dueDate}\n${task.description}`
  editingTaskInfo.setEditing(task.groupId, task.taskId, raw, task.tagIds)

  document
    .getElementById(`task-editor-input-${task.groupId}`)
    ?.removeAttribute('style')
  window.setTimeout(function () {
    document.getElementById(`task-editor-input-${task.groupId}`)?.focus()
  }, 10)
}

const putTaskDone = async () => {
  await apis.putTaskDone(task.taskId).then(() => {
    fetchData()
  })
}

const deleteTask = async () => {
  await apis.deleteTask(task.taskId).then(() => {
    fetchData()
  })
}
</script>

<template>
  <div
    class="w-full rounded-lg border-1 border-gray-200 my-1.6 px-1.6 pt-1.2 pb-1.6 relative"
    :class="isPending ? 'bg-gray-100 shadow-none' : 'bg-white shadow-sm'"
    @mouseover="cardHover = true"
    @mouseleave="cardHover = false"
  >
    <div
      v-show="isPending"
      class="absolute rounded-lg bg-gray-100 w-full h-full left-0 top-0 bg-opacity-40 pointer-events-none"
    ></div>

    <!-- Icons -->
    <div v-show="cardHover" class="absolute top-0 right-0 mr-1.6 mt-1.2 flex">
      <a @click="putTaskDone"><check-icon class="mr-0.5" /></a>
      <a @click="deleteTask"><delete-icon /></a>
    </div>

    <!-- Title -->
    <div>
      <span class="mr-1.2 text-base">{{ selectStamp(task.dueDate) }}</span>
      <a
        class="cursor-pointer text-base"
        :class="!isPending ? 'font-bold' : ''"
        @click="editTask"
      >
        {{ task.title }}
      </a>
    </div>

    <!-- DueDate & Tags -->
    <div class="flex flex-wrap gap-1 mt-0.2">
      <p class="mr-1 text-base leading-1.1rem" @click="cardClick = !cardClick">
        {{ formatDueDate(task.dueDate) }}
      </p>
      <task-tag v-for="tagID in task.tagIds" :key="tagID" :tag-id="tagID" />
    </div>

    <!-- Description -->
    <div
      v-if="removeAnnotations(task.description)?.length > 0"
      class="pt-0.6"
      @click="cardClick = !cardClick"
    >
      <p
        class="text-sm leading-snug"
        :class="
          !cardClick
            ? 'whitespace-nowrap overflow-hidden overflow-ellipsis'
            : ''
        "
        v-html="description"
      ></p>
    </div>
  </div>
</template>

<style scoped></style>
