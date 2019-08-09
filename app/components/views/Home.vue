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
                    borderRadius="30" @tap="handleCreateClick" />
                <Button text="Join Game" width="50%" height="20%"
                backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                color="white" fontSize="20" fontWeight="bold"
                borderRadius="30" @tap="$goto('Lobby')" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>




<script >
    import axios from "axios";
    import { SocketIO } from 'nativescript-socketio';

    
    
  export default {
    methods: {
        handleCreateClick(){
            var testSocket = new SocketIO('https://2fa9f776.ngrok.io');
            let userTypedInCode = 'game1'
            // get game data
            let gameInfo = {
                lat: "90",
                long: "90",
                markerLimit: 3,
                playerLimit: 2,
                timeLimit: 100,
                startTime: 20,
                code: userTypedInCode,
            }
            // make request to server save a game to the DB (sending game info)
            axios.post('https://2fa9f776.ngrok.io/createGame', gameInfo)
            .then((result) => {
                testSocket.connect();
                testSocket.on('connect', () => {
                    testSocket.emit('joinGame', {
                        userId: result.data.userId,
                        room: userTypedInCode,
                        });
                });
                testSocket.on('join', (response) => {
                    console.log(response);
                    
                })
            })
            .catch((err)=>{
                console.error(err);
            })

            
        },
     
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
