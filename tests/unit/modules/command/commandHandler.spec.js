import commandHandler from '@/modules/command/commandHandler.js'

describe('modules/command/commandHandler.js', () => {
  describe('getCommandName()', () => {
    it('successfully returns `unfocus`', () => {
      expect(commandHandler.getCommandName('/unfocus')).toBe('unfocus')
    })
    it('successfully returns `help`', () => {
      expect(commandHandler.getCommandName('/help')).toBe('help')
    })
    it('successfully returns `/add`', () => {
      expect(commandHandler.getCommandName('/add test')).toBe('add')
    })
    it('returns false if not start with slash', () => {
      expect(commandHandler.getCommandName('add test')).toBe(false)
    })
    it('returns false if matched command name is not reserved word', () => {
      expect(commandHandler.getCommandName('/fail test')).toBe(false)
    })
  })
})
