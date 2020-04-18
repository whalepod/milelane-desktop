import { shallowMount } from '@vue/test-utils'
import HelpAboutMilelane from '@/components/help/HelpAboutMilelane.vue'

describe('components/help/HelpAboutMilelane.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(HelpAboutMilelane)
  })

  it('init', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
