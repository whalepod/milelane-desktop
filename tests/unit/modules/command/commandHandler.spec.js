import commandHandler from '@/modules/command/commandHandler.js'

describe('modules/command/commandHandler.js', () => {
  describe('getCommandName()', () => {
    it('successfully call command `unfocus`', () => {
      expect(commandHandler.getCommandName('/unfocus')).toBe('unfocus')
    })
    it('successfully call command `help`', () => {
      expect(commandHandler.getCommandName('/help')).toBe('help')
    })
    it('successfully call reserved command `/add`', () => {
      expect(commandHandler.getCommandName('/add test')).toBe('add')
    })
    it('failed to call no slash command `add`', () => {
      expect(commandHandler.getCommandName('add test')).toBe(false)
    })
    it('failed to call reserved command `/faile`', () => {
      expect(commandHandler.getCommandName('/fail test')).toBe(false)
    })
  })
})
