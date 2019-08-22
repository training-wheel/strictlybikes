<template>
  <Page class="page" id="homeBackground" color="white" >
      <ActionBar class="action-bar" title="Home">
        <DockLayout width="auto" height="*" stretchLastChild="false">
          <Label text="Scatter" dock="left" width="80" marginTop="3" fontWeight="bold" fontSize="24" />
          <Button height="40" borderRadius="30" text="Logout" backgroundColor="#eb8100"
              ios.position="right" @tap="onLogout" dock="right" marginRight="10"/>
        </DockLayout>
      </ActionBar>
    <ScrollView orientation="vertical" scrollBarIndicatorVisible="true">
      <FlexboxLayout flexDirection="column">
        <StackLayout>
          <Label :text="username" color="#ff9933" flexGrow=".3" fontWeight="bold" fontSize="24" horizontalAlignment="center" />
          <FlexboxLayout justifyContent="space-around" >
            <Image :src="imageUrl" height="20%" width="auto" borderRadius="90" />
            <PlayerStats fontSize="15" alignSelf="center" v-if="userMetrics.length > 0" :userMetrics="userMetrics" />
          </FlexboxLayout>
          <Label text="BADGES" fontWeight="bold" fontSize="24" textAlignment="center" />
          <Badges fontSize="15" :userBadges="userBadges" padding="5%" />
          <Label text="GAMES" flexGrow=".3" fontSize="24" fontWeight="bold" horizontalAlignment="center" />
          <PastGamesMap fontSize="15" :gameStats="gameStats" />
        </StackLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
  import PlayerStats from './PlayerStats';
  import Badges from './Badges';
  import PastGamesMap from './PastGamesMap';
  import axios from 'axios';
  import * as appSettings from 'tns-core-modules/application-settings';
  import { tnsOauthLogout } from '../../../auth/auth-service';
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
    methods: {
      onLogout() {
        tnsOauthLogout();
        appSettings.remove('jwt');
        this.$goto('Login');
      },
    },
    created() {
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