import taskFilter from '@/modules/filter/tasks.js'

describe('modules/filter/tasks.js', () => {
  let tasks
  describe('filterByEnabledTaskTypes()', () => {
    beforeEach(() => {
      tasks = [
        { type: 'task' },
        { type: 'lane' }
      ]
    })
    describe('with all types', () => {
      it('returns all tasks', () => {
        const actualTasks = taskFilter.filterByEnabledTaskTypes(tasks, ['task', 'lane'])
        expect(actualTasks).toEqual(tasks)
      })
    })
    describe('with task type', () => {
      it('returns filtered tasks', () => {
        const expectedTasks = [
          { type: 'task' }
        ]
        const actualTasks = taskFilter.filterByEnabledTaskTypes(tasks, ['task'])
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
    describe('with lane type', () => {
      it('returns filtered tasks', () => {
        const expectedTasks = [
          { type: 'lane' }
        ]
        const actualTasks = taskFilter.filterByEnabledTaskTypes(tasks, ['lane'])
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
  })
  describe('filterByIsCompleted()', () => {
    beforeEach(() => {
      tasks = [
        { completedAt: '' },
        { completedAt: '2020-05-01 00:00:00' }
      ]
    })
    describe('with null value', () => {
      it('returns all tasks', () => {
        const actualTasks = taskFilter.filterByIsCompleted(tasks, null)
        expect(actualTasks).toEqual(tasks)
      })
    })
    describe('with true', () => {
      it('returns completed tasks', () => {
        const expectedTasks = [
          { completedAt: '2020-05-01 00:00:00' }
        ]
        const actualTasks = taskFilter.filterByIsCompleted(tasks, true)
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
    describe('with false', () => {
      it('returns uncompleted tasks', () => {
        const expectedTasks = [
          { completedAt: '' }
        ]
        const actualTasks = taskFilter.filterByIsCompleted(tasks, false)
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
  })
  describe('filterByCompletedAtWithin()', () => {
    beforeEach(() => {
      tasks = [
        { completedAt: '' },
        { completedAt: '2020-05-31 23:59:59' },
        { completedAt: '2020-06-01 00:00:00' },
        { completedAt: '2020-06-30 23:59:59' },
        { completedAt: '2020-07-01 00:00:00' }
      ]
    })
    describe('with blank condition', () => {
      it('returns all tasks', () => {
        const actualTasks = taskFilter.filterByCompletedAtWithin(tasks, { min: null, max: null })
        expect(actualTasks).toEqual(tasks)
      })
    })
    describe('only with max condition', () => {
      it('returns tasks before max, excluding same and blank.', () => {
        const expectedTasks = [
          { completedAt: '2020-05-31 23:59:59' }
        ]
        const actualTasks = taskFilter.filterByCompletedAtWithin(tasks, {
          min: null,
          max: '2020-06-01 00:00:00'
        })
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
    describe('only with min condition', () => {
      it('returns tasks after min, excluding same and blank.', () => {
        const expectedTasks = [
          { completedAt: '2020-07-01 00:00:00' }
        ]
        const actualTasks = taskFilter.filterByCompletedAtWithin(tasks, {
          min: '2020-06-30 23:59:59',
          max: null
        })
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
    describe('with both min and max condition', () => {
      it('returns tasks between min and max, excluding same and blank.', () => {
        const expectedTasks = [
          { completedAt: '2020-06-01 00:00:00' },
          { completedAt: '2020-06-30 23:59:59' }
        ]
        const actualTasks = taskFilter.filterByCompletedAtWithin(tasks, {
          min: '2020-05-31 23:59:59',
          max: '2020-07-01 00:00:00'
        })
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
  })
  describe('filterByExpiresAtWithin()', () => {
    beforeEach(() => {
      tasks = [
        { expiresAt: '' },
        { expiresAt: '2020-05-31 23:59:59' },
        { expiresAt: '2020-06-01 00:00:00' },
        { expiresAt: '2020-06-30 23:59:59' },
        { expiresAt: '2020-07-01 00:00:00' }
      ]
    })
    describe('with blank condition', () => {
      it('returns all tasks', () => {
        const actualTasks = taskFilter.filterByExpiresAtWithin(tasks, { min: null, max: null })
        expect(actualTasks).toEqual(tasks)
      })
    })
    describe('only with max condition', () => {
      it('returns tasks before max, excluding same and blank.', () => {
        const expectedTasks = [
          { expiresAt: '2020-05-31 23:59:59' }
        ]
        const actualTasks = taskFilter.filterByExpiresAtWithin(tasks, {
          min: null,
          max: '2020-06-01 00:00:00'
        })
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
    describe('only with min condition', () => {
      it('returns tasks after min, excluding same and blank.', () => {
        const expectedTasks = [
          { expiresAt: '2020-07-01 00:00:00' }
        ]
        const actualTasks = taskFilter.filterByExpiresAtWithin(tasks, {
          min: '2020-06-30 23:59:59',
          max: null
        })
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
    describe('with both min and max condition', () => {
      it('returns tasks between min and max, excluding same and blank.', () => {
        const expectedTasks = [
          { expiresAt: '2020-06-01 00:00:00' },
          { expiresAt: '2020-06-30 23:59:59' }
        ]
        const actualTasks = taskFilter.filterByExpiresAtWithin(tasks, {
          min: '2020-05-31 23:59:59',
          max: '2020-07-01 00:00:00'
        })
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
  })
  describe('filterByCreatedAtWithin()', () => {
    beforeEach(() => {
      tasks = [
        { createdAt: '' },
        { createdAt: '2020-05-31 23:59:59' },
        { createdAt: '2020-06-01 00:00:00' },
        { createdAt: '2020-06-30 23:59:59' },
        { createdAt: '2020-07-01 00:00:00' }
      ]
    })
    describe('with blank condition', () => {
      it('returns all tasks', () => {
        const actualTasks = taskFilter.filterByCreatedAtWithin(tasks, { min: null, max: null })
        expect(actualTasks).toEqual(tasks)
      })
    })
    describe('only with max condition', () => {
      it('returns tasks before max, excluding same and blank.', () => {
        const expectedTasks = [
          { createdAt: '2020-05-31 23:59:59' }
        ]
        const actualTasks = taskFilter.filterByCreatedAtWithin(tasks, {
          min: null,
          max: '2020-06-01 00:00:00'
        })
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
    describe('only with min condition', () => {
      it('returns tasks after min, excluding same and blank.', () => {
        const expectedTasks = [
          { createdAt: '2020-07-01 00:00:00' }
        ]
        const actualTasks = taskFilter.filterByCreatedAtWithin(tasks, {
          min: '2020-06-30 23:59:59',
          max: null
        })
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
    describe('with both min and max condition', () => {
      it('returns tasks between min and max, excluding same and blank.', () => {
        const expectedTasks = [
          { createdAt: '2020-06-01 00:00:00' },
          { createdAt: '2020-06-30 23:59:59' }
        ]
        const actualTasks = taskFilter.filterByCreatedAtWithin(tasks, {
          min: '2020-05-31 23:59:59',
          max: '2020-07-01 00:00:00'
        })
        expect(actualTasks).toEqual(expectedTasks)
      })
    })
  })
})
