<template>
  <section class="the-schedule">
    <p>「{{ schedulingTask.title }}」に日付を設定する</p>
    <input
      type="text"
      placeholder="いつから？"
    >
    <input
      type="text"
      placeholder="いつまで？"
    >
    <button>
      Click or Enter to submit
    </button>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('tasks', ['schedulingTask'])
  }
}
</script>
<style>
.the-schedule {
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.the-schedule > p {
  margin: 20px;
}
.the-schedule > input[type="text"] {
  margin: 10px 0;
  padding: 0 20px;
  display: block;
  width: 100%;
}
.the-schedule > button {
  margin: 20px;
  color: #558783;
}
</style>
