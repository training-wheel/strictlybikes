<template>
  <GridLayout height="10%" >
    <Carousel v-if="userBadges.length" height="100" color="white" @pageChanged="onBadgeChange"
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