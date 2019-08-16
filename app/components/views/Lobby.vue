<template>
  <Page class="page">
    <ActionBar title="Lobby"></ActionBar>
    <LobbyGame v-bind:games="games" v-bind:handleJoin="handleJoin" />
  </Page>
</template>

<script >
import { SocketIO } from "nativescript-socketio";
import * as appSettings from "tns-core-modules/application-settings";
import LobbyGame from "./LobbyGame";
const jwt = appSettings.getString("jwt");

import axios from "axios";

export default {
  props: ["socket"],
  components: {
    LobbyGame,
  },
  methods: {
    addRoom(games) {
      games = JSON.parse(games);
      this.games = games;
    },
    handleJoin(game) {
      this.socket.emit("joinGame", {
        room: game.code,
        jwt
      });
      this.socket.on("join", message => {
        console.log("joined");
        this.$goto("Game", {
          props: {
            socket: this.socket
          }
        });
      });
    },
    justJoined() {
      this.socket.on("newGame", gameData => {
        this.addRoom(gameData);
      });
    }
  },
  data() {
    return {
      games: []
    };
  },
  created() {
    this.justJoined();
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #5eb0e5;
  color: white;
}
</style>
