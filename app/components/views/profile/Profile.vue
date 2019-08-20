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
        <FlexboxLayout flexDirection="row" justifyContent="center">
          <Button width="30%" @tap="chooseMap(1)" >Next Game</Button>
          <Button width="30%" @tap="chooseMap(-1)" >Previous Game</Button>
        </FlexboxLayout>
        <Mapbox 
          :accessToken="mapBoxApi" 
          mapStyle="traffic_day" 
          latitude="29.9643504" 
          longitude="-90.0816426" 
          showUserLocation="true" 
          zoomLevel="9" 
          @mapReady="onMapReady($event)" 
          height=50% 
          width=*>
      </Mapbox>
      
      </StackLayout>
  
    </FlexboxLayout>
  </Page>
</template>

<script>
  import PlayerStats from './PlayerStats';
  import Badges from './Badges';
  import axios from 'axios';
  import * as appSettings from 'tns-core-modules/application-settings';
  import { PassThrough } from 'stream';
  import polyline from '@mapbox/polyline';
  const mapBoxApi = require('../../../config').MAPBOX_API;
  const geolocation = require("nativescript-geolocation");
  const {Accuracy} = require("tns-core-modules/ui/enums");

  export default {
    name: "Profile",

    components: {
      Badges,
      PlayerStats,
    },
    methods: {
      onMapReady(eventList) {
        const markerList = [];
        this.gameStats[this.currentGame].markers.forEach((marker) => {
          const indiv = {lat: marker.lat, lng: marker.long, id: marker.id};
          markerList.push(indiv);
        })
        this.mapArgs = eventList;
        eventList.map.addMarkers(
          markerList,
        );
        this.chooseUser(this.username);
      },
      chooseUser(selectedUser) {
        this.selectedUser = selectedUser;
        this.mapArgs.map.removePolylines();
        this.gameStats[this.currentGame].info.players.forEach((player) => {
          if (player.username === selectedUser) {
            const decodedPolyline = polyline.decode(player.polyline);
            const formattedPolyline = decodedPolyline.map((coord) => {
              const [lat, lng] = coord
              const coordObject = { lat, lng };
              return coordObject;
            });
            this.mapArgs.map.addPolyline({
              width: 3,
              color: 'orange',
              points: formattedPolyline,
            });
          }
        });
      },
      chooseMap(num) {
        if(num > 0) {
          if(this.currentGame < this.gameStats.length - 1) {
            this.currentGame++;
            this.mapArgs.map.removeMarkers();
            this.onMapReady(this.mapArgs);
          } 
          } else if(num < 0 && this.currentGame > 0) {
            this.currentGame--;
            this.mapArgs.map.removeMarkers();
            this.onMapReady(this.mapArgs);
        }

      }
    },
    data() {
      return {
        baseUrl: require('../../../config').SERVER_BASE_URL,
        username: '',
        imageUrl: '',
        userMetrics: [],
        userBadges: [],
        mapBoxApi,
        gameStats: [],
        mapArgs: null,
        currentGame: 0,
        selectedUser: '',
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