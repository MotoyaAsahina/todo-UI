<script setup lang="ts">
import TagPicker from '/@/components/TaskEditor/TagPicker.vue'
import CheckIcon from '/@/components/UI/Icon/CheckIcon.vue'
import CloseIcon from '/@/components/UI/Icon/CloseIcon.vue'
import { useEditingTaskInfo } from '/@/lib/editor'

const group = defineProps<{ id: string }>()

// TODO: computed にしないといけない？
const editor = useEditingTaskInfo().editor[group.id]

const closeEditors = () => {
  editor.editing = false
}

const postTask = () => {
  console.log(editor)
}
</script>

<template>
  <div
    class="w-18rem p-2.4 rounded-lg border-1 border-gray-200 bg-white shadow-md"
  >
    <div class="mb-2">
      <h3 class="text-base font-semibold">[[ newOrEdit() ]] Task</h3>
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
