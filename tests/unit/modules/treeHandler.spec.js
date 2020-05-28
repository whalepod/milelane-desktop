import treeHandler from '@/modules/treeHandler.js'

describe('modules/treeHandler.js', () => {
  describe('filterEach(treeableTasks, func, payload, strict)', () => {
    describe('with strict mode', () => {
      it('success filtering, removes unmatching tasks even their children matches filter', () => {
        const filterCondition = (task) => task.completedAt !== ''
        // TODO: introduce better task factory.
        // This mock is much too simplified.
        const tasks = [
          { completedAt: '' }, // This should be removed.
          { completedAt: '2020-05-31 00:00:00' },
          {
            completedAt: '',
            children: [
              { completedAt: '2020-05-31 00:00:00' }
            ]
          }, // This should be removed.
          {
            completedAt: '2020-05-31 00:00:00',
            children: [
              { completedAt: '' }, // This should be removed.
              { completedAt: '2020-05-31 00:00:00' }
            ]
          }
        ]
        const expected = [
          { completedAt: '2020-05-31 00:00:00' },
          {
            completedAt: '2020-05-31 00:00:00',
            children: [
              { completedAt: '2020-05-31 00:00:00' }
            ]
          }
        ]
        const actual = treeHandler.filterEach(tasks, filterCondition, {}, true)
        expect(actual).toStrictEqual(expected)
      })
    })
    describe('with not strict mode', () => {
      it('success filtering, keep unmatching tasks if their children matches filter', () => {
        const filterCondition = (task) => task.completedAt !== ''
        // TODO: introduce better task factory.
        // This mock is much too simplified.
        const tasks = [
          { completedAt: '' }, // This should be removed.
          { completedAt: '2020-05-31 00:00:00' },
          {
            completedAt: '',
            children: [
              { completedAt: '2020-05-31 00:00:00' }
            ]
          },
          {
            completedAt: '2020-05-31 00:00:00',
            children: [
              { completedAt: '' }, // This should be removed.
              { completedAt: '2020-05-31 00:00:00' }
            ]
          }
        ]
        const expected = [
          { completedAt: '2020-05-31 00:00:00' },
          {
            completedAt: '',
            children: [
              { completedAt: '2020-05-31 00:00:00' }
            ]
          },
          {
            completedAt: '2020-05-31 00:00:00',
            children: [
              { completedAt: '2020-05-31 00:00:00' }
            ]
          }
        ]
        const actual = treeHandler.filterEach(tasks, filterCondition, {}, false)
        expect(actual).toStrictEqual(expected)
      })
    })
  })
})
