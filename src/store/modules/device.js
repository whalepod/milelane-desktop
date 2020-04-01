import mutations from '@/store/modules/device/mutations'
import actions from '@/store/modules/device/actions'
import getters from '@/store/modules/device/getters'

const state = {
  isInitialized: false,
  isSubmitting: false,
  errors: [],
  deviceToken: null,
  deviceUuid: null
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
