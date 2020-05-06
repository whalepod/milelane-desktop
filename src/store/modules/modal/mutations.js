import * as types from '@/store/modules/modal/mutationTypes'

export default {
  [types.OPEN_HELP_MODAL] (state) {
    state.shouldShowHelp = true
  },
  [types.CLOSE_MODAL] (state) {
    // Add every type of shouldShow flags here.
    state.shouldShowHelp = false
  }
}
