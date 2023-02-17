<script setup lang="ts">
import GroupList from '/@/components/SmallList/GroupList.vue'
import TagList from '/@/components/SmallList/TagList.vue'
import OrderIcon from '/@/components/UI/Icon/ReorderHorizontalIcon.vue'
import TagIcon from '/@/components/UI/Icon/TagIcon.vue'
</script>

<template>
  <header class="w-full h-3rem bg-gray-100 border-b-1 border-gray-200 relative">
    <div class="h-3rem flex items-center px-4">
      <div class="flex-1 text-lg">Todo</div>
      <a @click="operateGroupEditor"><order-icon /></a>
      <a @click="operateTagEditor"><tag-icon class="ml-1.5" /></a>
    </div>

    <tag-list v-show="true" class="absolute right-0 top-8" />

    <group-list v-show="false" class="absolute right-0 top-8" />
  </header>
</template>

<style scoped></style>
