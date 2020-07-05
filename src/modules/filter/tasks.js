import treeHandler from '@/modules/treeHandler'
import moment from 'moment'

const filterByEnabledTaskTypes = (tasks, enabledTaskTypes) => {
  const condition = (task) => enabledTaskTypes.some(type => type === task.type)
  return treeHandler.filterEach(tasks, condition, enabledTaskTypes, false)
}

const filterByIsCompleted = (tasks, isCompleted) => {
  if (isCompleted === null) {
    return tasks
  }
  const condition = (task, isCompleted) => isCompleted ? task.completedAt !== '' : task.completedAt === ''
  return treeHandler.filterEach(tasks, condition, isCompleted, false)
}

const filterByCompletedAtWithin = (tasks, completedAtWithin) => {
  if (completedAtWithin.max === null && completedAtWithin.min === null) {
    return tasks
  }
  const condition = (task, completedAtWithin) => {
    if (completedAtWithin.max === null) {
      return moment(task.completedAt).isAfter(moment(completedAtWithin.min))
    } else if (completedAtWithin.min === null) {
      return moment(task.completedAt).isBefore(moment(completedAtWithin.max))
    } else {
      return moment(task.completedAt).isBetween(moment(completedAtWithin.min), moment(completedAtWithin.max))
    }
  }
  return treeHandler.filterEach(tasks, condition, completedAtWithin, false)
}

const filterByExpiresAtWithin = (tasks, expiresAtWithin) => {
  if (expiresAtWithin.max === null && expiresAtWithin.min === null) {
    return tasks
  }
  const condition = (task, expiresAtWithin) => {
    if (expiresAtWithin.max === null) {
      return moment(task.expiresAt).isAfter(moment(expiresAtWithin.min))
    } else if (expiresAtWithin.min === null) {
      return moment(task.expiresAt).isBefore(moment(expiresAtWithin.max))
    } else {
      return moment(task.expiresAt).isBetween(moment(expiresAtWithin.min), moment(expiresAtWithin.max))
    }
  }
  return treeHandler.filterEach(tasks, condition, expiresAtWithin, false)
}

const filterByCreatedAtWithin = (tasks, createdAtWithin) => {
  if (createdAtWithin.max === null && createdAtWithin.min === null) {
    return tasks
  }
  const condition = (task, createdAtWithin) => {
    if (createdAtWithin.max === null) {
      return moment(task.createdAt).isAfter(moment(createdAtWithin.min))
    } else if (createdAtWithin.min === null) {
      return moment(task.createdAt).isBefore(moment(createdAtWithin.max))
    } else {
      return moment(task.createdAt).isBetween(moment(createdAtWithin.min), moment(createdAtWithin.max))
    }
  }
  return treeHandler.filterEach(tasks, condition, createdAtWithin, false)
}

export default {
  filterByEnabledTaskTypes,
  filterByIsCompleted,
  filterByCompletedAtWithin,
  filterByExpiresAtWithin,
  filterByCreatedAtWithin
}
