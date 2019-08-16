<template>
  <Page class="page">
    <FlexboxLayout height="98%" flexDirection="column">
      <StackLayout>
        <Label :text="username + '\'s Profile'" flexGrow=".3" fontSize="30" color="#000000" fontWeight="bold" horizontalAlignment="center" />
        <Image :src="imageUrl" height="20%" width="auto" />
        <Label text="Badges" fontSize="30" color="black" />
        <Badges backgroundColor="#0F62AB" :userBadges="userBadges" />
        <Label text="Previous Games" flexGrow=".3" fontSize="30" color="#000000" fontWeight="bold" horizontalAlignment="center" />
        <Button @tap="chooseMap(1)" >Next Game</Button>
        <Button @tap="chooseMap(-1)" >Previous Game</Button>
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
  import Badges from "./Badges";
  
  import axios from 'axios';
  import * as appSettings from 'tns-core-modules/application-settings';
import { PassThrough } from 'stream';
  const mapBoxApi = require('../../../config').MAPBOX_API;
  const geolocation = require("nativescript-geolocation");
  const {Accuracy} = require("tns-core-modules/ui/enums");

  export default {
    name: "Profile",

    components: {
      Badges,
    },
    methods: {
      onMapReady(eventList) {
        const markerList = [];
        this.gameStats[this.currentGame].markers.forEach((marker) => {
          const indiv = {lat: marker.lat, lng: marker.long, id: marker.id};
          console.log(indiv);
          markerList.push(indiv);
        })
        this.mapArgs = eventList;
        eventList.map.addMarkers(
          markerList,
        );
      },
      chooseMap(num) {
        if(num > 0) {
          if(this.currentGame < this.gameStats.length) {
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
          const { username, imageUrl, userMetrics, userBadges, gameInfo, gameMarkers } = result.data;
          this.username = username;
          this.imageUrl = imageUrl;
          this.userMetrics = userMetrics;
          this.userBadges = userBadges;
          

          const gameStats = {};

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