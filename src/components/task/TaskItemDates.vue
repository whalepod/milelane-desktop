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
  </div>
</template>
<script>
import timeHandler from '@/modules/timeHandler.js'

export default {
  props: {
    expiresAt: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    hasExpiresAt () {
      return this.expiresAt !== ''
    },
    expiresAtForDisplay () {
      return timeHandler.displayTime(this.expiresAt)
    }
  }
}
</script>
<style>
  .task-item-dates {
    display: block;
    flex-shrink: 0;
    width: 100%;
    height: 15px;
    line-height: 1;
  }
  .task-item-dates-expires-at {
    font-size: 11px;
    line-height: 1;
    vertical-align: super;
    color: #999;
  }
</style>
