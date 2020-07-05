import mutations from '@/store/modules/tasks/filter/mutations'
import actions from '@/store/modules/tasks/filter/actions'
import getters from '@/store/modules/tasks/filter/getters'

const state = {
  enabledTaskTypes: [
    'task',
    'lane'
  ],
  /**
   * null : all
   * true : only completed
   * false: only uncompleted
   */
  isCompleted: null,
  completedAtWithin: {
    min: null,
    max: null
  },
  expiresAtWithin: {
    min: null,
    max: null
  },
  createdAtWithin: {
    min: null,
    max: null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
