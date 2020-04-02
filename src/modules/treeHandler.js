/**
 * execEach executes function(func) recursively on treeableTask.
 * payload is arguments for the function.
 * @return { null }
 */
const execEach = (treeableTasks, func, payload) => {
  treeableTasks.forEach((task) => {
    func(task, payload)
    if (task.children && task.children.length !== 0) {
      execEach(task.children, func, payload)
    }
  })
}

export default {
  execEach
}
