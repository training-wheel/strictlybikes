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
                
                <!-- <RadDataForm :source="form" /> -->
                <PickerField hint="Radius" :items="pickerItems" ref="apiPicker"></PickerField>
                
                <StackLayout orientation="horizontal">
                    <Button text="Create Game" width="100%" height="30%"
                    backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                    color="white" fontSize="20" fontWeight="bold"
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
    
    Vue.use(PickerField);
    Vue.use(RadDataForm);

    const geolocation = require("nativescript-geolocation");
    const {Accuracy} = require("tns-core-modules/ui/enums");

    export default {
        methods: {
            handleCreateClick(){
            var testSocket = new SocketIO('https://2fa9f776.ngrok.io');
            let userTypedInCode = 'game1'
            // get game data
            let gameInfo = {
                lat: "90",
                long: "90",
                markerLimit: 3,
                playerLimit: 2,
                timeLimit: 100,
                startTime: 20,
                code: userTypedInCode,
            }
            // make request to server save a game to the DB (sending game info)
            axios.post('https://2fa9f776.ngrok.io/createGame', gameInfo)
            .then((result) => {
                testSocket.connect();
                testSocket.on('connect', () => {
                    testSocket.emit('joinGame', {
                        userId: result.data.userId,
                        room: userTypedInCode,
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
                    // {
                    //     lat: 29.9643504,
                    //     lng: -90.0816426,
                    //     title: "Tracy, CA",
                    //     subtitle: "Home of The Polyglot Developer!",
                    //     onCalloutTap: () => {
                    //         utils.openUrl("https://www.thepolyglotdeveloper.com");
                    //     }
                    // },
                    {
                        lat: 30.0146884,
                        lng: -90.0577187, 
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    },
                    {
                        lat: 29.6643504,
                        lng: -90.0816426,
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    },
                    {
                        lat: 30.0643504,
                        lng: -90.0816426,
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    }
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
                            mode: "FOLLOW", // "NONE" | "FOLLOW" | "FOLLOW_WITH_HEADING" | "FOLLOW_WITH_COURSE"
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
                addr: ""
            };
        },
        mounted() {
            console.log('mounted')
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