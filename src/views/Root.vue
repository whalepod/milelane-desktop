<template>
  <section class="root">
    <the-header />
    <task-list
      @emit-fetch-tasks="handleLoadTasks"
    />
    <the-input @emit-fetch-tasks="handleLoadTasks" />
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
    this.initTasks()
  },
  methods: {
    ...mapActions('tasks', ['initTasks']),
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
