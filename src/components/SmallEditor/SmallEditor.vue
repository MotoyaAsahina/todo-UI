<script setup lang="ts">
import CheckIcon from '/@/components/UI/Icon/CheckIcon.vue'
import CloseIcon from '/@/components/UI/Icon/CloseIcon.vue'
import { apis } from '/@/lib/apis'
import { useEditingGroupOrTagInfo } from '/@/lib/editor'
import { fetchData } from '/@/lib/fetch'
import { computed } from 'vue'

const props = defineProps<{
  type: 'group' | 'tag'
}>()

const editingInfo = useEditingGroupOrTagInfo()
const editor = computed(() => editingInfo.editor[props.type])

const newOrEdit = (): string => {
  const newOrEdit = editor.value.id === '' ? 'New' : 'Edit'
  const type = props.type === 'group' ? 'Group' : 'Tag'
  return `${newOrEdit} ${type}`
}

const post = async () => {
  const raw = (editor.value.raw as string).split('\n')

  if (props.type === 'group') {
    if (raw[0]?.length === 0) return

    let reqGroup = {
      name: raw[0] ?? ''
    }

    if (editor.value.id === '') {
      await apis.postGroup(reqGroup).then(() => {
        fetchData()
        editor.value.editing = false
      })
    } else {
      await apis.putGroup(editor.value.id ?? '', reqGroup).then(() => {
        fetchData()
        editor.value.editing = false
      })
    }
  } else {
    if (raw.length < 2 || raw[0]?.length === 0 || raw[1]?.length === 0) return

    let reqTag = {
      name: raw[0] ?? '',
      color: raw[1] ?? ''
    }

    if (editor.value.id === '') {
      await apis.postTag(reqTag).then(() => {
        fetchData()
        editor.value.editing = false
      })
    } else {
      await apis.putTag(editor.value.id ?? '', reqTag).then(() => {
        fetchData()
        editor.value.editing = false
      })
    }
  }
}
</script>

<template>
  <div
    class="w-60 p-2.4 bg-white rounded-lg border-1 border-gray-200 shadow-md"
  >
    <div class="mb-2">
      <h3 class="text-base font-semibold">{{ newOrEdit() }}</h3>
    </div>
    <textarea
      :id="`${props.type}-list-editor-input`"
      v-model="editor.raw"
      class="w-full resize-none p-1 text-sm border-1 border-gray-400"
      rows="3"
      @keydown.meta.enter="post"
      @keydown.esc="editor.editing = false"
    ></textarea>
    <div class="flex items-center justify-end mt-1.6">
      <a @click="editor.editing = false"><close-icon /></a>
      <a @click="post"><check-icon class="ml-0.5" /></a>
    </div>
  </div>
</template>

<style scoped></style>
