export default {
  shouldShowModal: ({ shouldShowHelp }) => [shouldShowHelp].some(flag => flag),
  shouldShowHelp: ({ shouldShowHelp }) => shouldShowHelp
}
