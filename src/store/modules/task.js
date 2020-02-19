const state = {
  focusTargetId: null
}

const mutations = {
  SET_FOCUS_TARGET_ID (state, targetId) {
    state.focusTargetId = targetId
  },
  UNSET_FOCUS_TARGET_ID (state) {
    state.focusTargetId = null
  }
}

const actions = {
  async setFocusTarget ({ commit }, targetId) {
    commit('SET_FOCUS_TARGET_ID', targetId)
  },
  async unsetFocusTarget ({ commit }) {
    commit('UNSET_FOCUS_TARGET_ID')
  }
}

export default {
  state,
  mutations,
  actions
}
