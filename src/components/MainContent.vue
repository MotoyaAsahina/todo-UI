<script setup lang="ts">
import TaskPanel from '/@/components/TaskPanel/TaskPanel.vue'
import { groups } from '/@/lib/fetch'
</script>

<template>
  <div
    class="w-full flex-grow p-1.6 overflow-scroll flex <sm:(snap snap-mandatory snap-x)"
  >
    <template
      v-for="group in groups?.filter(g => !/^\[Archived].*$/.test(g.name)) ||
      []"
      :key="group.id"
    >
      <task-panel :id="group.id" :name="group.name" />
    </template>
  </div>
</template>

<style scoped></style>
