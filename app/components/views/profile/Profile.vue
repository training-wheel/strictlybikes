<template>
  <Page class="page">
    <FlexboxLayout height="98%" flexDirection="column">
      <StackLayout>
        <Label :text="name + '\'s Profile'" flexGrow=".3" fontSize="30" color="#000000" fontWeight="bold" horizontalAlignment="center" />
        <Image src="https://avatars1.githubusercontent.com/u/45217649?s=460&v=4" height="20%" width="auto" />
        <Label text="Hello there. I like potatoes. Potatoes. Potatoes." horizontalAlignment="center" />
        <Label text="Badges" fontSize="30" color="black" />
        <Badges backgroundColor="#0F62AB" />
        <PastGames />
      </StackLayout>
  
    </FlexboxLayout>
  </Page>
</template>

<script>
import Badges from "./Badges";
import PastGames from "./PastGames";
  export default {
    name: "Profile",

    components: {
      Badges,
      PastGames
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