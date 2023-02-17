<script setup lang="ts">
import CheckIcon from '/@/components/UI/Icon/CheckIcon.vue'
import CloseIcon from '/@/components/UI/Icon/CloseIcon.vue'
</script>

<template>
  <div
    class="w-60 p-2.4 bg-white rounded-lg border-1 border-gray-200 shadow-md"
  >
    <div class="mb-2">
      <h3 class="text-base font-semibold">[[ newOrEdit() ]]</h3>
    </div>
    <textarea
      id="group-list-editor-input"
      v-model="rawData"
      class="w-full resize-none p-1 text-sm border-1 border-gray-400"
      rows="3"
      @keydown.meta.enter="postGroup"
      @keydown.esc="closeEditor"
    ></textarea>
    <div class="flex items-center justify-end mt-1.6">
      <a @click="editing = false"><close-icon /></a>
      <a @click="postGroup()"><check-icon class="ml-0.5" /></a>
    </div>
  </div>
</template>

<style scoped></style>
