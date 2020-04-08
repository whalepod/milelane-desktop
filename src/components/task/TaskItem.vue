<template>
  <div>
    <div
      @click="select({ id })"
      class="task-item"
      :class="{
        'task-item-lane': type === 'lane',
        'selected': isSelected
      }"
    >
      <!--
        ID Section
      -->
      <!-- `...` shows that now sending, will be replaced with loading animation. -->
      <span v-if="isPending" class="task-item-id">...</span>
      <span v-else-if="id === 0" class="task-item-id task-item-id-error">error</span>
      <span v-else class="task-item-id" :class="{ 'task-item-lane-id': type === 'lane' }">#{{id}}</span>
      <!--
        Content Section
      -->
      <p
        v-if="!isEditing"
        class="task-item-title"
        :class="{ 'task-item-lane-title': type === 'lane' }">
        {{title}}
      </p>
      <!-- See TaskInput.vue input comment. -->
      <input
        v-if="isEditing"
        v-model="newTitle"
        @keydown="disableSubmitEdit"
        @keypress="enableSubmitEdit"
        @keyup.esc="handleFinishEditing"
        @keyup.enter="handleSubmitEdit"
        ref="titleInput"
        class="task-item-title-input"
      >
      <!--
        Action & Status Section
      -->
      <button v-if="canCompleteTask" class="task-item-complete-button" @click="handleCompleteTask">Complete task</button>
      <div v-else-if="completed_at" class="task-item-completed">✔</div>
      <!-- TODO: Adjust design to enable this having multiple errors. (This may collapse) -->
      <ul v-if="hasErrors" class="task-item-errors">
        <li v-for="(error, index) in errors" :key="index"  class="task-item-error">
          {{ error.message }}
        </li>
      </ul>
    </div>
    <ul v-if="hasChildren" class="task-children">
      <li v-for="child in freshChildren" :key="child.id">
        <!--
          WANTFIX:
          For now, Rolling `emit-fetch-tasks` event up,
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
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import taskAPI from '@/modules/api/task.js'

export default {
  // Name property is required to render recursive component.
  // System Message: `For recursive components, make sure to provide the "name" option.`
  name: 'task-item',
  data () {
    return {
      newTitle: '',
      canSubmit: false
    }
  },
  mounted () {
    // Init input value.
    this.newTitle = this.title
    // To catch enter all around Root.vue,
    // setting native event listener.
    document.addEventListener('keyup', (e) => {
      // esc
      if (e.keyCode === 27) {
        if (this.selectedTaskId === this.id) {
          this.deselect()
        }
      }
      // enter
      if (e.keyCode === 13) {
        if (this.selectedTaskId === this.id) {
          this.enableEdit({ id: this.id })
          this.$nextTick(() => {
            this.$refs.titleInput.focus()
          })
        }
      }
    })
  },
  computed: {
    ...mapGetters('tasks', ['selectedTaskId', 'editingTaskId']),
    canCompleteTask () {
      return this.type === 'task' && this.completed_at === '' && !this.hasErrors
    },
    hasChildren () {
      return this.freshChildren.length !== 0
    },
    freshChildren () {
      if (!(this.children instanceof Array) || this.children.length === 0) { return [] }
      return this.children.filter(child =>
        child.completed_at === '' || moment(child.completed_at).add(1, 'day').isAfter(moment())
      )
    },
    hasErrors () {
      return this.errors.length !== 0
    },
    isSelected () {
      return this.id === this.selectedTaskId
    },
    isEditing () {
      return this.id === this.editingTaskId
    }
  },
  methods: {
    ...mapActions('tasks', ['select', 'deselect', 'enableEdit', 'submitEdit', 'finishEdit']),
    async handleCompleteTask () {
      await taskAPI.complete(this.id)
      this.$emit('emit-fetch-tasks')
    },
    handleFinishEditing () {
      this.finishEdit()
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
    },
    errors: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    isPending: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      }
    }
  }
}
</script>
<style>
  .task-item {
    position: relative;
    display: flex;
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
    background-color: #e7e7e7;
  }
  .task-item-id {
    /* Currently, only 4 digits can be shown. */
    flex-shrink: 0;
    width: 44px;
    padding: 0 5px;
    background-color: #6ba893;
    border-radius: 4px;
    color: #fff;
    font-size: 10px;
    line-height: 20px;
  }

  .task-item-title {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    padding-left: 8px;
    line-height: 20px;
    font-size: 11px;
    font-weight: bold;
    color: #777;
  }

  /* Show when it's editing. */
  .task-item-title-input {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    padding-left: 4px;
    margin-left: 4px;
    line-height: 20px;
    font-size: 11px;
    font-weight: bold;
    color: #777;
    background-color: #fff;
  }

  /* Show if not completed. */
  .task-item-complete-button {
    flex-shrink: 0;
    width: 88px;
    padding: 0 5px;
    line-height: 20px;
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
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    border-radius: 4px;
    line-height: 20px;
    background-color: #6ba893;
    color: #fff;
    font-size: 10px;
  }
  .task-children {
    padding-left: 20px;
  }

  /* Show if has errors */
  /* This class should be used with .task-item-id */
  .task-item-id-error {
    background-color: red;
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
    background-color: #e7e7e7;
  }
  .task-item-lane-id {
    background-color: #558783;
  }
  .task-item-lane-title {
    color: #666;
  }

</style>
