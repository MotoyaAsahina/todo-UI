import { reactive, ref } from 'vue'
import { apis, Groups, Tag, Tasks } from '/@/lib/apis'

const groups = ref<Groups>()
const tasks = reactive({} as { [key: string]: Tasks })
const tags = reactive({} as { [key: string]: Tag })

const fetchGroups = async () => {
  const res = await apis.getGroups()
  groups.value = res.data.filter(g => !/^\[Archived].*$/.test(g.name))
}
const fetchTasks = async () => {
  const res = await apis.getTasks()
  for (const task of res.data) {
    if (!tasks[task.group_id]) {
      tasks[task.group_id] = []
    }
    tasks[task.group_id].push(task)
  }
}
const fetchTags = async () => {
  const res = await apis.getTags()
  for (const tag of res.data) {
    tags[tag.id] = tag
  }
}

const fetchData = async () => {
  try {
    await fetchTasks()
    await fetchGroups()
    await fetchTags()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export { groups, tasks, tags, fetchData }
