import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    editor.value[groupId] = {
      editing: false,
      id: '',
      raw: '',
      tags: []
    }
  }

  return {
    editor,
    setEditing,
    create
  }
})

export { useEditingTaskInfo }
