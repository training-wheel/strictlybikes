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
        showUserLocation="true" zoomLevel="11" @mapReady="onMapReady($event)" height="90%" width="*">
      </Mapbox>
    <StackLayout>
      <Label :text="room" class="action-label" color="white" marginLeft="10" fontWeight="bold"></Label>
      <Label :text="'My Markers : ' + securedMarkers + '/' + totalMarkers +'  '" class="action-label" color="white" marginLeft="10" fontWeight="bold"></Label>
    </StackLayout>
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
    const geolocation = require("nativescript-geolocation");
    const {Accuracy} = require("tns-core-modules/ui/enums");
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
      props: ['socket', 'room', 'gameMode', 'gameInfo', 'gameLength'],

      /**
       * Holds all methods and functions
       * @type {Object}
       */
      methods: {

        /**
         * Starts the game for all users when game is ready. Creates
         * socket listener for when users hit markers that trigger points given
         * and popups. Also creates socket listener for game ending conditions.
         * @tutorial socket socket.on('hit) is a trigger for hitting markers, 'end' for game end
         */
        playing() {
          this.socket.on('hit', (username) => {
            Toast.makeText(`${username} hit a marker!`).show();

            this.vibrator.vibrate(200, 200, 300);

            this.players.forEach((player) => {
              if (player.username === username) {
                player.score++;
              }
            })
            this.team.forEach((team) => {
              if(team.username === username) {
                team.score++;
              }
            })

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
            geolocation.enableLocationRequest();
            this.checkUserMarkerLocation();
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
        /** 
         * Clears all ending processes and takes back to the menu
         */
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
                  timeout: 20000
                }).then((userLocation) => {
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
                    && !deletedMarkers.includes(id) && id!== 10000) {
                    deletedMarkers.push(id);
                    this.securedMarkers += 1;
                    this.mapArgs.map.removeMarkers([id]);
                    this.socket.emit('markerHit', {
                      id,
                      jwt,
                    })
                  }
                  this.mapArgs.map.removeMarkers([10000]);
                  const currentLocation = [userLocation.latitude, userLocation.longitude];
                  this.playerPath.push(currentLocation);

                  const { speed } = userLocation;
                  if (speed > this.topSpeed) {
                    this.topSpeed = speed;
                  }
                })
                .catch((err) => {
                  console.error("location err in game", err);
                })
            }, 1000);
            this.timer.push(timer);
          }
        },
        onMapReady(readyEvent) {
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
        },
        getLocation() {
          geolocation.enableLocationRequest();
          geolocation
            .getCurrentLocation({
              desiredAccuracy: Accuracy.high,
              maximumAge: 5000,
              timeout: 20000
            })
            .then(res => {
              this.lati = res.latitude;
              this.lon = res.longitude;
              this.speed = res.speed;
            })
            .catch((error) => {
              console.error('geolocation error', error);
            });
        },
      },
      data() {
        return {
          totalMarkers: "",
          userCount: 0,
          warningShown: null,
          mapBoxApi: require('../../config').MAPBOX_API,
          markers: [],
          players: [],
          team: [{username: 'blue', score: 0}, {username: 'orange', score: 0}],
          mapArgs: null,
          playerPath: [],
          topSpeed: 0,
          lati: "",
          lon: "",
          speed: "",
          addr: "",
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