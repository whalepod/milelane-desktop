import axios from 'axios'

// TODO: should be replaced with env value.
const baseUrl = 'http://localhost:8089/'

const create = (deviceId, deviceType) => axios.post(`${baseUrl}device/create`, {
  device_id: deviceId,
  device_type: deviceType
})

export default {
  create
}
