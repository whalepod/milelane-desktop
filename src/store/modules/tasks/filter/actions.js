import * as types from '@/store/modules/tasks/filter/mutationTypes'

export default {
  setEnabledTaskTypes ({ commit }, { enabledTaskTypes }) {
    commit(types.SET_ENABLED_TASK_TYPES, { enabledTaskTypes })
  },
  setIsCompleted ({ commit }, { isCompleted }) {
    commit(types.SET_IS_COMPLETED, { isCompleted })
  },
  setCompletedAtWithin ({ commit }, { completedAtWithin }) {
    commit(types.SET_COMPLETED_AT_WITHIN, { completedAtWithin })
  },
  setExpiresAtWithin ({ commit }, { expiresAtWithin }) {
    commit(types.SET_EXPIRES_AT_WITHIN, { expiresAtWithin })
  },
  setCreatedAtWithin ({ commit }, { createdAtWithin }) {
    commit(types.SET_CREATED_AT_WITHIN, { createdAtWithin })
  }
}
