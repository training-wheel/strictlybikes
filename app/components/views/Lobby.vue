<template>
    <Page class="page">
        <ActionBar title="Lobby">
        </ActionBar> 

        
        <ScrollView>
            <StackLayout orientation="vertical" width="*" height="*"
                backgroundColor="white">

                <Button text="Join Makiyah's Game" width="80%" height="20%"
                    backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                    color="white" fontSize="20" fontWeight="bold"
                    borderRadius="30" @tap="$goto('Placeholder')" />
                <Button text="Join Wilson's Game" width="80%" height="20%"
                backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                color="white" fontSize="20" fontWeight="bold"
                borderRadius="30" @tap="$goto('Placeholder')" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>




<script >
  export default {
    methods: {
     
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #5EB0E5;
        color: #ffffff;
    }
</style>
