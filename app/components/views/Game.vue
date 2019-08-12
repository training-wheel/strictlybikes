<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Game"></ActionBar>
        <StackLayout>
                <Mapbox
                    :accessToken="mapBoxApi"
                    mapStyle="traffic_day"
                    latitude="29.9643504"
                    longitude="-90.0816426"
                    showUserLocation="true"
                    zoomLevel="9"
                    @mapReady="onMapReady($event)"
                    height=80%
                    width=*>
                </Mapbox>

                <StackLayout orientation="horizontal">

                    <Button text="End" width="100%" height="60%" backgroundColor="#5EB0E5"
                        marginTop="10" textAlignment="center" color="white"
                        fontSize="20" fontWeight="bold" borderRadius="20" @tap="onDirectionCall()" />
                </StackLayout>
        </StackLayout>
    </Page>
</template>


<script>
    import * as utils from "utils/utils";
    import Vue from "nativescript-vue";
    import axios from 'axios';
    import router from '../../router'
    const geolocation = require("nativescript-geolocation");
    const {Accuracy} = require("tns-core-modules/ui/enums");
    const timerModule = require("tns-core-modules/timer");

    export default {
        mounted() {
            console.log('mounted')
        },
        created(){
            this.playing();
        },
        props: ['socket'],

        methods: {
            playing(){
                if(this.socket){
                    this.socket.on('playing', (message) => {
                        console.log(message);
                    });
                }
            },
            openAlertModal(){
                if(!this.warningShown){
                    this.$showModal(router.Alert, {props: {socket: this.socket}})
                    this.warningShown = true;
                    timerModule.setTimeout(() => {
                    this.endGame();
                    }, 10000);
                }
            },
            endGame(){
                // this.$model.close(router.Alert);
            },
            checkUserMarkerLocation(markers) {
                for(let key in markers) {
                let {lat, lng, id} = markers[key];
                lng = lng.toPrecision(7);
                lat = lat.toPrecision(7);

                this.timer = timerModule.setInterval(() => {
					//use setinterval to constantly check users location against marker location
                    this.mapArgs.map.getUserLocation().then(
                        (userLocation) => {
                            console.log("Current user location: " +  userLocation.location.lat + ", " + userLocation.location.lng);
                            console.log("Current user speed: " +  userLocation.speed);
                            if(userLocation.location.lat.toPrecision(7) === lat && userLocation.location.lng.toPrecision(7) === lng) {
                                this.mapArgs.map.removeMarkers([id]);
                                console.log(id);
                                console.log('User location is near marker');
                            } else {
                                console.log('User location is not near marker');
                            }
                    })
                }, 5000);
                }
            },
            onMapReady(readyEvent) {
                this.openAlertModal();
                this.mapArgs = readyEvent;
                readyEvent.map.addMarkers(this.markers);
                this.checkUserMarkerLocation(this.markers);
            },
            getLocation() {
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

                        console.log('longitude', this.lon);
                        console.log('latitude', this.lati);
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
                markers: [
                    {
                        id: 1,
                        lat: 29.96435,
                        lng: -90.082643,
                        title: "Current Point",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }

                    },
                ],
                mapArgs: null,
                pickerItems: [
                    15, 35, 55
                ],
                lati: "",
                lon: "",
                speed: "",
                addr: ""
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