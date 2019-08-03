<template>
  <Page class="page">
    <label text="Hello" />
    <Badges />

  </Page>
  
</template>

<script>
import Badges from "./Badges";
import PastTrips from "./PastTrips";
  export default {
    
    name: "Profile",

    components: {
      Badges,
      PastTrips
    },

    methods: {
      name() {
        
      }
    },
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>