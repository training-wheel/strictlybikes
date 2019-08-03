<template>
    <Page class="page">
        <ActionBar title="Home">
                <Button height="40" width="40" borderRadius="30"
                    text="Profile" color="white"
                    backgroundColor="green" ios.position="right"
                    android.position="popup" @tap="$goto('Profile')" />  
        </ActionBar> 
        <ScrollView>
            <StackLayout orientation="vertical" width="*" height="*"
                backgroundColor="lightgray">

                <Button text="New Trip" width="400" height="20%"
                    backgroundColor="darkgreen" marginTop="20" textAlignment="center"
                    color="white" fontSize="40" fontWeight="bold"
                    borderRadius="30" @tap="$goto('NewTrip')" />
                    <Button text="Free Ride" width="400" height="20%"
                    backgroundColor="darkgreen" marginTop="20" textAlignment="center"
                    color="white" fontSize="40" fontWeight="bold"
                    borderRadius="30" @tap="$goto('ActiveTrip')" />
                    <Button text="Stolen Bikes" width="400" height="20%"
                    backgroundColor="darkgreen" marginTop="20" textAlignment="center"
                    color="white" fontSize="40" fontWeight="bold"
                    borderRadius="30" @tap="$goto('Stolen')" />
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
        background-color: #53ba82;
        color: #ffffff;
    }
</style>
