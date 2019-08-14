<template>
  <Frame>
    <Page>
      <ActionBar title="Wlcome" @test="test"/>
      <StackLayout>
        <Label textWrap="true" text="The game will begin shortly..." class="h2 description-label"></Label>
          <Image src="https://media.istockphoto.com/illustrations/bicycle-helmet-illustration-id165810787?k=6&m=165810787&s=612x612&w=0&h=m_B9wO-YBlKAPeJSfQDpG7p6bERnMLTLQtdiJjv05ss=" />
        <Label textWrap="true"
          text="Always wear your helmet! Safety is our #1 priority!"
          class="h2 description-label"></Label>
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
const Vue = require('nativescript-vue');
const timerModule = require("tns-core-modules/timer");

  export default {
    props: [],
    methods: {
      
    },
    data() {
      return {
        players: [],
      }
    },
  }
</script>

<style>

</style>