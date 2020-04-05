import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import modal from '@/store/modules/modal'
import device from '@/store/modules/device'
import tasks from '@/store/modules/tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modal,
    device,
    tasks
  },
  plugins: [createPersistedState()]
})
