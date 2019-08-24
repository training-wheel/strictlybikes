<template>
  <Page class="page" id="homeBackground">
    <ActionBar class="action-bar" title="Game" backgroundColor="#58B0E5">
      <DockLayout width="auto" height="*" stretchLastChild="false">
        <StackLayout orientation="vertical" >
        </StackLayout>
        <Label :text="minutes + ':' + seconds" dock="center" fontSize="22"/>
      </DockLayout>
    </ActionBar>

    <StackLayout>
      <Mapbox :accessToken="mapBoxApi" mapStyle="traffic_day" latitude="29.9643504" longitude="-90.0816426"
        showUserLocation="true" zoomLevel="13" @mapReady="onMapReady($event)" height="70%" width="*">
      </Mapbox>
      <ScrollView>
        <StackLayout v-if="gameInfo.mode === 'teamsprint'">
          <Label :text="'My Markers : ' + securedMarkers + '/' + totalMarkers +'  '" class="action-label" color="white" marginLeft="10" fontWeight="bold"></Label>
          <Label v-if="players[0]" :text="`${this.results[0].place} - ${this.results[0].name} | score: ${this.results[0].score}`"  class="action-label" color="#eb8100" backgroundColor="white" borderColor="#eb8100"  borderWidth="1" borderRadius="5" textAlignment="center" />
          <Label v-if="players[1]" :text="`${this.results[1].place} - ${this.results[1].name} | score: ${this.results[1].score}`"  class="action-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" textAlignment="center" />
          </StackLayout>

    <StackLayout v-else>
      <Label :text="room" class="action-label" color="white" marginLeft="10" fontWeight="bold"></Label>
      <Label :text="'My Markers : ' + securedMarkers + '/' + totalMarkers +'  '" class="action-label" color="white" marginLeft="10" fontWeight="bold"></Label>
          <Label v-if="players[0]" :text="`${this.results[0].place} - ${this.results[0].name} | score: ${this.results[0].score}`"  class="action-label" color="#eb8100" backgroundColor="white" borderColor="#eb8100"  borderWidth="1" borderRadius="5" textAlignment="center" />
          <Label v-if="players[1]" :text="`${this.results[1].place} - ${this.results[1].name} | score: ${this.results[1].score}`"  class="action-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" textAlignment="center" />
          <Label v-if="players[2]" :text="`${this.results[2].place} - ${this.results[2].name} | score: ${this.results[2].score}`"  class="action-label" color="#58B0E5" backgroundColor="white" borderColor="#58B0E5"  borderWidth="1" borderRadius="5" textAlignment="center" />
    </StackLayout>
    </ScrollView>
    </StackLayout>
  </Page>
</template>


