import * as types from '@/store/modules/modal/mutationTypes'

export default {
  openHelp ({ commit }) { commit(types.OPEN_HELP_MODAL) },
  close ({ commit }) { commit(types.CLOSE_MODAL) }
}
