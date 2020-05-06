<template>
  <section
    v-if="isScheduling"
    class="the-schedule"
  >
    <section>
      <p><code>/schedule {{ task.id }}</code></p>
      <h3><span>{{ task.title }}</span> に期限を設定します</h3>
    </section>
    <input
      ref="theScheduleInput"
      type="text"
      placeholder="いつまで？"
      @keydown.esc="handleLeaveSchedule"
      @keydown="disableSubmitSchedule"
      @keypress="enableSubmitSchedule"
      @keyup.enter="handleSubmitSchedule"
    >
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import timeHandler from '@/modules/timeHandler.js'

export default {
  data () {
    return {
      canSubmit: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['isScheduling', 'schedulingTask']),
    task () {
      return this.schedulingTask
    }
  },
  watch: {
    isScheduling (newValue, oldValue) {
      if (!oldValue && newValue) {
        /**
         * Just after updating `isSchedule`, theScheduleInput is not rendered.
         * To wait rendering, use $nextTick.
         * https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue
         */
        this.$nextTick(() => {
          this.$refs.theScheduleInput.focus()
        })
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['leaveSchedule', 'commitSchedule']),
    enableSubmitSchedule () {
      this.canSubmit = true
    },
    disableSubmitSchedule () {
      this.canSubmit = false
    },
    async handleSubmitSchedule (event) {
      const inputText = event.target.value
      const expiresAt = timeHandler.parse(inputText)
      await this.commitSchedule({
        startsAt: null,
        expiresAt
      })
      this.leaveSchedule()
    },
    handleLeaveSchedule () {
      if (window.confirm('期限の設定を終了しますか？')) {
        this.leaveSchedule()
      }
    }
  }
}
</script>
<style>
.the-schedule {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
.the-schedule > section {
  position: relative;
  display: inline-block;
  margin: 18px;
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
  /**
   * Take care, filter property is not working on IE11 and early Android browsers.
   * See https://caniuse.com/#feat=css-filters
   */
  filter: drop-shadow(1px 1px 4px #b7b7b7);
}
.the-schedule > section::after {
  position: absolute;
  bottom: -7px;
  left: 18px;
  display: block;
  content: '';
  width: 14px;
  height: 14px;
  background-color: #fff;
  transform: rotate(45deg);
}
.the-schedule > section > p {
  margin-bottom: 12px;
  font-size: 13px;
}
.the-schedule > section > h3 {
  font-size: 13px;
}
.the-schedule > section > h3 > span {
  font-weight: bold;
}
.the-schedule > input[type="text"] {
  border-top: 1px solid #f1f1f1;
  display: block;
  width: 100%;
  padding: 12px;
}
</style>
