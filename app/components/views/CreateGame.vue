<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Create Game"></ActionBar>
        <StackLayout>
                <Mapbox
                    accessToken=process.env.MAP_ACCESS_TOKEN
                    mapStyle="traffic_day"
                    latitude="29.9643504"
                    longitude="-90.0816426"
                    hideCompass="true"
                    zoomLevel="12"
                    showUserLocation="true"
                    disableZoom="false"
                    disableRotation="true"
                    disableScroll="false"
                    disableTilt="false"
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
    import { Mapbox } from "nativescript-mapbox";
    import * as utils from "utils/utils";
    import Vue from "nativescript-vue";
    import RadDataForm from "nativescript-ui-dataform/vue";
    import PickerField from 'nativescript-picker/vue';
    import { SocketIO } from 'nativescript-socketio';
    import axios from 'axios'
    
    Vue.use(PickerField);
    Vue.use(RadDataForm);

    const geolocation = require("nativescript-geolocation");
    const {
        Accuracy
    } = require("tns-core-modules/ui/enums");

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
            getLocation() {
                geolocation
                    .getCurrentLocation({
                        desiredAccuracy: Accuracy.high,
                        maximumAge: 5000,
                        timeout: 20000
                    })
                    .then(res => {
                        this.lat = res.latitude;
                        this.lon = res.longitude;
                        this.speed = res.speed;
                        // get the address (REQUIRES YOUR OWN GOOGLE MAP API KEY!)
                        fetch(
                                "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                                res.latitude +
                                "," +
                                res.longitude +
                                "&key=GOOGLE_API_KEY"
                            )
                            .then(response => response.json())
                            .then(r => {
                                this.addr = r.results[0].formatted_address;
                            });
                    });
            },
            onMapReady(args) {
                this.mapArgs = args;
                args.map.addMarkers([
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
                lat: "",
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