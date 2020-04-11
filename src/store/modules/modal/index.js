import mutations from '@/store/modules/modal/mutations'
import actions from '@/store/modules/modal/actions'
import getters from '@/store/modules/modal/getters'

const state = {
  shouldShowHelp: false
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
