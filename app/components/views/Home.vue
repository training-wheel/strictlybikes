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
                <!-- <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz1DzGXXyJPBs5-x2cv4J27YmuyUb0XZLXQPynHYy4qFxGvAKHCw" height="10%"></Image> -->
                <Button text="Create Game" width="50%" height="20%"
                    backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                    color="white" fontSize="20" fontWeight="bold"
                    borderRadius="30" @tap="$goto('CreateGame')" />
                <Button text="Join Game" width="50%" height="20%"
                backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                color="white" fontSize="20" fontWeight="bold"
                borderRadius="30" @tap="handleLobbyClick" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>




<script >    
//import socket
    import Vue from 'nativescript-vue';
    import { SocketIO } from 'nativescript-socketio';
    import axios from 'axios'

  export default {
    methods: {
        handleLobbyClick(){
        // connect socket
        var socket = new SocketIO('https://2fa9f776.ngrok.io');
        socket.connect();
        // emit the need for lobby join
        socket.emit('joinLobby', 'lobby');
        //route to the lobby
        //send the socket down as a prop to lobby page
        this.$goto('Lobby', {
            props : {
                socket
            }
        });
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
