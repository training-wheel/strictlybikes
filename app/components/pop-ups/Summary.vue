<template>
  <Frame>
    <Page id="homeBackground">
      <ActionBar title="Game Over" class="action-bar"/>
      <ScrollView orientation="vertical">
      <StackLayout v-if="`${this.gameMode} !== teamsprint`">
          <Image src="data:image/png;base64,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" height="50%"/>
          
          <Label v-if="players[0]" :text="`First Place - ${this.results[0]} score: ${this.scores[0]}`" class="h2 description-label" color="#eb8100" backgroundColor="white" borderColor="#eb8100"  borderWidth="1" borderRadius="5" />
          <Label v-if="players[1]" :text="`Second Place - ${this.results[1]} score: ${this.scores[1]}`" class="h2 description-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" />
          <Label v-if="players[2]" :text="`Third Place - ${this.results[2]} score: ${this.scores[2]}`" class="h2 description-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" />
          <Label v-if="players[3]" :text="`Fourth Place - ${this.results[3]} score: ${this.scores[3]}`" class="h2 description-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" />
          <Label :text="`Your Top Speed! -> ${this.topSpeed}`" class="h2 description-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" />
          
        <Label textWrap="true" text="Hope You Had Fun" class="h2 description-label" fontSize="22" textAlignment="center" color="white"></Label>
        <Label textWrap="true" text="Head over to the Lobby play again!" class="h2 description-label" fontSize="22" color="white" textAlignment="center"></Label>
        <Button class="btn btn-outline" text="Lobby" @tap="leaveGame" color="white" backgroundColor="#58B0E5" />
      </StackLayout>
      <StackLayout v-else>
          <Image src="data:image/png;base64,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" height="50%"/>
          <Label  :text="`First Place - ${this.results[0]}`" class="h2 description-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" />
          <Label  :text="`Second Place - ${this.results[1]}`" class="h2 description-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" />
          <Label :text="`Your Top Speed! -> ${this.topSpeed}`" class="h2 description-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" />
          <Button class="btn btn-outline" text="Lobby" @tap="leaveGame" color="white" backgroundColor="#58B0E5" />

      </StackLayout>
      </ScrollView>
    </Page>
  </Frame>
</template>

<script>

//View for modal at end of game
const Vue = require('nativescript-vue');
var timerModule = require("tns-core-modules/timer");

  export default {
    mounted(){
    },
    props: ['socket', 'players', 'topSpeed', 'team', 'gameMode'],
    methods: {
      /**
       * Function called at the end of a game to sort the players by the number of points acquired
       * @param {Array} array Array of current players in the game.
       * @returns {Array} Array of players sorted by the most points acquired 
       */
      showLeaderboard(array) {
            let newArray = [];
            array.sort((a, b) => {
              const user1 = a.score;
              const user2 = b.score;
              let comparison = 0;
              if (user1 < user2) {
                  comparison = 1;
              } else if (user1 > user2) {
                  comparison = -1;
              }
              return comparison;
          })
            array.forEach((player) => {
              newArray.push(player.username);
              this.scores.push(player.score);
            })
            return newArray;
          },
      /**
       * Function attached to the click of the lobby button. Returns view to the main menu
       * 
       */
      leaveGame(){
        this.$modal.close();
        this.$goto('Home', {
            props: {
              socket: this.socket
            }
          });
      },
    },
    /**
     * Dynamically calls showLeaderboard on the team or the players based on the
     */
    created() {
          if(this.gameMode === 'teamsprint') {
            this.results = this.showLeaderboard(this.team);  
          } else {
            this.results = this.showLeaderboard(this.players);
          }
        },
    data() {
      return {
        results: [],
        scores: [],
      }
    },
  }
</script>

<style>

</style>