import * as types from '@/store/modules/tasks/mutationTypes'
import treeHandler from '@/modules/treeHandler'
// TODO: Use moment-timezone, handle JST.
import moment from 'moment'

export default {
  [types.REQUEST_FETCH_TASKS] (state) {
    state.isSubmitting = true
  },
  [types.SUCCESS_FETCH_TASKS] (state, { tasks }) {
    state.isSubmitting = false
    state.isInitialized = true
    if (tasks !== null) {
      // Change object keys from snake case to camelCase.
      tasks = treeHandler.cameledTasks(tasks)
      state.tasks = tasks
    } else {
      state.tasks = []
    }
    state.errors = []
  },
  [types.FAILURE_FETCH_TASKS] (state, error) {
    state.isSubmitting = false
    state.tasks = []
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
    state.tasks = treeHandler.cameledTasks([task])
    state.errors = []
  },
  [types.FAILURE_FETCH_TASK] (state, error) {
    state.isSubmitting = false
    if (error) {
      state.errors.push(error)
    }
  },
  [types.REQUEST_CREATE_TASK] (state, { title }) {
    state.isSubmitting = true
    state.tasks.push({
      id: 0, // Setting dummy, because TaskItem.vue requires id.
      title,
      type: 'task',
      completedAt: '',
      createdAt: moment().format('YYYY-MM-DD HH:mm:SS'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:SS'),
      depth: 1,
      children: [],
      isPending: true
    })
  },
  [types.SUCCESS_CREATE_TASK] (state, { task }) {
    state.isSubmitting = false
    // https://jp.vuejs.org/v2/guide/list.html#%E5%A4%89%E6%9B%B4%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89
    state.tasks.pop()
    state.tasks.push(treeHandler.cameledTask(task))
    state.errors = []
  },
  [types.FAILURE_CREATE_TASK] (state, error) {
    state.isSubmitting = false
    if (error) {
      state.errors.push(error)
    }
    state.tasks.forEach((task) => {
      if (task.isPending) {
        task.errors = task.errors ? task.errors : []
        task.errors.push({ message: 'Failed create task.' })
        task.isPending = false
      }
    })
  },
  [types.REQUEST_COMPLETE_TASK] (state, { id }) {
    state.isSubmitting = true
    state.submittingId = id
    // Find lanize target and update type from task to lane.
    treeHandler.execEach(state.tasks, (task, submittingId) => {
      if (task.id === submittingId) {
        task.completedAt = moment().format('YYYY-MM-DD HH:mm:SS')
      }
    }, id)
  },
  [types.SUCCESS_COMPLETE_TASK] (state) {
    state.isSubmitting = false
    state.submittingId = null
  },
  [types.FAILURE_COMPLETE_TASK] (state, error) {
    state.isSubmitting = false
    if (error) {
      state.errors.push(error)
    }
    // For each task in tree,
    // insert error if it's the task which failed submitting.
    treeHandler.execEach(state.tasks, (task, submittingId) => {
      if (task.id === submittingId) {
        task.completedAt = ''
        task.errors = task.errors ? task.errors : []
        task.errors.push({ message: 'Failed complete task.' })
      }
    }, state.submittingId)
    state.submittingId = null
  },
  [types.REQUEST_LANIZE_TASK] (state, { id }) {
    state.isSubmitting = true
    state.submittingId = id
    // Find lanize target and update type from task to lane.
    treeHandler.execEach(state.tasks, (task, submittingId) => {
      if (task.id === submittingId) {
        task.type = 'lane'
      }
    }, id)
  },
  [types.SUCCESS_LANIZE_TASK] (state) {
    state.isSubmitting = false
    state.submittingId = null
  },
  [types.FAILURE_LANIZE_TASK] (state, error) {
    state.isSubmitting = false
    if (error) {
      state.errors.push(error)
    }
    // For each task in tree,
    // insert error if it's the task which failed submitting.
    treeHandler.execEach(state.tasks, (task, submittingId) => {
      if (task.id === submittingId) {
        task.type = 'task'
        task.errors = task.errors ? task.errors : []
        task.errors.push({ message: 'Failed lanize task.' })
      }
    }, state.submittingId)
    state.submittingId = null
  },
  [types.REQUEST_MOVE_TASK_TO_CHILD] (state, { taskId, parentId }) {
    state.isSubmitting = true
    // Find target task,
    treeHandler.execEach(state.tasks, (task, payload) => {
      if (task.id === payload.id) {
        payload.state.movingTask = task
      }
    }, { id: taskId, state })
    // ... remove it,
    treeHandler.reduceById(state.tasks, taskId)
    // ... and add same task under target.
    // TODO: Consider sorting by id.
    treeHandler.execEach(state.tasks, (task, payload) => {
      if (task.id === payload.id) {
        task.children = task.children ? task.children : []
        payload.state.movingTask.depth = task.depth + 1
        task.children.push(payload.state.movingTask)
      }
    }, { id: parentId, state })
  },
  [types.SUCCESS_MOVE_TASK_TO_CHILD] (state) {
    state.isSubmitting = false
    state.movingTask = null
    state.errors = []
  },
  [types.FAILURE_MOVE_TASK_TO_CHILD] (state, error) {
    state.isSubmitting = false
    state.movingTask = null
    if (error) {
      state.errors.push(error)
    }
  },
  [types.REQUEST_MOVE_TASK_TO_ROOT] (state, { id }) {
    state.isSubmitting = true
    // Find target task,
    treeHandler.execEach(state.tasks, (task, payload) => {
      if (task.id === payload.id) {
        payload.state.movingTask = task
      }
    }, { id, state })
    // ... remove it,
    treeHandler.reduceById(state.tasks, id)
    // ... and add same task to root.
    // TODO: Consider sorting by id.
    state.tasks.push(state.movingTask)
  },
  [types.SUCCESS_MOVE_TASK_TO_ROOT] (state) {
    state.isSubmitting = false
    state.movingTask = null
    state.errors = []
  },
  [types.FAILURE_MOVE_TASK_TO_ROOT] (state, error) {
    state.isSubmitting = false
    state.movingTask = null
    if (error) {
      state.errors.push(error)
    }
  },
  [types.REQUEST_UPDATE_TASK_TERM] (state, { id, startsAt, expiresAt }) {
    state.isSubmitting = true
    treeHandler.execEach(state.tasks, (task, payload) => {
      if (task.id === payload.id) {
        task.startsAt = payload.startsAt
        task.expiresAt = payload.expiresAt
      }
    }, { id, startsAt, expiresAt })
  },
  [types.SUCCESS_UPDATE_TASK_TERM] (state) {
    state.isSubmitting = false
    state.errors = []
  },
  [types.FAILURE_UPDATE_TASK_TERM] (state, error) {
    state.isSubmitting = false
    if (error) {
      state.errors.push(error)
    }
  },
  [types.REQUEST_UPDATE_TASK_TITLE] (state) {
    state.isSubmitting = true
  },
  [types.SUCCESS_UPDATE_TASK_TITLE] (state, { id, title }) {
    state.isSubmitting = false
    treeHandler.execEach(state.tasks, (task, payload) => {
      if (task.id === payload.id) {
        task.title = payload.title
      }
    }, { id, title })
    state.errors = []
  },
  [types.FAILURE_UPDATE_TASK_TITLE] (state, error) {
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
  },
  [types.SET_SELECTED_TASK_ID] (state, { id }) {
    state.selectedTaskId = id
  },
  [types.UNSET_SELECTED_TASK_ID] (state) {
    state.selectedTaskId = null
  },
  [types.ENABLE_EDIT] (state, { id }) {
    state.editingTaskId = id
  },
  [types.LEAVE_EDIT] (state) {
    state.editingTaskId = null
  },
  [types.START_SCHEDULE] (state, { id }) {
    state.schedulingTaskId = id
  },
  [types.END_SCHEDULE] (state) {
    state.schedulingTaskId = null
  }
}
