<template>
    <Page class="page">
        <ActionBar title="Lobby">
        </ActionBar>
        <ScrollView>
            <StackLayout orientation="vertical" width="*" height="*" backgroundColor="white">
                <ListView for="game in games" style="height:1250px">
                    <v-template>

                        <Button :text="game.code" @tap="handleJoin(game)" width="80%" height="20%" backgroundColor="#5EB0E5" marginTop="20"
                    textAlignment="center" color="white" fontSize="20" fontWeight="bold" borderRadius="30"/>
                    </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script >
  import { SocketIO } from 'nativescript-socketio';
  import axios from 'axios'

  export default {
    props: ['socket'],
    methods: {
      addRoom(games) {
        games = JSON.parse(games);
        this.games = games;
      },
      handleJoin(game) {
        this.socket.emit('joinGame', {
          room: game.code,
        });
        this.socket.on('join', (message) => {
          console.log("joined");
          this.$goto('Game', {
            props: {
              socket: this.socket
            }
          });
        });
      },
      justJoined() {
        this.socket.on('newGame', (gameData) => {
          this.addRoom(gameData);
        });
      }

    },
    data() {
      return {
        games: [],

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
