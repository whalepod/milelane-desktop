import treeHandler from '@/modules/treeHandler'

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
  tasks: ({ tasks }) => tasks
}
