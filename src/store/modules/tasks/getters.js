import treeHandler from '@/modules/treeHandler'
import taskFilter from '@/modules/filter/tasks'

export default {
  errors: ({ errors }) => errors,
  focusTargetId: ({ focusTargetId }) => focusTargetId,
  selectedTaskId: ({ selectedTaskId }) => selectedTaskId,
  isScheduling: ({ isScheduling }) => isScheduling,
  schedulingTaskId: ({ schedulingTaskId }) => schedulingTaskId,
  schedulingTask: ({ tasks, schedulingTaskId }) => {
    return treeHandler.findById(tasks, schedulingTaskId)
  },
  editingTaskId: ({ editingTaskId }) => editingTaskId,
  tasks: ({ tasks }) => tasks,
  filteredTasks: ({ tasks, filter }) => {
    // This type of deep copy is not perfect.
    // https://qiita.com/knhr__/items/d7de463bf9013d5d3dc0
    let filteredTasks = JSON.parse(JSON.stringify(tasks))
    filteredTasks = taskFilter.filterByEnabledTaskTypes(filteredTasks, filter.enabledTaskTypes)
    filteredTasks = taskFilter.filterByIsCompleted(filteredTasks, filter.isCompleted)
    filteredTasks = taskFilter.filterByCompletedAtWithin(filteredTasks, filter.completedAtWithin)
    filteredTasks = taskFilter.filterByExpiresAtWithin(filteredTasks, filter.expiresAtWithin)
    filteredTasks = taskFilter.filterByCreatedAtWithin(filteredTasks, filter.createdAtWithin)
    return filteredTasks
  }
}
