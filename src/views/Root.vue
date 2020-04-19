<template>
  <section class="root">
    <the-header />
    <task-list />
    <the-input />
    <the-modal />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import TheHeader from '@/components/TheHeader'
import TheModal from '@/components/TheModal'
import TheInput from '@/components/TheInput'
import TaskList from '@/components/task/TaskList'

export default {
  components: {
    TheHeader,
    TheModal,
    TheInput,
    TaskList
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
