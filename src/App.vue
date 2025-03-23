<template>
  <div id="app">
    <HeaderBanner />
    <router-view />
  </div>
</template>

<script>
import HeaderBanner from '@/components/HeaderBanner.vue'

export default {
  name: 'App',
  components: {
    HeaderBanner,
  },
}
</script>

<style>
#app {
  min-height: 100vh;
  /* background-color: #f5f5f5; */
}
</style>
