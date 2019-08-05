<template>
  <Page class="page">
    <FlexboxLayout height="70%" flexDirection="column">
      
        <label :text="name" flexGrow="1" />
        <label :text="totalDist" flexGrow="1" />
        <Badges backgroundColor="#0F62AB" flexGrow="1" />
        <PastTrips />
    </FlexboxLayout>
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
        name: "Miguel",
        totalDist: 10,

      }
    },
  }
</script>

<style lang="scss" scoped>

</style>