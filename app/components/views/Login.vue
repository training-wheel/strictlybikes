<template>
  <Page class="page">
    <ActionBar title="Stricly Bikes"/>
        <ScrollView>
          <StackLayout orientation="vertical" width="*" height="*" backgroundColor="lightgray">
            <Button text="Button" @tap="onLoginTap" height="10%"/>
          </StackLayout>
        </ScrollView>
  </Page>
</template>

<script>
  import { tnsOauthLogin } from '../../auth/auth-service';
  export default {
    methods: {
      onLoginTap() {
        console.log("login clicked");
        tnsOauthLogin('google');
      }
    },
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>