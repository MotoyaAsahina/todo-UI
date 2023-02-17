import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useEditingTaskInfo = defineStore('editingTasks', () => {
  const editor = ref(
    {} as {
      [key: string]: {
        editing: boolean
        id: string
        raw: string
        tags: string[]
      }
    }
  )

  const setEditing = (
    groupId: string,
    id_: string,
    raw_: string,
    tags_: string[]
  ) => {
    editor.value[groupId] = {
      editing: true,
      id: id_,
      raw: raw_,
      tags: tags_
    }
  }
  const create = (groupId: string) => {
    if (!editor.value[groupId]) {
      editor.value[groupId] = {
        editing: false,
        id: '',
        raw: '',
        tags: []
      }
    }
  }

  const isNew = (groupId: string) => {
    return computed(() => editor.value[groupId].id === '')
  }

  return { editor, setEditing, create, isNew }
})

const useEditingGroupOrTagInfo = defineStore('editingGroups', () => {
  const editor = ref({
    group: { editing: false, id: '', raw: '' },
    tag: { editing: false, id: '', raw: '' }
  } as { [key: string]: { editing: boolean; id: string; raw: string } })

  const setEditing = (type: string, id_: string, raw_: string) => {
    editor.value[type] = {
      editing: true,
      id: id_,
      raw: raw_
    }
  }

  const cancelEditing = () => {
    editor.value.group.editing = false
    editor.value.tag.editing = false
  }

  return { editor, setEditing, cancelEditing }
})

export { useEditingTaskInfo, useEditingGroupOrTagInfo }
