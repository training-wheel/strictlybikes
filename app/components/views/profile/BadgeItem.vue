<template>
  <StackLayout class="badge" >
    <Label class="badge-text" :text="badge.description" />
    <img :src="`~/assets/badges/${badge.name}.png`" />
  </StackLayout>
</template>

<script>
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
    padding: 10%;
  }
  .badge-text {
    display: block;
  }
</style>
