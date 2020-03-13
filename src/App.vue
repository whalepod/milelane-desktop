<template>
  <section id="app">
    <router-view />
  </section>
</template>
<script>
import { mapActions } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  mounted () {
    this.createDeviceIfNeeded(uuidv4())
  },
  methods: {
    ...mapActions('device', ['createDeviceIfNeeded'])
  }
}
</script>
