<script setup lang="ts">
import TaskTag from '/@/components/TaskTag/TaskTag.vue'
import TagIcon from '/@/components/UI/Icon/TagIcon.vue'
import { Tag } from '/@/lib/apis'
import { useEditingTaskInfo } from '/@/lib/editor'
import { tags } from '/@/lib/fetch'
import { computed, ref } from 'vue'

const props = defineProps<{ id: string; tagIds: string[] }>()

const openingTagList = ref(false)
const selectingTags = computed(
  () => new Set<Tag>(props.tagIds?.map(id => tags[id]) || [])
)

const editor = computed(() => useEditingTaskInfo().editor[props.id])

const selectTag = (tag: Tag) => {
  if (selectingTags.value.has(tag)) {
    selectingTags.value.delete(tag)
  } else {
    selectingTags.value.add(tag)
  }

  editor.value.tags = Array.from(selectingTags.value).map(tag => tag.id)
}
</script>

<template>
  <div class="flex flex-wrap items-end gap-1 relative">
    <a @click="openingTagList = !openingTagList"><tag-icon /></a>
    <task-tag
      v-for="tag in Array.from(selectingTags).sort((a, b) =>
        a.name.localeCompare(b.name)
      )"
      :key="tag.id"
      :tag-id="tag.id"
    />

    <div
      v-show="openingTagList"
      class="top-0 left-6 w-60 absolute bg-white rounded-lg border-1 border-gray-200 shadow-md z-10"
    >
      <div class="m-2 flex flex-wrap gap-1">
        <task-tag
          v-for="tag in tags"
          :key="tag.id"
          :tag-id="tag.id"
          @click="selectTag(tag)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
