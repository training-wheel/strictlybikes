<template>
  <Frame>
    <Page id="homeBackground">
      <ActionBar class="action-bar" title="Leaderboard Ranking"/>
      <StackLayout v-if="`${this.gameMode} !== teamsprint`" >
          <Image src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/orange_prodpicttrophy_1484336291.png" height="50%"/>
          <Label v-if="players[0]" :text="`First Place - ${this.results[0]} score: ${this.scores[0]}`" class="h2 description-label" color="white" backgroundColor="#ff9933" borderColor="#eb8100"  borderWidth="1" borderRadius="5" width="85%"/>
          <Label v-if="players[1]" :text="`Second Place - ${this.results[1]} score: ${this.scores[1]}`" class="h2 description-label" color="white" backgroundColor="#ff9933" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" width="85%" />
          <Label v-if="players[2]" :text="`Third Place - ${this.results[2]} score: ${this.scores[2]}`" class="h2 description-label" color="white" backgroundColor="#ff9933" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" width="85%"/>
          <Label v-if="players[3]" :text="`Fourth Place - ${this.results[3]} score: ${this.scores[3]}`" class="h2 description-label" color="white" backgroundColor="#ff9933" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" width="85%"/>
          <Button text="Close" width="60%" height="15%"
                    backgroundColor="#ff9933" marginTop="25%" textAlignment="center"
                    color="white" fontSize="22" fontWeight="bold"
                    borderRadius="20" @tap="$modal.close()" />
      </StackLayout>
      <StackLayout v-else>
          <Image src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/orange_prodpicttrophy_1484336291.png" height="50%"/>
          <Label  :text="`First Place - ${this.results[0]} score: ${this.scores[0]}`" class="h2 description-label" color="white" backgroundColor="#ff9933" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" width="85%"/>
          <Label  :text="`Second Place - ${this.results[1]} score: ${this.scores[1]}`" class="h2 description-label" color="white" backgroundColor="#ff9933" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" width="85%"/>
          <Button text="Create Game" width="60%" height="15%"
                    backgroundColor="#ff9933" marginTop="25" textAlignment="center"
                    color="white" fontSize="22" fontWeight="bold"
                    borderRadius="20" @tap="$modal.close()" />
      </StackLayout>

      
    </Page>
  </Frame>
</template>



<script>
const Vue = require('nativescript-vue');
const timerModule = require("tns-core-modules/timer");

  export default {
    props: ['socket','gameData', 'players', 'team', 'gameMode'],
    methods: {
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
        },
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