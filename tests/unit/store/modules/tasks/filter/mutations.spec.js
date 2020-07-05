import mutations from '@/store/modules/tasks/filter/mutations.js'

describe('store/modules/tasks/filter/mutations.js', () => {
  describe('SET_ENABLED_TASK_TYPES', () => {
    it('updates enabledTaskTypes', () => {
      const enabledTaskTypes = ['task', 'lane']
      const state = {
        enabledTaskTypes: []
      }

      mutations.SET_ENABLED_TASK_TYPES(state, { enabledTaskTypes })

      expect(state.enabledTaskTypes).toEqual(enabledTaskTypes)
    })
  })
  describe('SET_IS_COMPLETED', () => {
    it('updates isCompleted', () => {
      const isCompleted = null
      const state = {
        isCompleted: false
      }

      mutations.SET_IS_COMPLETED(state, { isCompleted })

      expect(state.isCompleted).toEqual(isCompleted)
    })
  })
  describe('SET_COMPLETED_AT_WITHIN', () => {
    it('updates completedAtWithin', () => {
      const completedAtWithin = {
        min: '2020-05-01',
        max: '2020-06-01'
      }
      const state = {
        completedAtWithin: {
          min: null,
          max: null
        }
      }

      mutations.SET_COMPLETED_AT_WITHIN(state, { completedAtWithin })

      expect(state.completedAtWithin).toEqual(completedAtWithin)
    })
  })
  describe('SET_EXPIRES_AT_WITHIN', () => {
    it('updates expiresAtWithin', () => {
      const expiresAtWithin = {
        min: '2020-05-01',
        max: '2020-06-01'
      }
      const state = {
        expiresAtWithin: {
          min: null,
          max: null
        }
      }

      mutations.SET_EXPIRES_AT_WITHIN(state, { expiresAtWithin })

      expect(state.expiresAtWithin).toEqual(expiresAtWithin)
    })
  })
  describe('SET_CREATED_AT_WITHIN', () => {
    it('updates createdAtWithin', () => {
      const createdAtWithin = {
        min: '2020-05-01',
        max: '2020-06-01'
      }
      const state = {
        createdAtWithin: {
          min: null,
          max: null
        }
      }

      mutations.SET_CREATED_AT_WITHIN(state, { createdAtWithin })

      expect(state.createdAtWithin).toEqual(createdAtWithin)
    })
  })
})
