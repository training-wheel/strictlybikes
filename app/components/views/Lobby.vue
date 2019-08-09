<template>
    <Page class="page">
        <ActionBar title="Lobby">
        </ActionBar>
        <ScrollView>
            <StackLayout orientation="vertical" width="*" height="*" backgroundColor="white">
                <Button text="addRoom" @tap="addRoom" />

                <ListView for="game in games" style="height:1250px">
                    <v-template>

                        <Button :text="game.timeLimit" @tap="handleJoin(game)"/>
                    </v-template>
                </ListView>
                <Button text="Join Makiyah's Game" width="80%" height="20%" backgroundColor="#5EB0E5" marginTop="20"
                    textAlignment="center" color="white" fontSize="20" fontWeight="bold" borderRadius="30"
                    @tap="$goto('Placeholder')" />
                <Button text="Join Wilson's Game" width="80%" height="20%" backgroundColor="#5EB0E5" marginTop="20"
                    textAlignment="center" color="white" fontSize="20" fontWeight="bold" borderRadius="30"
                    @tap="$goto('Placeholder')" />  
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script >
    import { SocketIO } from 'nativescript-socketio';
    import axios from 'axios'
    //when the socket gets the event for a new game
    //add that game to the gamesList
    // this.socket.on('newGame', (gameData) => {
    //     addRoom(gameData);
    // })

  export default {
    props: ['socket'],
    methods: {
        addRoom(games){
            //parse the newGame and push it into the games array
            games = JSON.parse(games);
            console.log(games);
            this.games = games;
        },
        handleJoin(game){
            //emit event that sends the room
            //for the socket to join
            this.socket.emit('joinGame', {
              room: game.code,
              userId: 2,
              });
            this.socket.on('join', (message) => {
              console.log("joined");
            });
        },
        justJoined(){
            this.socket.on('newGame', (gameData) => {
            this.addRoom(gameData);
        });
        }
     
    },
    data() {
      return {
          games : [],
        
      }
    },
    mounted() {
        this.justJoined();
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #5EB0E5;
        color: #ffffff;
    }
</style>
