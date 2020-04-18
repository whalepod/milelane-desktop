<template>
  <section class="root">
    <the-header />
    <task-list
      @emit-fetch-tasks="handleLoadTasks"
    />
    <task-input @emit-fetch-tasks="handleLoadTasks" />
    <the-modal />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import TheHeader from '@/components/TheHeader'
import TheModal from '@/components/TheModal'
import TaskList from '@/components/task/TaskList'
import TaskInput from '@/components/task/TaskInput'

export default {
  components: {
    TheHeader,
    TheModal,
    TaskList,
    TaskInput
  },
  created () {
    // initialize modal.
    this.close()
    this.initTasks()
  },
  methods: {
    ...mapActions('tasks', ['initTasks']),
    ...mapActions('modal', ['close']),
    handleLoadTasks () {
      this.initTasks()
    }
  }
}
</script>

<style>
  .root {
    height: 100vh;
    margin: 0;
    position: relative;
  }
</style>
