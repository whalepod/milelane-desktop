import * as types from '@/store/modules/task/mutationTypes'
import API from '@/modules/api/task'

export default {
  async initTasks ({ dispatch, getters }) {
    if (getters.focusTargetId == null) {
      await dispatch('fetchTasks')
    } else {
      await dispatch('fetchTask', { id: getters.focusTargetId })
    }
  },
  async fetchTasks ({ commit }) {
    commit(types.REQUEST_FETCH_TASKS)
    try {
      const { data } = await API.fetch()
      commit(types.SUCCESS_FETCH_TASKS, { tasks: data })
    } catch (e) {
      commit(types.FAILURE_FETCH_TASKS, e)
    }
  },
  async fetchTask ({ commit }, { id }) {
    commit(types.REQUEST_FETCH_TASK, { id })
    try {
      const { data } = await API.get(id)
      commit(types.SUCCESS_FETCH_TASK, { task: data })
    } catch (e) {
      commit(types.FAILURE_FETCH_TASK, e)
    }
  },
  async focus ({ dispatch, commit, getters }, { id }) {
    await dispatch('fetchTask', { id })
    if (!getters.errors) {
      commit(types.SET_FOCUS_TARGET_ID, { id })
    }
    // TODO: handle if errors found.
  },
  async unfocus ({ commit, getters }, { id }) {
    await this.fetchTasks({ commit }, { id })
    if (!getters.errors) {
      commit(types.UNSET_FOCUS_TARGET_ID)
    }
    // TODO: handle if errors found.
  }
}
