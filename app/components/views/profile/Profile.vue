<template>
  <Page class="page">
    <FlexboxLayout backgroundColor="#0F62AB" height="98%" flexDirection="column">
      <StackLayout>
        <Label :text="username" flexGrow=".3" fontWeight="bold" horizontalAlignment="center" />
        <FlexboxLayout >
          <Image :src="imageUrl" height="20%" width="auto" />
          <PlayerStats alignSelf="center" v-if="userMetrics.length > 0" :userMetrics="userMetrics" />
        </FlexboxLayout>
        <Label text="Badges" fontWeight="bold" textAlignment="center" />
        <Badges :userBadges="userBadges" />
        <Label text="Previous Games" flexGrow=".3" color="#000000" fontWeight="bold" horizontalAlignment="center" />
        <PastGamesMap :gameStats="gameStats" />
      </StackLayout>
  
    </FlexboxLayout>
  </Page>
</template>

<script>
  import PlayerStats from './PlayerStats';
  import Badges from './Badges';
  import PastGamesMap from './PastGamesMap';
  import axios from 'axios';
  import * as appSettings from 'tns-core-modules/application-settings';
  import { PassThrough } from 'stream';
  const geolocation = require("nativescript-geolocation");
  const {Accuracy} = require("tns-core-modules/ui/enums");

  export default {
    name: "Profile",

    components: {
      Badges,
      PlayerStats,
      PastGamesMap,
    },
    data() {
      return {
        baseUrl: require('../../../config').SERVER_BASE_URL,
        username: '',
        imageUrl: '',
        userMetrics: [],
        userBadges: [],
        gameStats: [],
      }
    },
    mounted() {
      const token = appSettings.getString('jwt');
      axios.get(`${this.baseUrl}/profile`, {
        headers: {
          jwt: token,
        }
      })
        .then((result) => {
          const { players, username, imageUrl, userMetrics, userBadges, gameInfo, gameMarkers } = result.data;
          this.username = username;
          this.selectedUser = username;
          this.imageUrl = imageUrl;
          this.userMetrics = userMetrics;
          this.userBadges = userBadges;
          

          const gameStats = {};
          players.forEach((playerArray) => {
            const { gameId } = playerArray[0];
            for (let i = 0; i < gameInfo.length; i += 1) {
              if (gameInfo[i].id === gameId) {
                gameInfo[i].players = playerArray;
                return;
              }
            }
          });
          gameInfo.forEach((game) => {
            if(!gameStats[game.id]) {
              gameStats[game.id] = {};
            }
            gameStats[game.id].info = game;
            gameStats[game.id].markers = gameMarkers.filter((marker) => {
              return marker.gameId === game.id;
            })
          })
          for(let key in gameStats) {
            this.gameStats.push(gameStats[key]);
          }
        })
        .catch((err) => {
          console.error(`Failed to fetch profile: ${err}`);
        });
    }
  }
</script>

<style lang="scss" scoped>

</style>