import { defineStore } from 'pinia'

// TODO: refs を使って書き換える
const useEditingTaskInfo = defineStore('editingTasks', {
  state: () => {
    return {
      editor: {} as {
        [key: string]: {
          editing: boolean
          id: string
          raw: string
          tags: string[]
        }
      }
    }
  },
  actions: {
    setEditing(groupId: string, id_: string, raw_: string, tags_: string[]) {
      this.editor[groupId] = {
        editing: true,
        id: id_,
        raw: raw_,
        tags: tags_
      }
    },
    create(groupId: string) {
      this.editor[groupId] = {
        editing: false,
        id: '',
        raw: '',
        tags: []
      }
    }
  }
})

export { useEditingTaskInfo }
