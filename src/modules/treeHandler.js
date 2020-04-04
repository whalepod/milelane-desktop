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

export default {
  execEach,
  reduceById
}
