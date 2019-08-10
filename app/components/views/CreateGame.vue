<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Create Game"></ActionBar>
        <StackLayout>
            
                <Mapbox
                    accessToken=process.env.MAP_ACCESS_TOKEN
                    mapStyle="traffic_day"
                    latitude="29.9643504"
                    longitude="-90.0816426"
                    showUserLocation="true"
                    zoomLevel="12"
                    @mapReady="onMapReady($event)"
                    height=50%
                    width=*>
                </Mapbox>
                <TextField v-model="textFieldValue" hint="Name Your Game" />
                <!-- <RadDataForm :source="form" /> -->
                <PickerField hint="Radius" :items="pickerItems" ref="apiPicker"></PickerField>
                <StackLayout orientation="horizontal">
                    <Button text="Create Game" width="100%" height="25%"
                    backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                    color="white" fontSize="15" fontWeight="bold"
                    borderRadius="20" @tap="handleCreateClick" />
                </StackLayout>
        </StackLayout>
    </Page>
</template>


<script>
    import * as utils from "utils/utils";
    import Vue from "nativescript-vue";
    import RadDataForm from "nativescript-ui-dataform/vue";
    import PickerField from 'nativescript-picker/vue';
    import { SocketIO } from 'nativescript-socketio';
    import axios from 'axios'
    import * as appSettings from 'tns-core-modules/application-settings';
    const jwt = appSettings.getString('jwt');
    var timerModule = require("tns-core-modules/timer");
    var geolocation = require("nativescript-geolocation");
    geolocation.enableLocationRequest();
    
    Vue.use(PickerField);
    Vue.use(RadDataForm);

    const geolocation = require("nativescript-geolocation");
    const {Accuracy} = require("tns-core-modules/ui/enums");

    export default {
        methods: {
            handleCreateClick(){
            var testSocket = new SocketIO('https://2651945d.ngrok.io');
            // get game data
            let gameInfo = {
                lat: "90",
                long: "90",
                markerLimit: 3,
                playerLimit: 2,
                timeLimit: 100,
                startTime: 20,
                code: this.textFieldValue,
            }
            // make request to server save a game to the DB (sending game info)
            console.log("token::::::: ", jwt);
            axios.post('https://2651945d.ngrok.io/createGame', gameInfo, {
                headers: {
                jwt,
                }
            })
            .then((result) => {
                testSocket.connect();
                testSocket.on('connect', () => {
                    testSocket.emit('joinGame', {
                        userId: result.data.userId,
                        room: this.textFieldValue,
                        jwt,
                        });
                });
                testSocket.on('join', (response) => {
                    console.log(response);
                })
            })
            .catch((err)=>{
                console.error(err);
            })
        },
            onViewButtonClick() {
                let picker = this.$refs.apiPicker.nativeView;
                console.log('picker', picker.selectedValue)
            },
            onMapReady(readyEvent) {
                this.mapArgs = readyEvent;
                readyEvent.map.addMarkers([
                    {
                        lat: 30.0146884,
                        lng: -90.0577187, 
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    },
                    
                ]);
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

                       this.mapArgs.map.trackUser({
                        // "NONE" | "FOLLOW" | "FOLLOW_WITH_HEADING" | "FOLLOW_WITH_COURSE"

                            mode: "FOLLOW", 
                            animated: true
                        });
                        // get the address (REQUIRES YOUR OWN GOOGLE MAP API KEY!)
                        fetch(
                                "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                                res.latitude +
                                "," +
                                res.longitude +
                                "&key=AIzaSyBs6LSqUOFPrr9P4GCvw1NIbA2y0zVZl8k"
                            )
                            .then(response => response.json())
                            .then(r => {
                                this.addr = r.results[0].formatted_address;
                        });
                    })
                    .catch((error) => {
                        console.log('geolocation error', error);
                    });
            },
            onMapReady(args) {
                this.mapArgs = args;
            }
        },
        mounted() {
        geolocation.enableLocationRequest();
    },
        data() {
            return {
                mapArgs: null,
                pickerItems: [
                    15, 35, 55
                ],
                lati: "",
                lon: "",
                speed: "",
                addr: "",
                textFieldValue: "",
            };
        },
        mounted() {
        geolocation.enableLocationRequest();
        }
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