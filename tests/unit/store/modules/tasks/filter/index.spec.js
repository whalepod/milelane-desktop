import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import filter from '@/store/modules/tasks/filter'

describe('store/modules/tasks/filter/index.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        tasks: {
          namespaced: true,
          modules: {
            filter
          }
        }
      }
    })
  })
  it('init', async () => {
    expect(store.state.tasks.filter.isCompleted).toBe(null)
    await store.dispatch('tasks/filter/setIsCompleted', { isCompleted: true })
    expect(store.state.tasks.filter.isCompleted).toBe(true)
  })
})
