<script setup lang="ts">
import { Task } from '/@/lib/apis'
import { selectStamp } from '/@/lib/stamp'
import { ref } from 'vue'
import TaskTag from '/@/components/TaskTag/TaskTag.vue'
import CheckIcon from '/@/components/UI/Icon/CheckIcon.vue'
import DeleteIcon from '/@/components/UI/Icon/DeleteIcon.vue'

const task = defineProps<{
  taskId: string
  title: string
  dueDate: string
  description: string
  tagIds: string[]
}>()

const cardHover = ref(false)
const cardClick = ref(false)

const formatDueDate = (d: string) => {
  let date = new Date(d)
  let year =
    date.getFullYear() !== new Date().getFullYear()
      ? `${date.getFullYear()}/`
      : ''
  let month = date.getMonth() + 1
  let day = date.getDate()
  let weekDay = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
  let hour = ('00' + date.getHours()).slice(-2)
  let minute = ('00' + date.getMinutes()).slice(-2)
  return `${year}${month}/${day}(${weekDay}) ${hour}:${minute}`
}

const stamp = (d: string): string => selectStamp(d)

const surroundURL = (url: string) => {
  const style = 'overflow-wrap: break-word; color: #135fab'
  const rel = 'noopener noreferrer'
  return `<a style="${style}" href="${url}" target="_blank" rel="${rel}">${url}</a>`
}

const makeURL = (text: string) => {
  return text.replace(
    /(https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)/g,
    surroundURL
  )
}

const isPending = (task: Task) => {
  return task.description.match(/!pending\[.*]/)
}

const removeAnnotations = (text: string) => {
  return text.replace(/\n?!notice\[.*]/g, '').replace(/\n?!pending\[.*]/g, '')
}

const makeBR = (text: string) => {
  return text.replace(/\n/g, '<br>')
}
</script>

<template>
  <div
    class="w-full rounded-lg border-1 border-gray-200 my-1.6 px-1.6 pt-1.2 pb-1.6 relative"
    :class="isPending(task) ? 'bg-gray-100 shadow-none' : 'bg-white shadow-sm'"
    @mouseover="cardHover = true"
    @mouseleave="cardHover = false"
  >
    <div
      v-show="isPending(task)"
      class="absolute rounded-lg bg-gray-100 w-full h-full left-0 top-0 bg-opacity-40 pointer-events-none"
    ></div>
    <div v-show="cardHover" class="absolute top-0 right-0 mr-1.6 mt-1.2 flex">
      <a @click="putTaskDone"><check-icon class="mr-0.5" /></a>
      <a @click="deleteTask"><delete-icon /></a>
    </div>

    <div>
      <span class="mr-1.2 text-base">{{ stamp(task.dueDate) }}</span>
      <a
        class="cursor-pointer text-base"
        :class="!isPending(task) ? 'font-bold' : ''"
        @click="$emit('editTask', task)"
      >
        {{ task.title }}
      </a>
    </div>
    <div class="flex flex-wrap gap-1 mt-0.2">
      <p class="mr-1 text-base leading-1.1rem" @click="cardClick = !cardClick">
        {{ formatDueDate(task.dueDate) }}
      </p>
      <task-tag v-for="tagID in task.tagIds" :key="tagID" :tag-id="tagID" />
    </div>
    <div
      v-if="removeAnnotations(task.description)?.length > 0"
      class="pt-0.6"
      @click="cardClick = !cardClick"
    >
      <p
        v-if="!cardClick"
        class="text-sm leading-snug whitespace-nowrap overflow-hidden overflow-ellipsis"
        v-html="makeURL(removeAnnotations(task.description))"
      ></p>
      <p
        v-if="cardClick"
        class="text-sm leading-snug"
        v-html="makeBR(makeURL(removeAnnotations(task.description)))"
      ></p>
    </div>
  </div>
</template>

<style scoped></style>
