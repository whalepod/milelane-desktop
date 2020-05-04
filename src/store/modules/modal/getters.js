export default {
  shouldShowModal: ({
    shouldShowHelp,
    shouldShowSchedule
  }) => [
    shouldShowHelp,
    shouldShowSchedule
  ].some(flag => flag),
  shouldShowHelp: ({ shouldShowHelp }) => shouldShowHelp,
  shouldShowSchedule: ({ shouldShowSchedule }) => shouldShowSchedule
}
