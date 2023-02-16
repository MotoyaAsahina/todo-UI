<script setup lang="ts">
import OrderIcon from '/@/components/UI/Icon/ReorderHorizontalIcon.vue'
import TagIcon from '/@/components/UI/Icon/TagIcon.vue'
</script>

<template>
  <header class="w-full h-3rem bg-gray-100 border-b-1 border-gray-200">
    <div class="h-full flex items-center px-4">
      <div class="flex-1 text-lg">Todo</div>
      <a @click="operateGroupEditor"><order-icon /></a>
      <a @click="operateTagEditor"><tag-icon class="ml-1.5" /></a>
    </div>
  </header>
</template>

<style scoped></style>
