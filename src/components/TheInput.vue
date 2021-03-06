<template>
  <!-- To avoid selected task to be edit mode when submitting task. -->
  <div
    class="task-input"
    @keyup.enter.stop
  >
    <!--
      日本語入力の確定の enter ではトド追加を実行しないようにする。
      通常は keydown -> keypress -> keyup.enter の順でイベントが発火するが、
      変換の確定時には keydown -> keyup.enter の順でイベント発火するため、
      keypress の有無をもとに submit 可能かどうかを判定している。
      また、途中で英語入力があった場合に canSubmit が true になってしまうため、
      keydown のたびに canSubmit を false にする処理を噛ませている。
    -->
    <input
      ref="theInput"
      type="text"
      placeholder="なにする？"
      @keydown.esc="unfocusCursor"
      @keydown="disableSubmitTask"
      @keypress="enableSubmitTask"
      @keyup.enter="handleSubmitTask"
    >
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import commandHandler from '@/modules/command/commandHandler.js'

export default {
  data () {
    return {
      canSubmit: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks'])
  },
  methods: {
    ...mapActions('tasks', ['initTasks', 'create', 'complete', 'focus', 'unfocus']),
    async handleSubmitTask (event) {
      // If enter from IME conversion, skip handling enter.
      if (!this.canSubmit) {
        return null
      }
      this.canSubmit = false

      const inputText = event.target.value

      // Skip if no text available.
      if (inputText === '') {
        return null
      }

      if (this.isCommand(inputText)) {
        const commandName = commandHandler.getCommandName(inputText)
        switch (commandName) {
          case 'focus': {
            const targetId = await commandHandler.execute(inputText)
            await this.focus({ id: targetId })
            break
          }
          case 'unfocus':
            await this.unfocus()
            break
          default:
            await commandHandler.execute(inputText)
        }
      } else {
        await this.create({ title: inputText })
        const task = this.tasks[this.tasks.length - 1]
        if (inputText.match(/.*?した$/)) {
          await this.complete({ id: task.id })
        }
      }

      // 処理完了時にはテキストボックスを空欄にする。
      event.target.value = ''
    },
    enableSubmitTask () {
      this.canSubmit = true
    },
    disableSubmitTask () {
      this.canSubmit = false
    },
    unfocusCursor () {
      // Note that blur() does not bubble up event,
      // while focusout does.
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
      this.$refs.theInput.blur()
    },
    isCommand (text) {
      // `/` から始まる入力はコマンド扱いになる
      return text.match(/^\//)
    }
  }
}
</script>
<style>
  .task-input {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px;
    border-top: 1px solid #f1f1f1;
    background-color: #fff;
  }
  .task-input > input[type="text"] {
    display: block;
    width: 100%;
  }
</style>
