<template>
  <GridLayout height="10%" >
    <ScrollView orientation="horizontal" >
      <StackLayout orientation="horizontal" >
        <template v-for="(badge, index) in userBadges" >
          <BadgeItem :badge="badge" :key="index" />
        </template>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
  import BadgeItem from './BadgeItem';
  import carousel from 'nativescript-carousel';

  export default {
    name: "Badges",
    props: { 
      userBadges: Array,
    },
    components: {
      BadgeItem,
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
            description: "5 wins",
            name: "5WinBadge",
            goal: 5,
          },
          {
            description: "10 wins",
            name: "10WinBadge",
            goal: 10,
          },
          {
            description: "15 wins",
            name: "15WinBadge",
            goal: 15,
          }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>