<template>
  <ListView for="badge in badges" >
    <v-template>
      <WrapLayout>
        <Image :src="badge.image" height="20%" width="20%"  />
        <Label :text="badge.text" color="#ffffff" fontWeight="bold" />
      </WrapLayout>

    </v-template>
  </ListView>
</template>

<script>
  export default {
    name: "Badges",
    
    methods: {
      name() {
        
      }
    },
    data() {
      return {
        
        badges: [
          {
            text: "5 wins",
            image: "~/assets/badges/5Badge.png",
          },
          {
            text: "10 wins",
            image: "~/assets/badges/10 Badge.png"
          },
          {
            text: "15 wins",
            image: "~/assets/badges/15Badge.png"
          }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>