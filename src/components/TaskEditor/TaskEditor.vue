<script setup lang="ts">
import CheckIcon from '/@/components/UI/Icon/CheckIcon.vue'
import CloseIcon from '/@/components/UI/Icon/CloseIcon.vue'

const group = defineProps<{ id: string }>()
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
      v-model="rawTaskData"
      class="w-full p-1 text-sm resize-y border-1 border-gray-400"
      rows="6"
    ></textarea>

    <div class="flex items-center justify-end mt-2">
      <a @click="closeEditors"><close-icon /></a>
      <a @click="postTask"><check-icon class="ml-0.5" /></a>
    </div>
  </div>
</template>

<style scoped></style>
