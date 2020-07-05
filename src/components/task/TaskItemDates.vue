<template>
  <div class="task-item-dates">
    <p
      v-if="hasExpiresAt"
      class="task-item-dates-expires-at"
    >
      Due date:&nbsp;
      <span>
        {{ expiresAtForDisplay }}
      </span>
    </p>
    <p
      v-if="hasCompletedAt"
      class="task-item-dates-completed-at"
    >
      Completed at:&nbsp;
      <span>
        {{ completedAtForDisplay }}
      </span>
    </p>
  </div>
</template>
<script>
import timeHandler from '@/modules/timeHandler.js'

export default {
  props: {
    expiresAt: {
      type: String,
      default: () => ''
    },
    completedAt: {
      type: String,
      required: true
    }
  },
  computed: {
    hasExpiresAt () {
      return this.expiresAt !== ''
    },
    hasCompletedAt () {
      return this.completedAt !== ''
    },
    expiresAtForDisplay () {
      return timeHandler.displayTime(this.expiresAt)
    },
    completedAtForDisplay () {
      return timeHandler.displayTime(this.completedAt)
    }
  }
}
</script>
<style>
  .task-item-dates {
    display: flex;
    flex-shrink: 0;
    width: 100%;
    height: 15px;
    line-height: 1;
  }
  .task-item-dates-expires-at {
    margin-right: 10px;
    font-size: 11px;
    line-height: 1;
    vertical-align: super;
    color: #999;
  }
  .task-item-dates-completed-at {
    margin-right: 10px;
    font-size: 11px;
    line-height: 1;
    vertical-align: super;
    color: #999;
  }
</style>
