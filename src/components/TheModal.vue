<template>
  <section
    v-if="shouldShowModal"
    class="the-modal-overlay"
    @click="close"
  >
    <section
      class="the-modal"
      @click.stop
    >
      <p>欄外をクリック、またはescキーでhelpを閉じられます</p>
      <the-help v-if="shouldShowHelp" />
      <the-schedule v-if="shouldShowSchedule" />
    </section>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import keyCode from '@/config/keyCode.js'
import TheHelp from '@/components/TheHelp'
import TheSchedule from '@/components/TheSchedule'

export default {
  components: {
    TheHelp,
    TheSchedule
  },
  computed: {
    ...mapGetters('modal', ['shouldShowModal', 'shouldShowHelp', 'shouldShowSchedule'])
  },
  mounted () {
    // @keydown.esc="closeHelp" doesn't work
    // because within TheModal there is no input tag.
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === keyCode.ESC) {
        this.close()
        if (this.shouldShowSchedule) {
          this.leaveSchedule()
        }
      }
    })
  },
  methods: {
    ...mapActions('modal', ['close']),
    ...mapActions('task', ['leaveSchedule'])
  }
}
</script>
<style>
.the-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.the-modal {
  position: relative;
  max-width: 800px;
  max-height: calc(100vh - 128px);
  margin: 24px;
  border-radius: 6px;
  background-color: #fff;
}
.the-modal > * {
  max-height: inherit;
}
.the-modal > p {
  position: absolute;
  top: -24px;
  right: 0;
  font-size: 13px;
  color: #fff;
}
</style>
