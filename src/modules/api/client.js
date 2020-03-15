import axios from 'axios'
import store from '@/store/index'

const baseUrl = 'http://localhost:8089/'

const client = (options, shouldAuth = true) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  if (shouldAuth) {
    headers['X-Device-UUID'] = store.state.device.deviceToken
  }

  const defaultOptions = {
    baseURL: baseUrl,
    headers: headers,
    responseType: 'json'
  }
  return axios.create({ ...defaultOptions, ...options })
}

export default client
