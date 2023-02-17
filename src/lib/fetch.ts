import { Groups, Tag, Tasks, apis } from '/@/lib/apis'
import { useEditingTaskInfo } from '/@/lib/editor'
import { useTaskPanelMenuState } from '/@/lib/state'
import { reactive, ref } from 'vue'

const groups = ref<Groups>()
const tasks = reactive({} as { [key: string]: Tasks })
const tags = reactive({} as { [key: string]: Tag })

const tagsLength = ref(0)

const fetchGroups = async () => {
  const res = await apis.getGroups()
  groups.value = res.data.filter(g => !/^\[Archived].*$/.test(g.name))
}
const fetchTasks = async () => {
  const res = await apis.getTasks()

  for (const group of groups.value ?? []) {
    tasks[group.id] = []
  }
  for (const task of res.data) {
    tasks[task.group_id].push(task)
  }
}
const fetchTags = async () => {
  tagsLength.value = 0
  const res = await apis.getTags()
  for (const tag of res.data) {
    tags[tag.id] = tag
    tagsLength.value++
  }
}

const fetchData = async () => {
  try {
    await fetchGroups()
    await fetchTasks()
    await fetchTags()

    for (const group of groups.value ?? []) {
      const editingTaskInfo = useEditingTaskInfo()
      editingTaskInfo.create(group.id)
      const taskPanelMenuState = useTaskPanelMenuState()
      taskPanelMenuState.create(group.id)
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export { groups, tasks, tags, tagsLength, fetchData }
