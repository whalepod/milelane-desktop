<template>
  <section
    v-shortkey="['meta', 'i']"
    class="root"
    @shortkey="focusInputField"
    @click="leaveEdit"
  >
    <the-header />
    <task-list />
    <the-filter />
    <the-input />
    <the-schedule />
    <the-modal />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import TheHeader from '@/components/TheHeader'
import TheFilter from '@/components/TheFilter'
import TheModal from '@/components/TheModal'
import TheInput from '@/components/TheInput'
import TheSchedule from '@/components/TheSchedule'
import TaskList from '@/components/task/TaskList'

export default {
  components: {
    TheHeader,
    TheFilter,
    TheModal,
    TheInput,
    TheSchedule,
    TaskList
  },
  created () {
    // initialize modal.
    this.close()
    this.initTasks()
  },
  methods: {
    ...mapActions('tasks', ['initTasks', 'leaveEdit']),
    ...mapActions('modal', ['close']),
    handleLoadTasks () {
      this.initTasks()
    },
    focusInputField () {
      document.querySelector('input').focus()
    }
  }
}
</script>

<style>
  .root {
    height: 100vh;
    margin: 0;
    padding-top: 56px;
    position: relative;
  }
</style>
