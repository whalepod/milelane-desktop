import axios from 'axios'

// TODO: should be replaced with env value.
const baseUrl = 'http://localhost:8089/'

const fetch = () => axios.get(`${baseUrl}tasks`)
const get = (id) => axios.get(`${baseUrl}tasks/${id}`)
const complete = (id) => axios.post(`${baseUrl}tasks/${id}/complete`)
const lanize = (id) => axios.post(`${baseUrl}tasks/${id}/lanize`)
const moveToChild = (taskId, parentId) => axios.post(`${baseUrl}tasks/${taskId}/move-to-child/${parentId}`)
const moveToRoot = (taskId) => axios.post(`${baseUrl}tasks/${taskId}/move-to-root`)

export default {
  fetch,
  get,
  complete,
  lanize,
  moveToChild,
  moveToRoot
}
