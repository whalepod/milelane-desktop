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
  },
  [types.FAILURE_CREATE_DEVICE] (state, errors = {}) {
    state.errors = errors
    state.isSubmitting = false
  }
}
