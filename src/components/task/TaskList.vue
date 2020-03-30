<template>
  <section>
    <p v-if="!hasTasks" class="task-list-empty-message">
      まだトドはいません。やることを追加してトドを増やしましょう :)
    </p>
    <ul id="task-list" class="task-list">
      <li v-for="task in freshTasks" :key="task.id">
        <task-item
          v-bind="task"
          @emit-fetch-tasks="fetchTasks"
        />
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import TaskItem from '@/components/task/TaskItem'

export default {
  components: { TaskItem },
  computed: {
    ...mapGetters('tasks', ['tasks']),
    hasTasks () {
      return this.freshTasks.length !== 0
    },
    freshTasks () {
      if (!(this.tasks instanceof Array) || this.tasks.length === 0) { return [] }
      return this.tasks.filter(task =>
        task.completed_at === '' || moment(task.completed_at).add(1, 'day').isAfter(moment())
      )
    }
  },
  methods: {
    fetchTasks () {
      this.$emit('emit-fetch-tasks')
    }
  }
}
</script>
<style>
  .task-list {
    padding: 12px 12px 49px; /* TaskInputオブジェクトの height 48px + border 1px */
  }
  .task-list-empty-message {
    padding: 12px;
    font-size: 13px;
  }
</style>
