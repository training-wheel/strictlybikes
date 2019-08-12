<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Create Game"></ActionBar>
        <StackLayout>
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
    var timerModule = require("tns-core-modules/timer");
    var geolocation = require("nativescript-geolocation");
    const {Accuracy} = require("tns-core-modules/ui/enums");
    
    Vue.use(PickerField);
    Vue.use(RadDataForm);


    export default {
        methods: {
            handleCreateClick(){
                console.log(appSettings);
            var testSocket = new SocketIO(this.baseUrl);
            let picker = this.$refs.apiPicker.nativeView;
            // get game data
            let gameInfo = {
                lat: "90",
                long: "30",
                markerLimit: 3,
                playerLimit: 2,
                timeLimit: 100,
                startTime: 20,
                code: this.textFieldValue,
                radius: picker.selectedValue,
            }
            // make request to server save a game to the DB (sending game info)
            axios.post(`${this.baseUrl}/createGame`, gameInfo, {
                headers: {
                jwt: this.jwt,
                }
            })
            .then((result) => {
                testSocket.connect();
                testSocket.on('connect', () => {
                    testSocket.emit('joinGame', {
                        userId: result.data.userId,
                        room: this.textFieldValue,
                        jwt: this.jwt,
                        });
                });
                testSocket.on('join', (response) => {
                    console.log(response);
                    this.$goto('Game', {
                        props: {
                            socket: this.socket,
                        }
                    });
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
                readyEvent.map.addMarkers(this.markers);

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
            onMapReady(args) {
                this.mapArgs = args;
            }
        },
    mounted() {
    geolocation.enableLocationRequest();
    this.getLocation();
    },
        data() {
            return {
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
                    {
                        id: 2,
                        lat: 30.014688,
                        lng: -90.057719, 
                        title: "Point 1",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    },
                    {
                        id: 3,
                        lat: 29.66435,
                        lng: -90.081643,
                        title: "Point 2",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    },
                    {
                        id: 4,
                        lat: 30.06435,
                        lng: -90.081643,
                        title: "Point 3",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    }
                ],
                mapArgs: null,
                pickerItems: [
                    1, 3, 5
                ],
                lati: "",
                lon: "",
                speed: "",
                addr: "",
                textFieldValue: "",
                jwt: appSettings.getString('jwt'),
                baseUrl: require('../../config').SERVER_BASE_URL,
                mapBoxApi: require('../../config').MAPBOX_API,
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