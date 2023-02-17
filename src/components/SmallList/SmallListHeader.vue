<script setup lang="ts">
import SmallEditor from '/@/components/SmallEditor/SmallEditor.vue'
import AddIcon from '/@/components/UI/Icon/AddIcon.vue'
import ItemCount from '/@/components/UI/ItemCount.vue'

const props = defineProps<{
  title: string
  count: number
}>()

const addItem = () => {
  console.log('add item')
}
</script>

<template>
  <div
    class="mt-2.5 pb-1.5 px-2.4 flex items-center border-b-1 border-gray-200 relative"
  >
    <item-count :count="props.count" />
    <h3 class="flex-1 pl-1.6 text-base font-semibold">{{ props.title }}</h3>
    <a @click="addItem"><add-icon /></a>

    <small-editor v-show="false" class="absolute top-6.2 right-1" />
  </div>
</template>

<style scoped></style>
