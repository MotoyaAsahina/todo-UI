<script setup lang="ts">
import SmallEditor from '/@/components/SmallEditor/SmallEditor.vue'
import AddIcon from '/@/components/UI/Icon/AddIcon.vue'
import ItemCount from '/@/components/UI/ItemCount.vue'
import { useEditingGroupOrTagInfo } from '/@/lib/editor'
import { computed } from 'vue'

const props = defineProps<{
  type: 'group' | 'tag'
  title: string
  count: number
}>()

const editingInfo = useEditingGroupOrTagInfo()
const editor = computed(() => editingInfo.editor[props.type])

const operateEditor = () => {
  if (
    !editor.value.editing ||
    (editor.value.editing && editor.value.id !== '')
  ) {
    editingInfo.setEditing(props.type, '', '')
  } else {
    editor.value.editing = false
  }

  document
    .getElementById(`${props.type}-list-editor-input`)
    ?.removeAttribute('style')
  window.setTimeout(function () {
    document.getElementById(`${props.type}-list-editor-input`)?.focus()
  }, 10)
}
</script>

<template>
  <div
    class="mt-2.5 pb-1.5 px-2.4 flex items-center border-b-1 border-gray-200 relative"
  >
    <item-count :count="props.count" />
    <h3 class="flex-1 pl-1.6 text-base font-semibold">{{ props.title }}</h3>
    <a @click="operateEditor"><add-icon /></a>

    <small-editor
      v-show="editingInfo.editor[props.type].editing"
      class="absolute top-6.2 right-1"
      :type="props.type"
    />
  </div>
</template>

<style scoped></style>
