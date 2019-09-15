<template>
  <StackLayout class="badge" >
    <Label class="badge-text" :text="badge.description" />
    <img :src="`~/assets/badges/${badge.goal}medal.png`" />
  </StackLayout>
</template>

<script>
//Each badge is passed as a badgeitem and given it's image and its description to be used in the badges page
export default {
  name: 'BadgeItem',
  props: {
    badge: Object,
  }
}
</script>

<style scoped>
  .badge {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    padding: 5%;
  }
  .badge-text {
    display: block;
  }
</style>
