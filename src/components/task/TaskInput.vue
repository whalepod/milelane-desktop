<template>
  <div class="task-input">
    <!--
      日本語入力の確定の enter ではトド追加を実行しないようにする。
      通常は keydown -> keypress -> keyup.enter の順でイベントが発火するが、
      変換の確定時には keydown -> keyup.enter の順でイベント発火するため、
      keypress の有無をもとに submit 可能かどうかを判定している。
      また、途中で英語入力があった場合に canSubmit が true になってしまうため、
      keydown のたびに canSubmit を false にする処理を噛ませている。
    -->
    <input
      type="text"
      placeholder="なにする？"
      @keydown="disableSubmitTask"
      @keypress="enableSubmitTask"
      @keyup.enter="handleSubmitTask"
    />
  </div>
</template>
<script>
import commandHandler from '@/modules/command/commandHandler.js'
import taskAPI from '@/modules/api/task.js'

export default {
  data () {
    return {
      canSubmit: false
    }
  },
  methods: {
    async handleSubmitTask (event) {
      // If enter from IME conversion, skip handling enter.
      if (!this.canSubmit) {
        return null
      }
      this.canSubmit = false

      const inputText = event.target.value

      if (this.isCommand(inputText)) {
        const commandName = commandHandler.getCommandName(inputText)
        switch (commandName) {
          case 'focus': {
            const targetId = await commandHandler.execute(inputText)
            await this.$store.dispatch('setFocusTarget', targetId)
            break
          }
          case 'unfocus':
            await this.$store.dispatch('unsetFocusTarget')
            break
          default:
            await commandHandler.execute(inputText)
        }
      } else {
        await taskAPI.create(inputText)
      }

      // 処理完了時にはトドのデータを更新し、テキストボックスを空欄にする。
      this.$emit('emit-fetch-tasks')
      event.target.value = ''
    },
    enableSubmitTask () {
      this.canSubmit = true
    },
    disableSubmitTask () {
      this.canSubmit = false
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
