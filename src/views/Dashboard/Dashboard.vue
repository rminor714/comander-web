<template>
  <v-app>
    <v-main style="background:#f2f2f3" >
      <v-container  fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",
  components: {
  },
  props: {},
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    
  }
};
</script>
<style scoped>
</style>

