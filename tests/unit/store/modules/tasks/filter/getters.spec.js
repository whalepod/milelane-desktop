import getters from '@/store/modules/tasks/filter/getters.js'

describe('store/modules/tasks/filter/getters.js', () => {
  const state = {
    enabledTaskTypes: [],
    isCompleted: null,
    completedAtWithin: { min: null, max: null },
    expiresAtWithin: { min: null, max: null },
    createdAtWithin: { min: null, max: null }
  }
  describe('enabledTaskTypes', () => {
    it('returns enabledTaskTypes in state', () => {
      expect(getters.enabledTaskTypes(state)).toEqual(state.enabledTaskTypes)
    })
  })
  describe('isCompleted', () => {
    it('returns isCompleted in state', () => {
      expect(getters.isCompleted(state)).toEqual(state.isCompleted)
    })
  })
  describe('completedAtWithin', () => {
    it('returns completedAtWithin in state', () => {
      expect(getters.completedAtWithin(state)).toEqual(state.completedAtWithin)
    })
  })
  describe('expiresAtWithin', () => {
    it('returns expiresAtWithin in state', () => {
      expect(getters.expiresAtWithin(state)).toEqual(state.expiresAtWithin)
    })
  })
  describe('createdAtWithin', () => {
    it('returns createdAtWithin in state', () => {
      expect(getters.createdAtWithin(state)).toEqual(state.createdAtWithin)
    })
  })
})
