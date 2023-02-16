import { reactive, ref } from 'vue'
import { apis, Groups, Tags, Tasks } from '/@/lib/apis'

const groups = ref<Groups>()
const tasks = reactive(new Map<string, Tasks>())
const tags = ref<Tags>()

const fetchGroups = async () => {
  const res = await apis.getGroups()
  groups.value = res.data.filter(g => !/^\[Archived].*$/.test(g.name))
}
const fetchTasks = async () => {
  const res = await apis.getTasks()
  for (const task of res.data) {
    if (!tasks.has(task.group_id)) {
      tasks.set(task.group_id, [])
    }
    tasks.get(task.group_id)?.push(task)
  }
}
const fetchTags = async () => {
  const res = await apis.getTags()
  tags.value = res.data
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
