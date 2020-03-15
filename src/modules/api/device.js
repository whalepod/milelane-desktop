import client from '@/modules/api/client'

const create = (deviceToken, deviceType) => client({}, false).post('/device/create', {
  device_token: deviceToken,
  device_type: deviceType
})

export default {
  create
}
