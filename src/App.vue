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
      if (this.$store.state.device.deviceUuid === null) {
        await this.$store.dispatch('setDeviceToken', uuidv4())
        const result = await deviceAPI.create(this.$store.state.device.deviceToken, 'desktop')
        this.$store.dispatch('setDeviceUuid', result.data.uuid)
      }
    }
  }
}
</script>
