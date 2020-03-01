const state = {
  deviceId: null
}

const mutations = {
  SET_DEVICE_ID (state, deviceId) {
    state.deviceId = deviceId
  },
  UNSET_DEVICE_ID (state) {
    state.deviceId = null
  }
}

const actions = {
  async setDeviceId ({ commit }, deviceId) {
    commit('SET_DEVICE_ID', deviceId)
  },
  async unsetDeviceId ({ commit }) {
    commit('UNSET_DEVICE_ID')
  }
}

export default {
  state,
  mutations,
  actions
}
