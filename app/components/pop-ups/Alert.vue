<template>
  <Frame>
    <Page id="homeBackground">
      <ActionBar title="Bike Safe" class="action-bar"/>
      <StackLayout marginTop="20">
        <Label textWrap="true" text="The game will begin shortly..." class="h2 description-label" fontSize="22" color="white" textAlignment="center" fontWeight="bold" marginRight="5%" marginLeft="5%"></Label>
          <Image src="https://melonbike.com/wp-content/uploads/2018/02/2655335864_213003_png_raw_3-1.png" height="40%" marginTop="10%"/>
          <Label textWrap="true"
            text="Always wear your helmet! Safety is our #1 priority!"
            class="h2 description-label" fontSize="22" color="white" textAlignment="center" marginTop="10%" fontWeight="bold"></Label>
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
const Vue = require('nativescript-vue');
var timerModule = require("tns-core-modules/timer");

  export default {
    props: ['socket'],
    methods: {
      test(){
        if(this.socket){
          this.socket.on('playing', (message) => {
            this.$modal.close();
          })
        }
      }
    },
    data() {
      return {

      }
    },
    created(){
      this.test();
    }
  }
</script>

<style>

</style>