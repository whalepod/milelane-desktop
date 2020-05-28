/**
 * execEach executes function(func) recursively on treeableTask.
 * payload is arguments for the function.
 * @param {*} treeableTasks
 * @param {*} func
 * @param {*} payload
 */
const execEach = (treeableTasks, func, payload) => {
  treeableTasks.forEach((task) => {
    func(task, payload)
    if (task.children && task.children.length !== 0) {
      execEach(task.children, func, payload)
    }
  })
}

/**
 * filterEach filters treeableTask by function(func) recursively.
 * payload is arguments for the function.
 * If the filter removes parent task,
 * its child tasks are simaltaneously removed.
 * @param {*} treeableTasks
 * @param {*} func is executed on each task to judge filter or not.
 * @param {*} payload is arguments for the function.
 * @param { Boolean } strict
 * @return {*} treeableTasks
 */
const filterEach = (treeableTasks, func, payload, strict) => {
  if (strict) {
    treeableTasks = treeableTasks.filter((task) => func(task, payload))
  }
  treeableTasks.forEach((task) => {
    if (task.children && task.children.length !== 0) {
      task.children = filterEach(task.children, func, payload, strict)
    }
  })
  if (!strict) {
    treeableTasks = treeableTasks.filter((task) => {
      if (task.children && task.children.length !== 0) {
        return true
      }
      return func(task, payload)
    })
  }
  return treeableTasks
}

/**
 * findById returns treeableTask by id.
 * @param {*} treeableTasks
 * @param { Number } id
 * @return { * | Boolean } treeableTask or false ( that means no task found. )
 */
const findById = (treeableTasks, id) => {
  const index = treeableTasks.map(task => task.id).indexOf(id)
  if (index !== -1) {
    return treeableTasks[index]
  }
  treeableTasks.forEach((task) => {
    if (task.children && task.children.length !== 0) {
      const result = findById(task.children, id)
      if (result) { return result }
    }
  })
  return false
}

/**
 * reduceById reduces treeableTask by id.
 * @param {*} treeableTasks
 * @param { Number } id
 * @return { Boolean } means whether removal success or not.
 */
const reduceById = (treeableTasks, id) => {
  // FIXME: reduceなどを使ってもっとシンプルに書ける気がする
  const index = treeableTasks.map(task => task.id).indexOf(id)
  if (index !== -1) {
    treeableTasks.splice(index, 1)
    return true
  }
  treeableTasks.forEach((task) => {
    if (task.children && task.children.length !== 0) {
      const result = reduceById(task.children, id)
      if (result) { return true }
    }
  })
  return false
}

/**
 * cameledTasks returns converted tasks with object keys camelCase-ed.
 * @param {*} treeableTasks
 * @return {*} treeableTasks
 */
const cameledTasks = (treeableTasks) => {
  return treeableTasks.map((task) => {
    task.completedAt = task.completed_at
    task.startsAt = task.starts_at
    task.expiresAt = task.expires_at
    task.createdAt = task.created_at
    task.updatedAt = task.updated_at
    delete task.completed_at
    delete task.starts_at
    delete task.expires_at
    delete task.created_at
    delete task.updated_at
    if (task.children instanceof Array) {
      task.children = cameledTasks(task.children)
    }
    return task
  })
}

/**
 * cameledTask returns converted task with object keys camelCase-ed.
 * @param {*} treeableTask
 * @return {*} treeableTask
 */
const cameledTask = (task) => {
  task.completedAt = task.completed_at
  task.startsAt = task.starts_at
  task.expiresAt = task.expires_at
  task.createdAt = task.created_at
  task.updatedAt = task.updated_at
  delete task.completed_at
  delete task.starts_at
  delete task.expires_at
  delete task.created_at
  delete task.updated_at
  if (task.children instanceof Array) {
    task.children = cameledTasks(task.children)
  }
  return task
}

export default {
  execEach,
  filterEach,
  findById,
  reduceById,
  cameledTasks,
  cameledTask
}
