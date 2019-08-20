<template>
  <GridLayout height="10%" >
    <Carousel v-if="userBadges.length" height="100" color="white"
      android:indicatorAnimation="slide" indicatorColor="#fff"
      indicatorOffset="0, -10" showIndicator="true" >
      <CarouselItem v-for="(badge, i) in userBadges" :key="i" verticalAligment="middle" >
        <GridLayout>
          <FlexboxLayout>
            <img :src="`~/assets/badges/${badge.name}.png`" />
            <Label :text="badge.description" />
          </FlexboxLayout>
        </GridLayout>
      </CarouselItem>
    </Carousel>
  </GridLayout>
</template>

<script>
  import carousel from 'nativescript-carousel';

  export default {
    name: "Badges",
    props: { 
      userBadges: Array,
    },

    watch: {
      async userBadges(to) {
        await this.$nextTick()
        this.$refs.myCarousel.nativeView.refresh();
      },
    },
    data() {
      return {
        testBadges: [
          {
            name: "5 wins",
            description: "5WinBadge",
          },
          {
            name: "10 wins",
            description: "10WinBadge"
          },
          {
            name: "15 wins",
            description: "15WinBadge"
          }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>