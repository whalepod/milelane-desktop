import treeHandler from '@/modules/treeHandler.js'

describe('modules/treeHandler.js', () => {
  describe('filterEach(treeableTasks, func, payload)', () => {
    it('success filter only completed', () => {
      // TODO: introduce better task factory.
      // This mock is much too simplified.
      const tasks = [
        { completedAt: '' },
        { completedAt: '2020-05-31 00:00:00' }
      ]
      const expected = [
        { completedAt: '2020-05-31 00:00:00' }
      ]
      const actual = treeHandler.filterEach(tasks, (task) => task.completedAt != '', {})
      expect(actual).toStrictEqual(expected)
    })
  })
})
