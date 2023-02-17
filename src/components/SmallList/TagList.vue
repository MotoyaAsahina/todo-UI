<script setup lang="ts">
import SmallList from '/@/components/SmallList/SmallList.vue'
import TaskTag from '/@/components/TaskTag/TaskTag.vue'
import { Tag } from '/@/lib/apis'
import { useEditingGroupOrTagInfo } from '/@/lib/editor'
import { tags, tagsLength } from '/@/lib/fetch'

const editingInfo = useEditingGroupOrTagInfo()

const setEditTag = (tag: Tag) => {
  editingInfo.setEditing('tag', tag.id, `${tag.name}\n${tag.color}`)

  document.getElementById('tag-list-editor-input')?.removeAttribute('style')
  window.setTimeout(function () {
    document.getElementById('tag-list-editor-input')?.focus()
  }, 10)
}
</script>

<template>
  <small-list type="tag" :count="tagsLength">
    <div
      v-for="(tag, id, index) in tags"
      :key="id"
      class="py-0.8 px-2.4"
      :class="{ 'border-t-1 border-gray-200': index > 0 }"
    >
      <div class="flex items-center">
        <task-tag class="w-auto" :tag-id="tag.id" @click="setEditTag(tag)" />
        <p class="ml-2 text-base">{{ tag.color }}</p>
      </div>
    </div>
  </small-list>
</template>

<style scoped></style>
