const state = {
  deviceUuid: null,
  deviceToken: null
}

const mutations = {
  SET_DEVICE_UUID (state, deviceUuid) {
    state.deviceUuid = deviceUuid
  },
  UNSET_DEVICE_UUID (state) {
    state.deviceUuid = null
  },
  SET_DEVICE_TOKEN (state, deviceToken) {
    state.deviceToken = deviceToken
  },
  UNSET_DEVICE_TOKEN (state) {
    state.deviceToken = null
  }
}

const actions = {
  async setDeviceUuid ({ commit }, deviceUuid) {
    commit('SET_DEVICE_UUID', deviceUuid)
  },
  async unsetDeviceUuid ({ commit }) {
    commit('UNSET_DEVICE_UUID')
  },
  async setDeviceToken ({ commit }, deviceToken) {
    commit('SET_DEVICE_TOKEN', deviceToken)
  },
  async unsetDeviceToken ({ commit }) {
    commit('UNSET_DEVICE_TOKEN')
  }
}

export default {
  state,
  mutations,
  actions
}
