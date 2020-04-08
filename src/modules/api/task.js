import client from '@/modules/api/client'

const fetch = () => client().get('/tasks')
const get = (id) => client().get(`/tasks/${id}`)
const create = (title) => client().post('/tasks', { title })
const complete = (id) => client().post(`/tasks/${id}/complete`)
const lanize = (id) => client().post(`/tasks/${id}/lanize`)
const moveToChild = (taskId, parentId) => client().post(`/tasks/${taskId}/move-to-child/${parentId}`)
const moveToRoot = (taskId) => client().post(`/tasks/${taskId}/move-to-root`)
const updateTitle = (id, title) => client().post(`/tasks/${id}/update-title`, { title })

export default {
  fetch,
  get,
  create,
  complete,
  lanize,
  moveToChild,
  moveToRoot,
  updateTitle
}
