<script setup lang="ts">
import SmallList from '/@/components/SmallList/SmallList.vue'
import { Group, apis } from '/@/lib/apis'
import { useEditingGroupOrTagInfo } from '/@/lib/editor'
import { fetchData, groups } from '/@/lib/fetch'
import { onMounted, ref } from 'vue'

const sortableList = ref<HTMLDivElement | null>(null)

const chosenItem = ref<HTMLElement | null>(null)
const chosenItemId = ref('')
const chosenItemIndex = ref(0)
const chosenItemOldIndex = ref(0)

const getItemIndex = (target: HTMLElement) => {
  return Array.from(sortableList.value?.children ?? []).findIndex(
    item => item === target
  )
}

const getItemsSlice = (start: number, end: number) => {
  return Array.from(sortableList.value?.children ?? []).slice(start, end)
}

const dragOver = (event: DragEvent) => {
  const el = event.currentTarget as HTMLElement

  if (getItemIndex(chosenItem.value!) === -1 || chosenItem.value === el) {
    return
  }

  for (const anim of el?.getAnimations() ?? []) {
    if (anim.playState === 'running') {
      return
    }
  }

  if (el) {
    const prevIndex = chosenItemIndex.value

    if (chosenItemIndex.value < getItemIndex(el)) {
      el.after(chosenItem.value!)
      chosenItemIndex.value = getItemIndex(chosenItem.value!)

      getItemsSlice(prevIndex, chosenItemIndex.value).forEach(item => {
        ;(item as HTMLElement).style.animation = 'transform-up 150ms ease 0s'
      })
      chosenItem.value!.style.animation = 'transform-down 150ms ease 0s'
    } else {
      el.before(chosenItem.value!)
      chosenItemIndex.value = getItemIndex(chosenItem.value!)

      getItemsSlice(chosenItemIndex.value + 1, prevIndex + 1).forEach(item => {
        ;(item as HTMLElement).style.animation = 'transform-down 150ms ease 0s'
      })
      chosenItem.value!.style.animation = 'transform-up 150ms ease 0s'
    }
  }
}

const dragStart = (event: DragEvent, id: string) => {
  chosenItem.value = event.target as HTMLElement
  chosenItemId.value = id
  chosenItemIndex.value = getItemIndex(chosenItem.value!)
  chosenItemOldIndex.value = chosenItemIndex.value

  chosenItem.value.style.transform = 'translate3d(0px, 0px, 0px)'
}

const drop = (event: DragEvent) => {
  event.preventDefault()
  Array.from(sortableList.value?.children ?? []).forEach(item => {
    ;(item as HTMLElement).style.animation = ''
  })

  moveGroup()
}

onMounted(() => {
  sortableList.value!.addEventListener('dragover', event => {
    event.preventDefault()
    event.dataTransfer!.dropEffect = 'move'
  })
})

const editingInfo = useEditingGroupOrTagInfo()

const setEditGroup = (group: Group) => {
  editingInfo.setEditing('group', group.id, group.name)

  document.getElementById('group-list-editor-input')?.removeAttribute('style')
  window.setTimeout(function () {
    document.getElementById('group-list-editor-input')?.focus()
  }, 10)
}

const moveGroup = async () => {
  if (chosenItemIndex.value === chosenItemOldIndex.value) {
    return
  }

  await apis
    .putGroupOrder(chosenItemId.value, { order: chosenItemIndex.value })
    .then(() => {
      fetchData()
    })
}
</script>

<template>
  <small-list type="group" :count="groups?.length ?? 0">
    <div ref="sortableList">
      <div
        v-for="group in groups"
        :key="group.id"
        class="py-1 px-2.4 flex items-center"
        draggable="true"
        @dragstart="dragStart($event, group.id)"
        @dragenter="dragOver($event)"
        @drop="drop($event)"
      >
        <p class="ml-3 cursor-pointer text-base" @click="setEditGroup(group)">
          {{ group.name }}
        </p>
      </div>
    </div>
  </small-list>
</template>

<style scoped></style>
