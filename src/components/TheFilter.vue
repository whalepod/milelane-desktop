<template>
  <aside class="the-filter">
    <button
      id="showFilterButton"
      v-if="!shouldShowFilter"
      @click="showFilter"
    >
      <img src="@/assets/icons/icon-filter.svg">
    </button>
    <section v-if="shouldShowFilter">
      <button
        id="hideFilterButton"
        @click="hideFilter"
      ></button>
      <section>
        <h3>タスク種別</h3>
        <ul>
          <li>
            <label>
              <input
                id="typeTaskCheckbox"
                v-model="taskTypes"
                type="checkbox"
                value="task"
              >
              <span>Task</span>
            </label>
          </li>
          <li>
            <label>
              <input
                id="typeLaneCheckbox"
                v-model="taskTypes"
                type="checkbox"
                value="lane"
              >
              <span>Lane</span>
            </label>
          </li>
        </ul>
      </section>
      <section>
        <h3>完了状態</h3>
        <select
          id="completedStatusSelect"
          v-model="completedStatus"
        >
          <option value="all">
            すべて
          </option>
          <option value="uncompleted">
            未完了のみ
          </option>
          <option value="completed">
            完了のみ
          </option>
        </select>
      </section>
      <section>
        <h3>完了時期</h3>
        <select
          id="completedTermSelect"
          v-model="completedTerm"
        >
          <option value="none">
            指定なし
          </option>
          <option value="today">
            今日
          </option>
          <option value="yesterday">
            昨日
          </option>
          <option value="thisWeek">
            今週
          </option>
          <option value="thisMonth">
            今月
          </option>
          <option value="last7Days">
            直近7日間
          </option>
          <option value="last30Days">
            直近30日間
          </option>
        </select>
      </section>
    </section>
  </aside>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data: function () {
    return {
      shouldShowFilter: false,
      taskTypes: [],
      completedStatus: 'all',
      completedTerm: 'none'
    }
  },
  created () {
    this.taskTypes = this.enabledTaskTypes
  },
  computed: {
    // TODO: this.completedAtWithin を completedTerm に反映する
    // TODO: this.isCompleted を completedStatus に反映する
    ...mapGetters('tasks/filter', ['enabledTaskTypes', 'isCompleted', 'completedAtWithin'])
  },
  methods: {
    ...mapActions('tasks/filter', ['setEnabledTaskTypes', 'setIsCompleted', 'setCompletedAtWithin']),
    showFilter () {
      this.shouldShowFilter = true
    },
    hideFilter () {
      this.shouldShowFilter = false
    },
    getTimeRange (rangeName) {
      let min, max
      switch (rangeName) {
        case 'none':
          min = null
          max = null
          break
        case 'today':
          min = moment().startOf('day')
          max = moment().endOf('day')
          break
        case 'yesterday':
          min = moment().subtract(1, 'days').startOf('day')
          max = moment().subtract(1, 'days').endOf('day')
          break
        case 'thisWeek':
          min = moment().startOf('week')
          max = moment().endOf('week')
          break
        case 'thisMonth':
          min = moment().startOf('month')
          max = moment().endOf('month')
          break
        case 'last7Days':
          min = moment().subtract(7, 'days').startOf('day')
          max = moment().subtract(1, 'days').endOf('day')
          break
        case 'last30Days':
          min = moment().subtract(30, 'days').startOf('day')
          max = moment().subtract(1, 'days').endOf('day')
          break
      }
      return { min, max }
    }
  },
  watch: {
    taskTypes: {
      // in watcher, newValue always changes from oldValue. No need to compare.
      handler (newValue, _) {
        this.setEnabledTaskTypes({ enabledTaskTypes: this.taskTypes })
      },
      deep: true
    },
    completedStatus (newValue, _) {
      let isCompleted
      switch (newValue) {
        case 'all':
          isCompleted = null
          break
        case 'uncompleted':
          isCompleted = false
          break
        case 'completed':
          isCompleted = true
          break
      }
      this.setIsCompleted({ isCompleted })
    },
    completedTerm (newValue, _) {
      const { min, max } = this.getTimeRange(newValue)
      this.setCompletedAtWithin({
        completedAtWithin: {
          min: min,
          max: max
        }
      })
    }
  }
}
</script>
<style>
  .the-filter {
    position: absolute;
    top: 72px; /* the-header 56 + 16 px */
    right: 24px;
    max-width: 200px;
    margin-bottom: 65px;  /* the-input 49 + 16 px */
    border-radius: 4px;
    background-color: #fff;
    filter: drop-shadow(1px 1px 4px #b7b7b7);
  }
  .the-filter > button {
    display: block;
    padding: 4px;
  }
  .the-filter > button > img {
    width: 24px;
    height: 24px;
  }
  .the-filter > section {
    padding: 20px 20px 0;
  }
  .the-filter > section > button {
    position: absolute;
    top: 10px;
    right: 8px;
    height: 24px;
    width: 16px;
    padding: 0 4px;
    border-top: 3px solid #6ba893;
  }
  .the-filter > section > section {
    margin-bottom: 22px;
  }
  .the-filter h3 {
    font-size: 13px;
    color: #777;
    font-weight: bold;
  }
  .the-filter ul li {
    margin: 12px 0;
  }
  /* form designs */
  .the-filter label {
    display: flex;
    align-items: center;
  }
  .the-filter label > span {
    display: block;
    line-height: 17px;
    font-size: 13px;
  }
  .the-filter input[type="checkbox"] {
    position: relative;
    display: block;
    width: 17px;
    height: 17px;
    margin-right: 5px;
    border: 1px solid #6ba893;
    border-radius: 3px;
  }
  .the-filter input[type="checkbox"]:checked {
    background-color: #6ba893;
  }
  .the-filter input[type="checkbox"]:checked::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '✔︎';
    width: 100%;
    height: 100%;
    line-height: 14px;
    text-align: center;
    font-size: 11px;
    color: #fff;
  }
  .the-filter select {
    margin-top: 9px;
    padding: 4px 9px;
    font-size: 13px;
    background-color: #f1f1f1;
  }
</style>
