<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>



let fSingleton;
export default {
  name: 'App',
  components: {
  },
  methods: {
    yourCallBackFunction () {
      console.log("backButton")
    },

  },
  beforeDestroy () {

  },
  async mounted(){


  },
}
</script>

<style>
</style>
