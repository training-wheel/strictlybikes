<template>
    <Page class="page">
        <ActionBar title="Home">
            
                <Button height="40" width="40" borderRadius="30"
                    text="Profile" color="white"
                    backgroundColor="#eb8100" ios.position="right"
                    android.position="popup" @tap="$goto('Profile')" />  
        </ActionBar> 

        
        <ScrollView>
            <StackLayout orientation="horizontal" width="*" height="*"
                backgroundColor="white">

                <Button text="Create Game" width="50%" height="20%"
                    backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                    color="white" fontSize="20" fontWeight="bold"
                    borderRadius="30" @tap="$goto('CreateGame')" />
                <Button text="Join Game" width="50%" height="20%"
                backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                color="white" fontSize="20" fontWeight="bold"
                borderRadius="30" @tap="$goto('Lobby')" />
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
