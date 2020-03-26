import * as types from '@/store/modules/task/mutationTypes'

export default {
  [types.REQUEST_FETCH_TASKS] (state) {
    state.isSubmitting = true
  },
  [types.SUCCESS_FETCH_TASKS] (state, { tasks }) {
    state.isSubmitting = false
    state.isInitialized = true
    state.tasks = tasks
  },
  [types.FAILURE_FETCH_TASKS] (state, errors = {}) {
    state.errors = errors
    state.isSubmitting = false
  },
  [types.REQUEST_FETCH_TASK] (state) {
    state.isSubmitting = true
  },
  [types.SUCCESS_FETCH_TASK] (state, { task }) {
    state.isSubmitting = false
    state.isInitialized = true
    state.tasks = [task]
  },
  [types.FAILURE_FETCH_TASK] (state, errors = {}) {
    state.errors = errors
    state.isSubmitting = false
  },
  [types.SET_FOCUS_TARGET_ID] (state, { id }) {
    state.focusTargetId = id
  },
  [types.UNSET_FOCUS_TARGET_ID] (state) {
    state.focusTargetId = null
  }
}
