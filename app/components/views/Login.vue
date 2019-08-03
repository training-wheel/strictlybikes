<template>
  <Page class="page">
    <ActionBar title="Stricly Bikes"/>
        <ScrollView>
          <StackLayout orientation="vertical" width="*" height="*" backgroundColor="lightgray">
            <Button text="Button" @tap="onLoginClick" height="10%"/>
          </StackLayout>
        </ScrollView>
  </Page>
</template>

<script>
  export default {
    methods: {
      onLoginClick() {
        console.log("login clicked");
      }
    },
    data() {
      return {
        key: value
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>