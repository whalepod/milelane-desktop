import { shallowMount, createLocalVue } from '@vue/test-utils'
import TheFilter from '@/components/TheFilter.vue'
import Vuex from 'vuex'
import moment from 'moment'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('components/TheFilter.vue', () => {
  let wrapper
  const filter = {
    namespaced: true,
    getters: {
      enabledTaskTypes: () => ['task', 'lane'],
      isCompleted: () => null,
      completedAtWithin: () => { return { min: null, max: null } }
    },
    actions: {
      setEnabledTaskTypes: jest.fn(),
      setIsCompleted: jest.fn(),
      setCompletedAtWithin: jest.fn()
    }
  }
  const store = new Vuex.Store({
    modules: {
      tasks: {
        namespaced: true,
        modules: {
          filter
        }
      }
    }
  })
  beforeEach(() => {
    wrapper = shallowMount(TheFilter, {
      store,
      localVue
    })
  })
  it('init', () => {
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.find('section').exists()).toBe(false)
  })
  describe('without filter', () => {
    describe('on click filter button', () => {
      it('shows filter', () => {
        const showFilterButton = wrapper.find('button#showFilterButton')
        showFilterButton.trigger('click')
        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('section').exists()).toBe(true)
        })
      })
    })
  })
  describe('with filter', () => {
    beforeEach(() => {
      wrapper.setData({ shouldShowFilter: true })
    })
    describe('on click hide button', () => {
      it('hides filter', () => {
        const hideFilterButton = wrapper.find('button#hideFilterButton')
        hideFilterButton.trigger('click')
        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('section').exists()).toBe(false)
        })
      })
    })
    describe('selecting taskTypes', () => {
      let typeTaskCheckbox
      beforeEach(() => {
        wrapper.setData({ shouldShowFilter: true })
        typeTaskCheckbox = wrapper.find('input#typeTaskCheckbox')
      })
      describe('on check `task`', () => {
        it('calls setEnabledTaskTypes', () => {
          typeTaskCheckbox.setChecked(false)
          wrapper.vm.$nextTick(() => {
            expect(filter.actions.setEnabledTaskTypes).toHaveBeenCalledWith(expect.anything(), { enabledTaskTypes: ['lane'] })
          })
        })
      })
      describe('on uncheck `task`', () => {
        it('calls setEnabledTaskTypes', () => {
          typeTaskCheckbox.setChecked(false)
          // To trigger value change on vuex store,
          // using $nextTick.
          // At first, typeTaskCheckbox is set true,
          // so update to false and then trigger changing to true.
          wrapper.vm.$nextTick(() => {
            typeTaskCheckbox.setChecked(true)
            wrapper.vm.$nextTick(() => {
              expect(filter.actions.setEnabledTaskTypes).toHaveBeenCalledWith(expect.anything(), { enabledTaskTypes: ['task', 'lane'] })
            })
          })
        })
      })
    })
    describe('selecting completedStatus', () => {
      let options
      beforeEach(() => {
        options = wrapper.find('select#completedStatusSelect').findAll('option')
      })
      describe('on select `all`', () => {
        it('calls setIsCompleted', () => {
          options.at(1).setSelected()
          wrapper.vm.$nextTick(() => {
            options.at(0).setSelected()
            wrapper.vm.$nextTick(() => {
              expect(filter.actions.setIsCompleted).toHaveBeenCalledWith(expect.anything(), { isCompleted: null })
            })
          })
        })
      })
      describe('on select `uncompleted`', () => {
        it('calls setIsCompleted', () => {
          options.at(1).setSelected()
          wrapper.vm.$nextTick(() => {
            expect(filter.actions.setIsCompleted).toHaveBeenCalledWith(expect.anything(), { isCompleted: false })
          })
        })
      })
      describe('on select `completed`', () => {
        it('calls setIsCompleted', () => {
          options.at(2).setSelected()
          wrapper.vm.$nextTick(() => {
            expect(filter.actions.setIsCompleted).toHaveBeenCalledWith(expect.anything(), { isCompleted: true })
          })
        })
      })
    })
    describe('selecting completedTerm', () => {
      let options
      beforeEach(() => {
        options = wrapper.find('select#completedTermSelect').findAll('option')
      })
      describe('on select `none`', () => {
        it('calls setCompletedAtWithin', () => {
          options.at(1).setSelected()
          wrapper.vm.$nextTick(() => {
            options.at(0).setSelected()
            wrapper.vm.$nextTick(() => {
              expect(filter.actions.setCompletedAtWithin).toHaveBeenCalledWith(
                expect.anything(),
                {
                  completedAtWithin: {
                    min: null,
                    max: null
                  }
                }
              )
            })
          })
        })
      })
      describe('on select `today`', () => {
        it('calls setCompletedAtWithin', () => {
          options.at(1).setSelected()
          wrapper.vm.$nextTick(() => {
            expect(filter.actions.setCompletedAtWithin).toHaveBeenCalledWith(
              expect.anything(),
              {
                completedAtWithin: {
                  min: moment().startOf('day'),
                  max: moment().endOf('day')
                }
              }
            )
          })
        })
      })
      describe('on select `yesterday`', () => {
        it('calls setCompletedAtWithin', () => {
          options.at(2).setSelected()
          wrapper.vm.$nextTick(() => {
            expect(filter.actions.setCompletedAtWithin).toHaveBeenCalledWith(
              expect.anything(),
              {
                completedAtWithin: {
                  min: moment().subtract(1, 'days').startOf('day'),
                  max: moment().subtract(1, 'days').endOf('day')
                }
              }
            )
          })
        })
      })
      describe('on select `thisWeek`', () => {
        it('calls setCompletedAtWithin', () => {
          options.at(3).setSelected()
          wrapper.vm.$nextTick(() => {
            expect(filter.actions.setCompletedAtWithin).toHaveBeenCalledWith(
              expect.anything(),
              {
                completedAtWithin: {
                  min: moment().startOf('week'),
                  max: moment().endOf('week')
                }
              }
            )
          })
        })
      })
      describe('on select `thisMonth`', () => {
        it('calls setCompletedAtWithin', () => {
          options.at(4).setSelected()
          wrapper.vm.$nextTick(() => {
            expect(filter.actions.setCompletedAtWithin).toHaveBeenCalledWith(
              expect.anything(),
              {
                completedAtWithin: {
                  min: moment().startOf('month'),
                  max: moment().endOf('month')
                }
              }
            )
          })
        })
      })
      describe('on select `last7Days`', () => {
        it('calls setCompletedAtWithin', () => {
          options.at(5).setSelected()
          wrapper.vm.$nextTick(() => {
            expect(filter.actions.setCompletedAtWithin).toHaveBeenCalledWith(
              expect.anything(),
              {
                completedAtWithin: {
                  min: moment().subtract(7, 'days').startOf('day'),
                  max: moment().subtract(1, 'days').endOf('day')
                }
              }
            )
          })
        })
      })
      describe('on select `last30Days`', () => {
        it('calls setCompletedAtWithin', () => {
          options.at(6).setSelected()
          wrapper.vm.$nextTick(() => {
            expect(filter.actions.setCompletedAtWithin).toHaveBeenCalledWith(
              expect.anything(),
              {
                completedAtWithin: {
                  min: moment().subtract(30, 'days').startOf('day'),
                  max: moment().subtract(1, 'days').endOf('day')
                }
              }
            )
          })
        })
      })
    })
  })
})
