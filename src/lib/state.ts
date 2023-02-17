import { defineStore } from 'pinia'
import { ref } from 'vue'

const useTaskPanelMenuState = defineStore('taskPanel', () => {
  const opening = ref({} as { [key: string]: boolean })

  const create = (groupId: string) => {
    if (!opening.value[groupId]) {
      opening.value[groupId] = false
    }
  }

  return { opening, create }
})

export { useTaskPanelMenuState }
