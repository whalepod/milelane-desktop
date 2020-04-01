import * as types from '@/store/modules/device/mutationTypes'
import API from '@/modules/api/device'

export default {
  async createDeviceIfNeeded ({ commit, getters }, { deviceToken }) {
    if (getters.deviceUuid != null) {
      return
    }
    commit(types.REQUEST_CREATE_DEVICE, { deviceToken })
    try {
      // TODO: change 'desktop' to something like `env.process.platform`.
      const { data } = await API.create(deviceToken, 'desktop')
      commit(types.SUCCESS_CREATE_DEVICE, { deviceUuid: data.uuid })
    } catch (e) {
      commit(types.FAILURE_CREATE_DEVICE, e)
    }
  }
}
