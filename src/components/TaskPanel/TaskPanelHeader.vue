<script setup lang="ts">
import AddIcon from '/@/components/UI/Icon/AddIcon.vue'
import DotsIcon from '/@/components/UI/Icon/DotsHorizontalIcon.vue'
import ItemCount from '/@/components/UI/ItemCount.vue'
import { useEditingTaskInfo } from '/@/lib/editor'
import { useTaskPanelMenuState } from '/@/lib/state'
import { computed } from 'vue'

const props = defineProps<{
  groupId: string
  length: number
  name: string
}>()

const taskPanelMenuState = useTaskPanelMenuState()
const editingTaskInfo = useEditingTaskInfo()
const editor = computed(() => editingTaskInfo.editor[props.groupId])

const operateTaskEditor = () => {
  if (
    !editor.value.editing ||
    (editor.value.editing && !editingTaskInfo.isNew(props.groupId).value)
  ) {
    taskPanelMenuState.opening[props.groupId] = false
    editingTaskInfo.setEditing(props.groupId, '', '', [])
  } else {
    editor.value.editing = false
  }

  document
    .getElementById(`task-editor-input-${props.groupId}`)
    ?.removeAttribute('style')
  window.setTimeout(function () {
    document.getElementById(`task-editor-input-${props.groupId}`)?.focus()
  }, 10)
}

const operateMenu = () => {
  if (editor.value.editing) editor.value.editing = false
  taskPanelMenuState.opening[props.groupId] =
    !taskPanelMenuState.opening[props.groupId]
}
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
