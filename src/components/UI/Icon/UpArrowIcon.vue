<script setup lang="ts">
import Icon from 'vue-material-design-icons/ArrowUp.vue'

const props = defineProps<{ size?: number }>()
</script>

<template>
  <icon
    class="cursor-pointer items-center flex"
    :size="props.size || 20"
    fill-color="#696969"
  />
</template>

<style scoped></style>
