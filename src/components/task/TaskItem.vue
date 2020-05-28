<template>
  <div>
    <div
      class="task-item"
      :class="{
        'task-item-lane': type === 'lane',
        'selected': isSelected
      }"
      @click="select({ id })"
    >
      <task-item-dates
        v-if="shouldShowDates"
        :expires-at="expiresAt"
        :completed-at="completedAt"
      />
      <!--
        ID Section
      -->
      <!-- `...` shows that now sending, will be replaced with loading animation. -->
      <span
        v-if="isPending"
        class="task-item-id"
      >...</span>
      <span
        v-else-if="!hasId"
        class="task-item-id task-item-id-error"
      >error</span>
      <span
        v-else
        class="task-item-id"
        :class="{ 'task-item-lane-id': isLane }"
      >#{{ id }}</span>
      <!--
        Content Section
      -->
      <p
        v-if="!isEditing"
        class="task-item-title"
        :class="{ 'task-item-lane-title': isLane }"
      >
        {{ title }}
      </p>
      <!-- See TheInput.vue input comment. -->
      <input
        v-if="isEditing"
        ref="titleInput"
        v-model="newTitle"
        class="task-item-title-input"
        @keydown="disableSubmitEdit"
        @keypress="enableSubmitEdit"
        @keyup.esc="handleLeaveEditing"
        @keyup.enter="handleSubmitEdit"
      >
      <!--
        Action & Status Section
      -->
      <button
        v-if="canCompleteTask"
        class="task-item-complete-button"
        @click.stop="handleCompleteTask"
      >
        Complete task
      </button>
      <div
        v-else-if="hasCompletedAt"
        class="task-item-completed"
      >
        ✔
      </div>
      <!-- TODO: Adjust design to enable this having multiple errors. (This may collapse) -->
      <ul
        v-if="hasErrors"
        class="task-item-errors"
      >
        <li
          v-for="(error, index) in errors"
          :key="index"
          class="task-item-error"
        >
          {{ error.message }}
        </li>
      </ul>
    </div>
    <ul
      v-if="hasChildren"
      class="task-children"
    >
      <li
        v-for="child in children"
        :key="child.id"
      >
        <task-item v-bind="child" />
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import keyCode from '@/config/keyCode.js'
import TaskItemDates from '@/components/task/TaskItemDates'

