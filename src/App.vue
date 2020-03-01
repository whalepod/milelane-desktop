<template>
  <section id="app">
    <router-view />
  </section>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
import deviceAPI from '@/modules/api/device.js'

export default {
  mounted () {
    this.initDevice()
  },
  methods: {
    async initDevice () {
      if (this.$store.state.device.deviceId === null) {
        await this.$store.dispatch('setDeviceId', uuidv4())
        deviceAPI.create(this.$store.state.device.deviceId, 'desktop')
      }
    }
  }
}
</script>
