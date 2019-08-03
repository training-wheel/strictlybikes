<template>
    <Page class="page">
        <ActionBar title="Home">
            <ActionItem @tap="onTapDelete" ios.position="right" text="delete"
                android.position="popup">
                <Button height="40" width="40" borderRadius="30"
                    text="Profile" color="white"
                    backgroundColor="green" ios.position="right"
                    android.position="popup" />  
            </ActionItem>

        </ActionBar>
        <ScrollView>
            <StackLayout orientation="vertical" width="*" height="*"
                backgroundColor="lightgray">

                <Button text="New Trip" width="400" height="20%"
                    backgroundColor="darkgreen" marginTop="20" textAlignment="center"
                    color="white" fontSize="40" fontWeight="bold"
                    borderRadius="30" @tap="onButtonTap" />
                <Button text="Joy Ride" width="400" height="20%"
                    backgroundColor="darkgreen" marginTop="20" textAlignment="center"
                    color="white" fontSize="40" fontWeight="bold"
                    borderRadius="30" @tap="onButtonTap" />
                <Button text="Stolen Bike" width="400" height="20%"
                    backgroundColor="darkgreen" marginTop="20" textAlignment="center"
                    color="white" fontSize="40" fontWeight="bold"
                    borderRadius="30" @tap="onButtonTap" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>


<script >
  export default {
    methods: {
      name() {
        
      }
    },
    data() {
      return {
        msg: 'Hey Charles'
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
