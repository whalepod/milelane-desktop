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
  async complete ({ commit }, { id }) {
    commit(types.REQUEST_COMPLETE_TASK, { id })
    try {
      await API.complete(id)
      commit(types.SUCCESS_COMPLETE_TASK)
    } catch (e) {
      commit(types.FAILURE_COMPLETE_TASK, e)
    }
  },
  async lanize ({ commit }, { id }) {
    commit(types.REQUEST_LANIZE_TASK, { id })
    try {
      await API.lanize(id)
      commit(types.SUCCESS_LANIZE_TASK)
    } catch (e) {
      commit(types.FAILURE_LANIZE_TASK, e)
    }
  },
  async moveToChild ({ commit }, { taskId, parentId }) {
    commit(types.REQUEST_MOVE_TASK_TO_CHILD, { taskId, parentId })
    try {
      await API.moveToChild(taskId, parentId)
      commit(types.SUCCESS_MOVE_TASK_TO_CHILD)
    } catch (e) {
      commit(types.FAILURE_MOVE_TASK_TO_CHILD, e)
    }
  },
  async moveToRoot ({ commit }, { id }) {
    commit(types.REQUEST_MOVE_TASK_TO_ROOT, { id })
    try {
      await API.moveToRoot(id)
      commit(types.SUCCESS_MOVE_TASK_TO_ROOT)
    } catch (e) {
      commit(types.FAILURE_MOVE_TASK_TO_ROOT, e)
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
  },
  async updateTerm ({ commit }, { id, startsAt, expiresAt }) {
    commit(types.REQUEST_UPDATE_TASK_TERM, { id, startsAt, expiresAt })
    await API.updateTerm(id, startsAt, expiresAt)
    try {
      commit(types.SUCCESS_UPDATE_TASK_TERM)
    } catch (e) {
      commit(types.FAILURE_UPDATE_TASK_TERM, e)
    }
  },
  async updateTitle ({ commit }, { id, title }) {
    commit(types.REQUEST_UPDATE_TASK_TITLE)
    await API.updateTitle(id, title)
    try {
      commit(types.SUCCESS_UPDATE_TASK_TITLE, { id, title })
    } catch (e) {
      commit(types.FAILURE_UPDATE_TASK_TITLE, e)
    }
  },
  enableEdit ({ commit }, { id }) {
    commit(types.ENABLE_EDIT, { id })
  },
  leaveEdit ({ commit }) {
    commit(types.LEAVE_EDIT)
  },
  async submitEdit ({ dispatch, commit, getters }, { title }) {
    await dispatch('updateTitle', {
      id: getters.editingTaskId,
      title
    })
    commit(types.LEAVE_EDIT)
  },
  select ({ commit }, { id }) {
    commit(types.SET_SELECTED_TASK_ID, { id })
  },
  deselect ({ commit }) {
    commit(types.UNSET_SELECTED_TASK_ID)
  },
  schedule ({ dispatch, commit }, { id }) {
    commit(types.START_SCHEDULE, { id })
    dispatch('modal/openSchedule', null, { root: true })
  },
  async commitSchedule ({ dispatch, commit, getters }, { startsAt, expiresAt }) {
    await dispatch('updateTerm', {
      id: getters.schedulingTaskId,
      startsAt,
      expiresAt
    })
    commit(types.END_SCHEDULE)
  },
  leaveSchedule ({ commit }) {
    commit(types.END_SCHEDULE)
  }
}
