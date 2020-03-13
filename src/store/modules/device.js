import mutations from '@/store/modules/device/mutations'
import actions from '@/store/modules/device/actions'

const state = {
  isInitialized: false,
  isSubmitting: false,
  errors: {},
  deviceToken: null,
  deviceUuid: null
}

const getters = {
  deviceToken: ({ deviceToken }) => deviceToken,
  deviceUuid: ({ deviceUuid }) => deviceUuid
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
