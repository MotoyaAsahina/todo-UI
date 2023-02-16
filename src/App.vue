<script setup lang="ts">
import PageHeader from '/@/components/Layout/PageHeader/PageHeader.vue'
import MainContent from '/@/components/MainContent.vue'
import { fetchData } from '/@/lib/fetch'

fetchData()
</script>

<template>
  <div class="h-full flex flex-col">
    <page-header />
    <main-content />
  </div>
</template>

<style scoped></style>
