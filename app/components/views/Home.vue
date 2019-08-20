<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Home">
        <DockLayout width="auto" height="*" stretchLastChild="false">
            <Label text="Scatter" dock="left" width="80" marginTop="3" fontWeight="bold" fontSize="24" />
            <Button height="40" width="40" borderRadius="30" text="Profile" color="white" backgroundColor="#eb8100"
                ios.position="right" @tap="$goto('Profile')" dock="right" marginRight="10"/>
        </DockLayout>
        </ActionBar>
           <FlexboxLayout flexDirection="column" alignItems="center" id="homeBackground">
               <Button text="Create Game" height="40%" backgroundColor="#58B0E5" marginTop="20" width="65%" borderRadius="20" textAlignment="center" color="white" fontWeight="bold" fontSize="30" @tap="$goto('CreateGame')"/>
               <Button text="Join Game" height="40%" backgroundColor="#58B0E5" marginTop="20" width="65%" borderRadius="20" textAlignment="center" color="white" fontWeight="bold" fontSize="30" @tap="handleLobbyClick"/>
           </FlexboxLayout>
    </Page>
</template>


<script >    
//import socket
    import Vue from 'nativescript-vue';
    import { SocketIO } from 'nativescript-socketio';
    import * as appSettings from 'tns-core-modules/application-settings';
    const jwt = appSettings.getString('jwt');
    import axios from 'axios';
  
  export default {
    methods: {
        handleLobbyClick(){
        // connect socket
        var socket = new SocketIO(this.baseUrl);
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
          baseUrl: require('../../config').SERVER_BASE_URL,
      }
    },
    
  }
</script>

<style>
    
</style>
