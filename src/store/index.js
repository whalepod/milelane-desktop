import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import device from '@/store/modules/device'
import task from '@/store/modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    device,
    task
  },
  plugins: [createPersistedState()]
})
