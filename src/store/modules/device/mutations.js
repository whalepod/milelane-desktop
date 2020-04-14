import * as types from '@/store/modules/device/mutationTypes'

export default {
  [types.REQUEST_CREATE_DEVICE] (state, { deviceToken }) {
    state.isSubmitting = true
    state.deviceToken = deviceToken
  },
  [types.SUCCESS_CREATE_DEVICE] (state, { deviceUuid }) {
    state.isSubmitting = false
    state.isInitialized = true
    state.deviceUuid = deviceUuid
    state.errors = []
  },
  [types.FAILURE_CREATE_DEVICE] (state, error) {
    state.isSubmitting = false
    if (error) {
      state.errors.push(error)
    }
  },
  [types.SET_DEVICE_UUID] (state, { deviceUuid }) {
    state.deviceUuid = deviceUuid
  }
}
