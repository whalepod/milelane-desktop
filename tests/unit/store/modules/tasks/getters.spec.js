import getters from '@/store/modules/tasks/getters.js'

describe('store/modules/tasks/getters.js', () => {
  describe('tasks', () => {
    it('returns tasks in state', () => {
      const tasks = [
        {
          id: 1,
          title: 'test task title',
          type: 'task',
          completedAt: '',
          expiresAt: '',
          startsAt: '',
          depth: 1,
          createdAt: '2020-05-01 00:00:00',
          children: null
        }
      ]
      const state = {
        tasks: tasks
      }
      expect(getters.tasks(state)).toEqual(tasks)
    })
  })
  describe('filteredTasks', () => {
    let tasks
    beforeEach(() => {
      tasks = [
        // This will be extracted.
        {
          type: 'task',
          completedAt: '2020-05-31 23:59:59',
          expiresAt: '2020-05-31 23:59:59',
          createdAt: '2020-05-01 00:00:00',
          children: [
            // This will be extracted.
            {
              type: 'task',
              completedAt: '2020-05-31 23:59:59',
              expiresAt: '2020-05-31 23:59:59',
              createdAt: '2020-05-02 00:00:00'
            },
            // This will be filtered because completedAt is not in range.
            {
              type: 'task',
              completedAt: '2020-06-01 00:00:00',
              expiresAt: '2020-05-31 23:59:59',
              createdAt: '2020-05-03 00:00:00'
            }
          ]
        },
        // These will be filtered because ...
        // .. type is wrong.
        {
          type: 'lane',
          completedAt: '2020-05-31 23:59:59',
          expiresAt: '2020-05-31 23:59:59',
          createdAt: '2020-05-01 00:00:00'
        },
        // ... not completed.
        {
          type: 'task',
          completedAt: '',
          expiresAt: '2020-05-31 23:59:59',
          createdAt: '2020-05-01 00:00:00'
        },
        // ... completedAt is not in range.
        {
          type: 'task',
          completedAt: '2020-06-01 00:00:00',
          expiresAt: '2020-05-31 23:59:59',
          createdAt: '2020-05-01 00:00:00'
        },
        // ... expiresAt is not in range.
        {
          type: 'task',
          completedAt: '2020-05-31 23:59:59',
          expiresAt: '2020-06-01 00:00:00',
          createdAt: '2020-05-01 00:00:00'
        },
        // ... createdAt is not in range.
        {
          type: 'task',
          completedAt: '2020-05-31 23:59:59',
          expiresAt: '2020-05-31 23:59:59',
          createdAt: '2020-04-30 23:59:59'
        }
      ]
    })
    describe('with default', () => {
      it('returns all tasks', () => {
        const state = {
          tasks: tasks,
          filter: {
            enabledTaskTypes: ['task', 'lane'],
            isCompleted: null,
            completedAtWithin: { min: null, max: null },
            expiresAtWithin: { min: null, max: null },
            createdAtWithin: { min: null, max: null }
          }
        }
        expect(getters.filteredTasks(state)).toEqual(tasks)
      })
    })
    describe('with all conditions and nested object', () => {
      it('returns correctly filtered tasks', () => {
        const expectedFilteredTasks = [
          {
            type: 'task',
            completedAt: '2020-05-31 23:59:59',
            expiresAt: '2020-05-31 23:59:59',
            createdAt: '2020-05-01 00:00:00',
            children: [
              {
                type: 'task',
                completedAt: '2020-05-31 23:59:59',
                expiresAt: '2020-05-31 23:59:59',
                createdAt: '2020-05-02 00:00:00'
              }
            ]
          }
        ]
        const state = {
          tasks: tasks,
          filter: {
            enabledTaskTypes: ['task'],
            isCompleted: true,
            completedAtWithin: {
              min: '2020-04-30 23:59:59',
              max: '2020-06-01 00:00:00'
            },
            expiresAtWithin: {
              min: '2020-04-30 23:59:59',
              max: '2020-06-01 00:00:00'
            },
            createdAtWithin: {
              min: '2020-04-30 23:59:59',
              max: '2020-06-01 00:00:00'
            }
          }
        }
        expect(getters.filteredTasks(state)).toEqual(expectedFilteredTasks)
      })
    })
  })
})
