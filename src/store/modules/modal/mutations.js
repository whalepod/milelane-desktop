import * as types from '@/store/modules/modal/mutationTypes'

export default {
  [types.OPEN_HELP_MODAL] (state) {
    state.shouldShowHelp = true
  },
  [types.OPEN_SCHEDULE_MODAL] (state) {
    state.shouldShowSchedule = true
  },
  [types.CLOSE_MODAL] (state) {
    // Add every type of shouldShow flags here.
    state.shouldShowHelp = false
    state.shouldShowSchedule = false
  }
}
