<script setup lang="ts">
import TaskPanelMenuItem from './TaskPanelMenuItem.vue'
</script>

<template>
  <div class="w-32 py-1 rounded-lg border-1 border-gray-300 bg-white shadow-md">
    <task-panel-menu-item>Show Done</task-panel-menu-item>
    <task-panel-menu-item>Done All</task-panel-menu-item>
    <task-panel-menu-item>Delete All</task-panel-menu-item>
  </div>
</template>

<style scoped></style>
