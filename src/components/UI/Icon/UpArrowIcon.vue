<script setup lang="ts">
import Icon from 'vue-material-design-icons/ArrowUp.vue'

const size = withDefaults(defineProps<number>(), 20)
</script>

<template>
  <icon
    class="cursor-pointer items-center flex"
    :size="size"
    fill-color="#696969"
  />
</template>

<style scoped></style>