<script>
    import * as utils from "utils/utils";
    import Vue from "nativescript-vue";
    import axios from 'axios';
    import router from '../../router'
    import * as appSettings from 'tns-core-modules/application-settings';
    import polyline from '@mapbox/polyline';
    import * as geolocation from "nativescript-geolocation";
    import { Accuracy } from "tns-core-modules/ui/enums";
    const timerModule = require("tns-core-modules/timer");
    const jwt = appSettings.getString('jwt');
    const Toast = require("nativescript-toast");
    const Vibrate = require("nativescript-vibrate").Vibrate;

    /**
     * Storing all values and methods for Game View
     * @type {Object}
     */
    export default {
      /**
       * Passed down props
       * @type {Array}
       */
      props: ['socket', 'room', 'gameMode', 'gameInfo', 'gameLength', 'profileName'],

      /**
       * Holds all methods and functions
       * @type {Object}
       */
      methods: {

        teamColor() {
          const team = this.players.filter((player) => {
            return player.playerName = this.playerName;
          });

          if(team === 'orange') {
            return '#eb8100';
          } else {
            return '#58B0E5';
          }
        }
        

        /**
         * Starts the game for all users when game is ready. Creates
         * socket listener for when users hit markers that trigger points given
         * and popups. Also creates socket listener for game ending conditions.
         * @tutorial socket socket.on('hit') is a trigger for hitting markers, 'end' for game end
         */
        playing() {
          this.socket.on('hit', (username) => {
            Toast.makeText(`${username} hit a marker!`).show();
            this.vibrator.vibrate(200, 200, 300);

            if(this.gameInfo.mode === 'teamsprint') {
              this.team.forEach((team) => {
              if(team.username === username) {
                team.score++;
              }
              })
              this.results = this.displayLeaderboard(this.team);
            } else {
              this.players.forEach((player) => {
                if (player.username === username) {
                  player.score++;
                }
              })
              this.results = this.displayLeaderboard(this.players);
            } 
          })
          this.socket.on('end', () => {
            this.endGame();
          }) 
          //Changes gamestate to playing
          this.socket.on('playing', (results) => {
            this.startTimer(this.gameLength);
            const {
              markersArray,
              players,
            } = results;
            if (markersArray.length === 15) {
              var round1 = markersArray.slice(0, 5);
              var round2 = markersArray.slice(5, 10);
              var round3 = markersArray.slice(10, 15);
              //Adds the markers to the map instance
              round1.forEach((marker) => {
                this.mapArgs.map.addMarkers([{
                  id: marker.id,
                  lat: marker.lat,
                  lng: marker.long,
                  title: "Checkpoint",
                  iconPath: 'assets/images/checkpoints.png',
                }])
                //Saves the specific markers to "data"
                this.markers.push({
                  id: marker.id,
                  lat: marker.lat,
                  lng: marker.long,
                  title: "Checkpoint",
                  iconPath: 'assets/images/checkpoints.png',
                })
              })
              //Removes the marker when receiving ping that the "wave" is over
              this.socket.on('update markers', (wave) => {
                if (wave === 2) {
                const oldMarkers = round1.map(x => x.id);
                  this.mapArgs.map.removeMarkers(oldMarkers);
                  round2.forEach((marker) => {
                    this.mapArgs.map.addMarkers([{
                      id: marker.id,
                      lat: marker.lat,
                      lng: marker.long,
                      title: "Checkpoint",
                      iconPath: 'assets/images/checkpoints.png',
                    }])
                    this.markers.push({
                      id: marker.id,
                      lat: marker.lat,
                      lng: marker.long,
                      title: "Checkpoint",
                      iconPath: 'assets/images/checkpoints.png',
                    })
                  })
                }
                if (wave === 3) {
                  const oldMarkers = round2.map(x => x.id);
                  this.mapArgs.map.removeMarkers(oldMarkers);
                  round3.forEach((marker) => {
                    this.mapArgs.map.addMarkers([{
                      id: marker.id,
                      lat: marker.lat,
                      lng: marker.long,
                      title: "Checkpoint",
                      iconPath: 'assets/images/checkpoints.png',
                    }])
                    this.markers.push({
                      id: marker.id,
                      lat: marker.lat,
                      lng: marker.long,
                      title: "Checkpoint",
                      iconPath: 'assets/images/checkpoints.png',
                    })
                  })
                }
              });
            } else if(this.gameMode === "teamsprint"){

            } else {
              markersArray.forEach((marker) => {
                this.mapArgs.map.addMarkers([{
                  id: marker.id,
                  lat: marker.lat,
                  lng: marker.long,
                  title: "Checkpoint",
                  iconPath: 'assets/images/checkpoints.png',
                }])
                this.markers.push({
                  id: marker.id,
                  lat: marker.lat,
                  lng: marker.long,
                  title: "Checkpoint",
                  iconPath: 'assets/images/checkpoints.png',
                })
              })
            }
            this.players = players;
            console.log('players', JSON.stringify(this.players))
            if (geolocation.isEnabled()) {
              this.checkUserMarkerLocation();
            } else {
              geolocation.enableLocationRequest(true)
                .then(() => {
                  this.checkUserMarkerLocation();
                })
                .catch((err) => {
                  console.error(`Failed to enable location: ${err}`);
                })
            }
            if(this.gameInfo.mode === 'teamsprint') {
              this.results = this.displayLeaderboard(this.team);
            } else {
              this.results = this.displayLeaderboard(this.players);
            }
          });
        },

        /**
         * startTimer starts a timer and keeps track of the time, converting milliseconds to minutes and
         * seconds. At 0, the game stops
         * @param {Number} duration A time limit in milliseconds
         */
        startTimer(duration) {
          this.gameTime = timerModule.setInterval(() => {
            let minutesInHere = parseInt(duration / 60, 10)
            let secondsInHere = parseInt(duration % 60, 10);
            this.minutes = minutesInHere < 10 ? "0" + minutesInHere : minutesInHere;
            this.seconds = secondsInHere < 10 ? "0" + secondsInHere : secondsInHere;
            if (--duration < 0) {
              duration = 0;
            }
          }, 1000);
        },

        openAlertModal() {
          if (!this.warningShown) {
            this.$showModal(router.Alert, {
              props: {
                socket: this.socket,
                
              }
            })
            this.warningShown = true;
          }
        },
        /**
         * Shows the leaderboard with names and points
         */
        showLeaderboard(){
            this.$showModal(router.Leaderboard, {
                props: {
                socket: this.socket,
                players: this.players,
                team: this.team,
                gameMode: this.gameInfo.mode
              }
            });
        },
        checkTop3(array, name) {
        let top3 = false;
        let me = '';
        let place = 1;
        array.forEach((obj, index) => {
          if(obj.name === name){
            console.log(array, index);
              me = obj;
            place = index + 1;
            }
        })
        array = array.slice(0, 3);
        array.forEach((obj) => {
          if(obj.name === name){
              top3 = true;
              return array;
            }
        })
        if(!top3){
          array[2] = me;
          }
        if(place > 3) {
          place = place + 'th';
        }
        return array
        },
        displayLeaderboard(array) {
            let newArray = [];
            let place = 1;
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
              newArray.push({name: player.username, score: player.score, place: place});
              place += 1;
            })
            console.log('here', newArray);

            let finalArray = this.checkTop3(newArray, this.profileName);
            return finalArray;
          },
        onLeaveGame(){
          this.timer.forEach((timer) => {
            timerModule.clearInterval(timer);
          })
          timerModule.clearInterval(this.gameTime);
          this.$goto('Home');
        },
        /** 
         * Clears all ending processes and saves game info to database for all players
         */
        endGame() {
          this.timer.forEach((timer) => {
            timerModule.clearInterval(timer);
          })
          timerModule.clearInterval(this.gameTime);
          const { room, topSpeed } = this;
          const path = polyline.encode(this.playerPath);
          const options = {
            path,
            topSpeed,
            room,
            jwt,
          }
          this.$showModal(router.Summary, {
            props: {
              players: this.players,
              topSpeed: this.topSpeed,
              gameMode: this.gameInfo.mode,
              team: this.team,
            }
          });
          this.socket.emit('gameStats', options);
        },
        checkUserMarkerLocation() {
          let deletedMarkers = [];
          for (let key in this.markers) {
            let {
              lat,
              lng,
              id
            } = this.markers[key];
            lng = lng.toPrecision(5);
            lat = lat.toPrecision(5);

            const timer = timerModule.setInterval(() => {
              geolocation.getCurrentLocation({
                  maximumAge: 5000,
                  timeout: 20000,
                  updateTime: 1000,
                  desiredAccuracy: Accuracy.high,
                }).then((userLocation) => {
                  this.mapArgs.map.removeMarkers([10000]);
                  this.mapArgs.map.addMarkers([{
                    id: 10000,
                    lat: userLocation.latitude,
                    lng: userLocation.longitude,
                    title: "Current Location",
                    iconPath: 'assets/images/usermarker.png',
                  }]);
                  this.markers.push({
                    id: 10000,
                    lat: userLocation.latitude,
                    lng: userLocation.longitude,
                    title: "Current Location",
                    iconPath: 'assets/images/usermarker.png',
                  });
                  if (userLocation.latitude.toPrecision(5) == lat
                    && userLocation.longitude.toPrecision(5) == lng
                    && !deletedMarkers.includes(id) && id !== 10000) {
                    deletedMarkers.push(id);
                    this.securedMarkers += 1;
                    this.mapArgs.map.removeMarkers([id]);
                    this.socket.emit('markerHit', {
                      id,
                      jwt,
                    })
                  }
                  const currentLocation = [userLocation.latitude, userLocation.longitude];
                  this.playerPath.push(currentLocation);

                  const { speed } = userLocation;
                  if (speed > this.topSpeed) {
                    this.topSpeed = speed;
                  }
                })
                .catch((err) => {
                  // console.error("location err in game", err);
                })
            }, 2000);
            this.timer.push(timer);
          }
        },
        onMapReady(readyEvent) {
          console.log('this.profileName', this.profileName);
          this.openAlertModal();
          this.mapArgs = readyEvent;
          readyEvent.map.addMarkers(this.markers);
          if(this.gameInfo.mode === "timeattack"){
            this.totalMarkers = 15;
          }else if(this.gameInfo.mode === "teamsprint"){
            this.totalMarkers = 10;
          } else {
            this.totalMarkers = 3;
          }
          this.playing();
          
          if(this.gameInfo.mode === 'teamsprint') {
            this.results = this.displayLeaderboard(this.team);
            console.log('TEAMSPRINT')
          } else {
            this.results = this.displayLeaderboard(this.players);
          }
        },
      },
      data() {
        return {
          totalMarkers: "",
          results: [],
          userCount: 0,
          warningShown: null,
          mapBoxApi: require('../../config').MAPBOX_API,
          markers: [],
          players: [],
          team: [{username: 'blue', score: 0}, {username: 'orange', score: 0}],
          mapArgs: null,
          playerPath: [],
          topSpeed: 0,
          speed: "",
          gameTime: null,
          timer: [],
          securedMarkers: 0,
          vibrator: new Vibrate(),
          minutes: "00",
          seconds: "00",
        };
      },
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>