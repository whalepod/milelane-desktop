import * as types from '@/store/modules/tasks/mutationTypes'
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
  async create ({ commit }, { title }) {
    commit(types.REQUEST_CREATE_TASK, { title })
    try {
      const { data } = await API.create(title)
      commit(types.SUCCESS_CREATE_TASK, { task: data })
    } catch (e) {
      commit(types.FAILURE_CREATE_TASK, e)
    }
  },
  async focus ({ dispatch, commit, getters }, { id }) {
    await dispatch('fetchTask', { id })
    if (!getters.errors) {
      commit(types.SET_FOCUS_TARGET_ID, { id })
    }
    // TODO: handle if errors found.
  },
  async unfocus ({ dispatch, commit, getters }) {
    await dispatch('fetchTasks')
    if (!getters.errors) {
      commit(types.UNSET_FOCUS_TARGET_ID)
    }
    // TODO: handle if errors found.
  }
}
