import * as types from '@/store/modules/task/mutationTypes'

export default {
  [types.REQUEST_FETCH_TASKS] (state) {
    state.isSubmitting = true
  },
  [types.SUCCESS_FETCH_TASKS] (state, { tasks }) {
    state.isSubmitting = false
    state.isInitialized = true
    state.tasks = tasks
    state.error = []
  },
  [types.FAILURE_FETCH_TASKS] (state, error) {
    state.isSubmitting = false
    if (error) {
      state.errors.push(error)
    }
  },
  [types.REQUEST_FETCH_TASK] (state) {
    state.isSubmitting = true
  },
  [types.SUCCESS_FETCH_TASK] (state, { task }) {
    state.isSubmitting = false
    state.isInitialized = true
    state.tasks = [task]
    state.error = []
  },
  [types.FAILURE_FETCH_TASK] (state, error) {
    state.isSubmitting = false
    if (error) {
      state.errors.push(error)
    }
  },
  [types.SET_FOCUS_TARGET_ID] (state, { id }) {
    state.focusTargetId = id
  },
  [types.UNSET_FOCUS_TARGET_ID] (state) {
    state.focusTargetId = null
  }
}
