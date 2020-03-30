import mutations from '@/store/modules/tasks/mutations'
import actions from '@/store/modules/tasks/actions'
import getters from '@/store/modules/tasks/getters'

const state = {
  isInitialized: false,
  isSubmitting: false,
  errors: [],
  focusTargetId: null,
  tasks: []
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
