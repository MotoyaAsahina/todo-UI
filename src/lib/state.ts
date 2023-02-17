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

const useSmallListState = defineStore('smallList', () => {
  const opening = ref({
    group: false,
    tag: false
  } as { [key: string]: boolean })

  const operateGroupList = () => {
    opening.value['tag'] = false
    opening.value['group'] = !opening.value['group']
  }

  const operateTagList = () => {
    opening.value['group'] = false
    opening.value['tag'] = !opening.value['tag']
  }

  return { opening, operateGroupList, operateTagList }
})

export { useTaskPanelMenuState, useSmallListState }
