<template>
  <div>
    <div class="task-item" :class="{ 'task-item-lane': type === 'lane' }">
      <span class="task-item-id" :class="{ 'task-item-lane-id': type === 'lane' }">#{{id}}</span>
      <p class="task-item-title" :class="{ 'task-item-lane-title': type === 'lane' }">{{title}}</p>
      <button v-if="canCompleteTask" class="task-item-complete-button" @click="handleCompleteTask">Done</button>
      <div class="task-item-completed" v-else-if="completed_at">✔</div>
    </div>
    <ul v-if="hasChildren" class="task-children">
      <li v-for="child in freshChildren" :key="child.id">
        <!--
          Rolling `emit-fetch-tasks` event up,
          until taskAPI.fetchTasks() called.
        -->
        <task-item
          v-bind="child"
          @emit-fetch-tasks="$emit('emit-fetch-tasks')"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment'
import taskAPI from '@/modules/api/task.js'

export default {
  // Name property is required to render recursive component.
  // System Message: `For recursive components, make sure to provide the "name" option.`
  name: 'task-item',
  computed: {
    canCompleteTask () {
      return this.type === 'task' && this.completed_at === ''
    },
    hasChildren () {
      return this.freshChildren.length !== 0
    },
    freshChildren () {
      if (!(this.children instanceof Array) || this.children.length === 0) { return [] }
      return this.children.filter(child =>
        child.completed_at === '' || moment(child.completed_at).add(1, 'day').isAfter(moment())
      )
    }
  },
  methods: {
    async handleCompleteTask () {
      await taskAPI.complete(this.id)
      this.$emit('emit-fetch-tasks')
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    completed_at: {
      type: String,
      required: true
    },
    depth: {
      type: Number,
      required: true
    },
    children: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  }
}
</script>
<style>
  .task-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    padding: 2px 6px;
    border-radius: 4px;
    transition: all ease .2s;
  }
  .task-item:hover {
    background-color: #f6f6f6;
  }
  .task-item-id {
    /* Currently, only 4 digits can be shown. */
    width: 44px;
    padding: 0 5px;
    background-color: #6ba893;
    border-radius: 4px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
  }

  .task-item-title {
    padding-left: 6px;
    line-height: 20px;
    font-size: 11px;
    font-weight: bold;
    color: #777;
  }
  /* Show if not completed. */
  .task-item-complete-button {
    position: absolute;
    top: 3px;
    right: 0;
    bottom: 3px;
    width: 56px;
    border-radius: 4px;
    background-color: #558783;
    transition: all .3s;

    color: #f1f1f1;

    font-size: 10px;
    font-weight: bold;
  }
  .task-item-complete-button:hover {
    opacity: .7;
  }
  /* Show if completed. */
  .task-item-completed {
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 56px;

    background-color: #6ba893;

    color: #fff;

    font-size: 10px;
  }
  .task-children {
    padding-left: 20px;
  }

  /* css only for type lane (overwrite `.task-item`, not re-write) */
  .task-item-lane {
    padding: 5px 6px;
    border-radius: 4px;
    background-color: #f1f1f1;
  }
  .task-item-lane:hover {
    background-color: #e7e7e7;
  }
  .task-item-lane-id {
    background-color: #558783;
  }
  .task-item-lane-title {
    color: #666;
  }

</style>
