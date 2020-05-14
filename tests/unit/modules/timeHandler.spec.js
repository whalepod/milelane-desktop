import timeHandler from '@/modules/timeHandler.js'

describe('modules/timeHandler.js', () => {
  describe('parse()', () => {
    it('success parse format like `2006-01-02 15:04:05`', () => {
      expect(timeHandler.parse('2006-01-02 15:04:05').year()).toBe(2006)
    })
  })
  describe('displayTime()', () => {
    it('success display format like `2006-01-02 15:04:05`', () => {
      expect(timeHandler.displayTime('2006-01-02 15:04:05')).toBe('2006-01-02')
    })
    it('fails display format like `invalid format`', () => {
      expect(timeHandler.displayTime('invalid format')).toBe('invalid datetime')
    })
  })
})
