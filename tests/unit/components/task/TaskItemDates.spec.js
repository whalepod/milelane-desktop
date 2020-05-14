import { shallowMount } from '@vue/test-utils'
import TaskItemDates from '@/components/task/TaskItemDates.vue'

describe('components/task/TaskItemDates.vue', () => {
  let wrapper

  it('init', () => {
    wrapper = shallowMount(TaskItemDates)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('does not show due date without expiresAt', () => {
    wrapper = shallowMount(TaskItemDates, {
      propsData: {
        expiresAt: ''
      }
    })
    expect(wrapper.find('.task-item-dates-expires-at').exists()).toBe(false)
  })

  it('shows only date for due date.', () => {
    wrapper = shallowMount(TaskItemDates, {
      propsData: {
        expiresAt: '2020-05-31 00:00:00'
      }
    })
    expect(wrapper.find('.task-item-dates-expires-at > span').text()).toBe('2020-05-31')
  })
})
