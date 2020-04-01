import axios from 'axios'
import env from '@/config/env'
import store from '@/store/index'

const client = (options, shouldAuth = true) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  if (shouldAuth) {
    headers['X-Device-UUID'] = store.state.device.deviceToken
  }

  const defaultOptions = {
    baseURL: env.apiBaseUrl,
    headers: headers,
    responseType: 'json'
  }
  return axios.create({ ...defaultOptions, ...options })
}

export default client
