<template>
  <section class="root">
    <the-header />
    <task-list
      :tasks="tasks"
      @emit-fetch-tasks="handleLoadTasks"
    />
    <task-input @emit-fetch-tasks="handleLoadTasks" />
  </section>
</template>

<script>
import taskAPI from '@/modules/api/task.js'
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
    this.handleLoadTasks()
  },
  data () {
    return {
      tasks: []
    }
  },
  methods: {
    handleLoadTasks () {
      this.fetchTasks()
        .catch(e => console.log(e.message))
    },
    async fetchTasks () {
      if (this.$store.state.task.focusTargetId !== null) {
        const result = await taskAPI.get(this.$store.state.task.focusTargetId)
        // 一つだけのデータが返ってくるので、TaskListのフォーマットに揃えて配列化する
        this.tasks = [result.data]
      } else {
        const result = await taskAPI.fetch()
        this.tasks = result.data
      }
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
