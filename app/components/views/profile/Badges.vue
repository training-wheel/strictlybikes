<template>
  <ListView for="badge in badges" height="30%" >
    <v-template>
      <WrapLayout >
        <Image :src="badge.image" height="10%" width="10%"  />
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
            image: "~/assets/badges/5WinBadge.png",
          },
          {
            text: "10 wins",
            image: "~/assets/badges/10WinBadge.png"
          },
          {
            text: "15 wins",
            image: "~/assets/badges/15WinBadge.png"
          }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>