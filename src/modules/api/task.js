import client from '@/modules/api/client'

const fetch = () => client().get('/tasks')
const get = (id) => client().get(`/tasks/${id}`)
const create = (title) => client().post('/tasks', { title })
const complete = (id) => client().post(`/tasks/${id}/complete`)
const lanize = (id) => client().post(`/tasks/${id}/lanize`)
const moveToChild = (taskId, parentId) => client().post(`/tasks/${taskId}/move-to-child/${parentId}`)
const moveToRoot = (taskId) => client().post(`/tasks/${taskId}/move-to-root`)
/**
 * updateTerm
 * @param {Number} id
 * @param {moment.Moment|null} startsAt
 * @param {moment.Moment|null} expiresAt
 */
const updateTerm = (id, startsAt, expiresAt) => {
  const params = {}
  if (startsAt != null) {
    params.starts_at = startsAt.format('YYYY-MM-DDTHH:mm:SSZ')
  }
  if (expiresAt != null) {
    params.expires_at = expiresAt.format('YYYY-MM-DDTHH:mm:SSZ')
  }
  client().post(`/tasks/${id}/update-term`, params)
}
const updateTitle = (id, title) => client().post(`/tasks/${id}/update-title`, { title })

export default {
  fetch,
  get,
  create,
  complete,
  lanize,
  moveToChild,
  moveToRoot,
  updateTerm,
  updateTitle
}
