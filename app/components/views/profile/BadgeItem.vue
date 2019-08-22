<template>
  <GridLayout rows="*" columns="auto">
    <img row="0" width="100%" :src="`~/assets/badges/${badge.name}.png`" />
    <Label row="1" width="100%" :text="badge.description" />
  </GridLayout>
</template>

<script>
export default {
  name: 'BadgeItem',
  props: {
    badge: Object,
    index: Number,
  }
}
</script>
