import actions from '@/store/modules/tasks/filter/actions.js'
import * as types from '@/store/modules/tasks/filter/mutationTypes.js'

describe('store/modules/tasks/filter/actions.js', () => {
  const commit = jest.fn()

  beforeEach(() => {
    commit.mockClear()
  })

  describe('setEnabledTaskTypes', () => {
    it('calls SET_ENABLED_TASK_TYPES', async () => {
      const enabledTaskTypes = ['task', 'lane']
      await actions.setEnabledTaskTypes({ commit }, { enabledTaskTypes })
      expect(commit).toHaveBeenCalledWith(types.SET_ENABLED_TASK_TYPES, { enabledTaskTypes })
    })
  })
  describe('setIsCompleted', () => {
    it('calls SET_IS_COMPLETED', async () => {
      const isCompleted = true
      await actions.setIsCompleted({ commit }, { isCompleted })
      expect(commit).toHaveBeenCalledWith(types.SET_IS_COMPLETED, { isCompleted })
    })
  })
  describe('setCompletedAtWithin', () => {
    it('calls SET_COMPLETED_AT_WITHIN', async () => {
      const completedAtWithin = { min: null, max: null }
      await actions.setCompletedAtWithin({ commit }, { completedAtWithin })
      expect(commit).toHaveBeenCalledWith(types.SET_COMPLETED_AT_WITHIN, { completedAtWithin })
    })
  })
  describe('setExpiresAtWithin', () => {
    it('calls SET_EXPIRES_AT_WITHIN', async () => {
      const expiresAtWithin = { min: null, max: null }
      await actions.setExpiresAtWithin({ commit }, { expiresAtWithin })
      expect(commit).toHaveBeenCalledWith(types.SET_EXPIRES_AT_WITHIN, { expiresAtWithin })
    })
  })
  describe('setCreatedAtWithin', () => {
    it('calls SET_CREATED_AT_WITHIN', async () => {
      const createdAtWithin = { min: null, max: null }
      await actions.setCreatedAtWithin({ commit }, { createdAtWithin })
      expect(commit).toHaveBeenCalledWith(types.SET_CREATED_AT_WITHIN, { createdAtWithin })
    })
  })
})
