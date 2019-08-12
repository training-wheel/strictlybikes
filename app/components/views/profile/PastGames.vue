<template>
  <ScrollView orientation="horizontal" height="40%">
    <ListView for="game in pastGames">
      <v-template>
        <StackLayout>
          <Image :src='game.map' />
          <Label :text='game.radius' />
        </StackLayout>
      </v-template>
    </ListView>
  </ScrollView>
</template>

<script>
  export default {
    name: "PastGames",
    methods: {
    },
    data() {
      return {
        pastGames: [
          {
            map: 'https://miro.medium.com/max/700/0*yPSQlTHRvLaIVBcG.jpg',
            radius: 3,
            markerNumber: 4
          },
          {
            map: 'https://miro.medium.com/max/700/0*yPSQlTHRvLaIVBcG.jpg',
            radius: 3,
            markerNumber: 4
          },
          {
            map: 'https://miro.medium.com/max/700/0*yPSQlTHRvLaIVBcG.jpg',
            radius: 3,
            markerNumber: 4
          },
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>