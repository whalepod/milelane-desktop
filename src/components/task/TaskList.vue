<template>
  <section>
    <p
      v-if="!hasTasks"
      class="task-list-empty-message"
    >
      まだタスクはありません。やることを入力欄に入れてタスクを追加してみましょう :)<br>
      使い方がわからないときは、<code>/help</code>と下の入力欄に入れてみましょう。
    </p>
    <ul
      id="task-list"
      class="task-list"
    >
      <li
        v-for="task in tasks"
        :key="task.id"
      >
        <task-item v-bind="task" />
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import TaskItem from '@/components/task/TaskItem'

export default {
  components: { TaskItem },
  computed: {
    ...mapGetters('tasks', ['filteredTasks']),
    tasks () {
      return this.filteredTasks
    },
    hasTasks () {
      return (this.tasks instanceof Array) && this.tasks.length !== 0
    }
  }
}
</script>
<style>
  .task-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 12px 12px 49px; /* TheInputオブジェクトの height 48px + border 1px */
  }
  .task-list-empty-message {
    max-width: 800px;
    margin: 0 auto;
    padding: 12px;
    font-size: 13px;
  }
  /*
    .task-list-empty-message > code
    inherits from base.css `code` styling.
  */
</style>
