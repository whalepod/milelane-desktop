import mutations from '@/store/modules/tasks/mutations'
import actions from '@/store/modules/tasks/actions'
import getters from '@/store/modules/tasks/getters'

const state = {
  isInitialized: false,
  isSubmitting: false,
  submittingId: null,
  isScheduling: false,
  // schedulingTaskId is used to define which task is on scheduling.
  schedulingTaskId: null,
  movingTask: null,
  errors: [],
  // focusTargetId is used to fetch only 1 parental task from API.
  focusTargetId: null,
  // selectedTaskId is used to define action target. It effects on keyboard action.
  selectedTaskId: null,
  editingTaskId: null,
  tasks: []
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
