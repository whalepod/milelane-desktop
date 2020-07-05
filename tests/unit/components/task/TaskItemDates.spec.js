import { shallowMount } from '@vue/test-utils'
import TaskItemDates from '@/components/task/TaskItemDates.vue'

describe('components/task/TaskItemDates.vue', () => {
  let wrapper

  it('init', () => {
    wrapper = shallowMount(TaskItemDates, {
      propsData: {
        completedAt: ''
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  describe('without dates', () => {
    it('does not show date objects', () => {
      wrapper = shallowMount(TaskItemDates, {
        propsData: {
          expiresAt: '',
          completedAt: ''
        }
      })
      expect(wrapper.find('.task-item-dates-expires-at').exists()).toBe(false)
      expect(wrapper.find('.task-item-dates-completed-at').exists()).toBe(false)
    })
  })

  describe('with expiresAt and CompletedAt', () => {
    it('shows only date for due date.', () => {
      wrapper = shallowMount(TaskItemDates, {
        propsData: {
          expiresAt: '2020-05-31 00:00:00',
          completedAt: '2020-06-01 00:00:00'
        }
      })
      expect(wrapper.find('.task-item-dates-expires-at > span').text()).toBe('2020-05-31')
      expect(wrapper.find('.task-item-dates-completed-at > span').text()).toBe('2020-06-01')
    })
  })
})
