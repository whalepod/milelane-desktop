import mutations from '@/store/modules/task/mutations'
import actions from '@/store/modules/task/actions'

const state = {
  isInitialized: false,
  isSubmitting: false,
  errors: {},
  focusTargetId: null,
  tasks: []
}

const getters = {
  errors: ({ errors }) => errors,
  focusTargetId: ({ focusTargetId }) => focusTargetId,
  tasks: ({ tasks }) => tasks
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
