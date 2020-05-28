import * as types from '@/store/modules/tasks/filter/mutationTypes'

export default {
  [types.SET_ENABLED_TASK_TYPES] (state, { enabledTaskTypes }) {
    state.enabledTaskTypes = enabledTaskTypes
  },
  [types.SET_IS_COMPLETED] (state, { isCompleted }) {
    state.isCompleted = isCompleted
  },
  [types.SET_COMPLETED_AT_WITHIN] (state, { completedAtWithin }) {
    state.completedAtWithin = completedAtWithin
  },
  [types.SET_EXPIRES_AT_WITHIN] (state, { expiresAtWithin }) {
    state.expiresAtWithin = expiresAtWithin
  },
  [types.SET_CREATED_AT_WITHIN] (state, { createdAtWithin }) {
    state.createdAtWithin = createdAtWithin
  }
}
