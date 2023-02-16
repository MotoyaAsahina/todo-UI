<script setup lang="ts">
import TagPicker from '/@/components/TaskEditor/TagPicker.vue'
import CheckIcon from '/@/components/UI/Icon/CheckIcon.vue'
import CloseIcon from '/@/components/UI/Icon/CloseIcon.vue'
import { apis } from '/@/lib/apis'
import { useEditingTaskInfo } from '/@/lib/editor'
import { fetchData } from '/@/lib/fetch'
import { computed } from 'vue'

const group = defineProps<{ id: string }>()

const editingTaskInfo = useEditingTaskInfo()
const editor = computed(() => editingTaskInfo.editor[group.id])

const closeEditors = () => {
  editor.value.editing = false
}

const postTask = async () => {
  const raw = (editor.value.raw as string).split('\n')
  if (raw.length < 2 || raw[0] === '' || raw[1] === '') return

  const reqTask = {
    group_id: group.id,
    title: raw[0] ?? '',
    description: raw.slice(2).join('\n') ?? '',
    due_date: raw[1] ?? '',
    tags: editor.value.tags
  }

  if (editingTaskInfo.isNew(group.id).value) {
    await apis.postTask(reqTask).then(() => {
      fetchData()
      closeEditors()
    })
  } else {
    await apis.putTask(editor.value.id, reqTask).then(() => {
      fetchData()
      closeEditors()
    })
  }
}
</script>

<template>
  <div
    class="w-18rem p-2.4 rounded-lg border-1 border-gray-200 bg-white shadow-md"
  >
    <div class="mb-2">
      <h3 class="text-base font-semibold">
        {{ editor.id === '' ? 'New' : 'Edit' }} Task
      </h3>
    </div>

    <textarea
      :id="`task-editor-input-${group.id}`"
      v-model="editor.raw"
      class="w-full p-1 text-sm resize-y border-1 border-gray-400"
      rows="6"
    ></textarea>

    <tag-picker :id="group.id" :tag-ids="editor.tags" />

    <div class="flex items-center justify-end mt-2">
      <a @click="closeEditors"><close-icon /></a>
      <a @click="postTask"><check-icon class="ml-0.5" /></a>
    </div>
  </div>
</template>

<style scoped></style>
