<template>
    <Page class="page">
        <ActionBar title="Game" backgroundColor="#58B0E5" class="action-bar">
          <StackLayout orientation="horizontal" android:horizontalAlignment="right" backgroundColor="#58B0E5">
            <Label :text="room" class="action-label" color="white"></Label>
            <Label :text="'My Markers : ' + securedMarkers + '/' + this.markers.length + '  '" class="action-label" color="white"></Label>
          </StackLayout>
         
        </ActionBar>
        <StackLayout>
                <Mapbox
                    :accessToken="mapBoxApi"
                    mapStyle="traffic_day"
                    latitude="29.9643504"
                    longitude="-90.0816426"
                    showUserLocation="true"
                    zoomLevel="11"
                    @mapReady="onMapReady($event)"
                    height=80%
                    width=*>
                </Mapbox>

                <StackLayout orientation="horizontal">

                    <Button text="End" width="100%" height="60%" backgroundColor="#5EB0E5"
                        marginTop="10" textAlignment="center" color="white"
                        fontSize="20" fontWeight="bold" borderRadius="20" @tap="onLeaveGame()" />
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
    const geolocation = require("nativescript-geolocation");
    const {Accuracy} = require("tns-core-modules/ui/enums");
    const timerModule = require("tns-core-modules/timer");
    const jwt = appSettings.getString('jwt');
    const Toast = require("nativescript-toast");

    export default {
      props: ['socket', 'room'],

      methods: {
        playing() {
          this.socket.on('hit', (username) => {
              console.log(username);
              Toast.makeText(`${username} hit a marker!`).show();
            })
            this.socket.on('end', () => {
              this.endGame();
            })
          this.socket.on('playing', (results) => {
            const { markersArray, playerCount } = results;
            this.playerCount = playerCount;
            markersArray.forEach((marker) => {
              this.mapArgs.map.addMarkers([{
                id: marker.id,
                lat: marker.lat,
                lng: marker.long,
                title: "Marker From the server",
                subtitle: "D",
                onCalloutTap: () => {
                  utils.openUrl("https://www.thepolyglotdeveloper.com");
                }
              }])
              this.markers.push({
                id: marker.id,
                lat: marker.lat,
                lng: marker.long,
                title: "Marker From the server",
                subtitle: "D",
                onCalloutTap: () => {
                  utils.openUrl("https://www.thepolyglotdeveloper.com");
                }
              })
            })
            geolocation.enableLocationRequest();
            this.checkUserMarkerLocation(this.markers);
          });
        },
        openAlertModal() {
          if (!this.warningShown) {
            this.$showModal(router.Alert, {
              props: {
                socket: this.socket
              }
            })
            this.warningShown = true;
          }
        },
        onLeaveGame(){
          this.$goto('Home');
        },
        endGame() {
          console.log("end the game now")
          this.$showModal(router.Summary, {});
        },
        checkUserMarkerLocation(markers) {
          console.log('starting location timeout..');
          let deletedMarkers = [];
          for (let key in markers) {
            let {
              lat,
              lng,
              id
            } = markers[key];
            lng = lng.toPrecision(5);
            lat = lat.toPrecision(5);

            this.timer = timerModule.setInterval(() => {
              geolocation.getCurrentLocation({
                  maximumAge: 5000,
                  timeout: 20000
                }).then(
                  (userLocation) => {
                    if (userLocation.latitude.toPrecision(5) == lat && userLocation.longitude.toPrecision(5) == lng && !deletedMarkers.includes(id)) {
                      deletedMarkers.push(id);
                      this.securedMarkers += 1;
                      this.mapArgs.map.removeMarkers([id]);
                      this.socket.emit('markerHit', {
                        id,
                        jwt,
                      })
                    }
                  })
                .catch((err) => {
                  console.error("location err in game", err);
                })
            }, 5000);
          }
        },
        onMapReady(readyEvent) {
          this.openAlertModal();
          this.mapArgs = readyEvent;
          readyEvent.map.addMarkers(this.markers);
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
              console.log('geolocation error', error);
            });
        },
      },
      data() {
        return {
          warningShown: null,
          mapBoxApi: require('../../config').MAPBOX_API,
          markers: [],
          playerCount: {},
          mapArgs: null,
          lati: "",
          lon: "",
          speed: "",
          addr: "",
          timer: null,
          securedMarkers: 0,
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