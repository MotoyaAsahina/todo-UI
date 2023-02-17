<script setup lang="ts">
import SmallList from '/@/components/SmallList/SmallList.vue'
import DownArrowIcon from '/@/components/UI/Icon/DownArrowIcon.vue'
import UpArrowIcon from '/@/components/UI/Icon/UpArrowIcon.vue'
import { Group } from '/@/lib/apis'
import { useEditingGroupOrTagInfo } from '/@/lib/editor'
import { groups } from '/@/lib/fetch'

const editingInfo = useEditingGroupOrTagInfo()

const setEditGroup = (group: Group) => {
  editingInfo.setEditing('group', group.id, group.name)

  document.getElementById('group-list-editor-input')?.removeAttribute('style')
  window.setTimeout(function () {
    document.getElementById('group-list-editor-input')?.focus()
  }, 10)
}
</script>

<template>
  <small-list type="group" :count="groups?.length || 0">
    <div
      v-for="group in groups"
      :key="group.id"
      class="my-1.6 px-2.4 flex items-center"
    >
      <a @click="moveGroup(group.id, 'up')"><up-arrow-icon :size="18" /></a>
      <a @click="moveGroup(group.id, 'down')"
        ><down-arrow-icon :size="18" class="ml-1"
      /></a>
      <p class="ml-3 cursor-pointer text-base" @click="setEditGroup(group)">
        {{ group.name }}
      </p>
    </div>
  </small-list>
</template>

<style scoped></style>