export default {
  // Name property is required to render recursive component.
  // System Message: `For recursive components, make sure to provide the "name" option.`
  name: 'TaskItem',
  components: { TaskItemDates },
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
    completedAt: {
      type: String,
      required: true
    },
    startsAt: {
      type: String,
      default: () => ''
    },
    expiresAt: {
      type: String,
      default: () => ''
    },
    depth: {
      type: Number,
      required: true
    },
    children: {
      type: Array,
      required: false,
      default: () => []
    },
    errors: {
      type: Array,
      required: false,
      default: () => []
    },
    isPending: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      newTitle: '',
      canSubmit: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['selectedTaskId', 'editingTaskId']),
    canCompleteTask () {
      return this.type === 'task' && !this.hasCompletedAt && !this.hasErrors
    },
    hasChildren () {
      return (this.children instanceof Array) && this.children.length !== 0
    },
    hasCompletedAt () {
      return this.completedAt !== ''
    },
    hasExpiresAt () {
      return this.expiresAt !== ''
    },
    hasErrors () {
      return this.errors.length !== 0
    },
    // hasId returns whether the task id is issued by API server or not.
    hasId () {
      return this.id !== 0
    },
    isSelected () {
      return this.id === this.selectedTaskId
    },
    isEditing () {
      return this.id === this.editingTaskId
    },
    isLane () {
      return this.type === 'lane'
    },
    shouldShowDates () {
      return [this.hasExpiresAt, this.hasCompletedAt].some(flag => flag)
    }
  },
  mounted () {
    // Init input value.
    this.newTitle = this.title
    // To catch enter all around Root.vue,
    // setting native event listener.
    document.addEventListener('keyup', (e) => {
      // esc
      if (e.keyCode === keyCode.ESC) {
        if (this.selectedTaskId === this.id) {
          this.deselect()
        }
      }
      // enter
      if (e.keyCode === keyCode.ENTER) {
        if (this.selectedTaskId === this.id) {
          this.enableEdit({ id: this.id })
          this.$nextTick(() => {
            this.$refs.titleInput.focus()
          })
        }
      }
    })
  },
  methods: {
    ...mapActions('tasks', ['complete', 'select', 'deselect', 'enableEdit', 'submitEdit', 'leaveEdit']),
    async handleCompleteTask () {
      this.complete({ id: this.id })
    },
    handleLeaveEditing () {
      this.leaveEdit()
      this.newTitle = this.title
    },
    enableSubmitEdit () {
      this.canSubmit = true
    },
    disableSubmitEdit () {
      this.canSubmit = false
    },
    async handleSubmitEdit () {
      // If enter from IME conversion, skip handling enter.
      if (!this.canSubmit) {
        return null
      }
      this.canSubmit = false
      this.submitEdit({ title: this.newTitle })
    }
  }
}
</script>
<style>
  .task-item {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 4px 6px;
    border-radius: 4px;
    transition: all ease .1s;
    cursor: pointer;
  }
  .task-item:hover {
    background-color: #f6f6f6;
  }
  .task-item.selected {
    background-color: #eaeaea;
  }

  .task-item-id {
    position: relative;
    /* Currently, only 4 digits can be shown. */
    flex-shrink: 0;
    width: 44px;
    padding: 0 8px;
    border: 1px solid #558783;
    border-radius: 4px;
    background-color: #fff;
    color: #558783;
    font-size: 10px;
    font-weight: bold;
    line-height: 20px;
  }

  .task-item-title {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    padding-left: 8px;
    line-height: 22px;
    font-size: 11px;
    font-weight: bold;
    color: #777;
  }

  /* Show when it's editing. */
  .task-item-title-input {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    padding: 0 4px;
    margin: 0 4px;
    line-height: 22px;
    font-size: 11px;
    font-weight: bold;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
  }

  /* Show if not completed. */
  .task-item-complete-button {
    flex-shrink: 0;
    width: 96px;
    padding: 0 5px;
    line-height: 20px;
    border: 1px solid #558783;
    border-radius: 4px;
    border-radius: 4px;
    background-color: #fff;
    transition: all .3s;

    color: #6ba893;
    font-weight: bold;

    font-size: 10px;
  }
  .task-item-complete-button:hover {
    background-color: #558783;
    color: #f1f1f1;
  }

  /* Show if completed. */
  .task-item-completed {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    border-radius: 4px;
    line-height: 22px;
    background-color: #558783;
    color: #fff;
    font-size: 10px;
  }
  .task-children {
    padding-left: 20px;
  }

  /* Show if has errors */
  /* This class should be used with .task-item-id */
  .task-item-id-error {
    padding: 0 7px;
    background-color: red;
    border-color: red;
    color: #fff;
  }
  .task-item-errors {
    flex-shrink: 0;
    padding: 0 6px;
    border: 1px solid red;
    border-radius: 4px;
    background-color: #fff;
  }
  .task-item-error {
    line-height: 20px;
    font-size: 10px;
    color: red;
  }

  /* css only for type lane (overwrite `.task-item`, not re-write) */
  .task-item-lane {
    margin: 2px 0;
    padding: 5px 6px;
    border-radius: 4px;
    background-color: #f1f1f1;
  }
  .task-item-lane:hover {
    background-color: #eaeaea;
  }
  .task-item-lane-id {
    background-color: #558783;
    color: #f1f1f1;
  }
  .task-item-lane-title {
    color: #5d5d5d;
  }

</style>
