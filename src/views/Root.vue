<template>
  <section class="root">
    <the-header />
    <task-list
      @emit-fetch-tasks="handleLoadTasks"
    />
    <task-input @emit-fetch-tasks="handleLoadTasks" />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import TheHeader from '@/components/TheHeader'
import TaskList from '@/components/task/TaskList'
import TaskInput from '@/components/task/TaskInput'

export default {
  components: {
    TheHeader,
    TaskList,
    TaskInput
  },
  created () {
    this.initTasks()
  },
  methods: {
    ...mapActions('task', ['initTasks']),
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
