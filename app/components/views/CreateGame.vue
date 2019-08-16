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
                <SegmentedBar :items="segmentedBarItems" v-model="selectedBarIndex" />
                <TextField v-model="textFieldValue" hint="Name Your Game" />
                    <Button text="Create Game" width="100%" height="25%"
                    backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                    color="white" fontSize="15" fontWeight="bold"
                    borderRadius="20" @tap="handleCreateClick" />
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
            getGameInfo() {
                if (this.selectedBarIndex === 0) {
                    //Alley-Cat
                    return {
                        lat: "29.977936",
                        long: "-90.080559",
                        startTime: 20,
                        code: this.textFieldValue,
                        radius: 2,
                        markerLimit: 3,
                        timeLimit: 5 * 600000,
                        playerLimit: 2,
                    }
                    this.game = "alleycat";
                } else if (this.selectedBarIndex === 1) {
                    //Time attack
                    return {
                        lat: "29.977936",
                        long: "-90.080559",
                        startTime: 20,
                        code: this.textFieldValue,
                        radius: 1,
                        markerLimit: 10,
                        timeLimit: 5 * 600000,
                        playerLimit: 2,
                    }
                    this.game = "timeattack";
                } else {
                    return {
                        //Team Sprint
                        lat: "29.977936",
                        long: "-90.080559",
                        startTime: 20,
                        code: this.textFieldValue,
                        radius: 5,
                        markerLimit: 10,
                        timeLimit: 5 * 600000,
                        playerLimit: 4,
                    }
                    this.game = "teamsprint";
                }
            },
            handleCreateClick(){
            var socket = new SocketIO(this.baseUrl);
           
            // set game data equal to a result from a function that takes in a number corrisponding to the index of the item that was clicked
            let gameInfo = this.getGameInfo();
            // make request to server save a game to the DB (sending game info)
            axios.post(`${this.baseUrl}/createGame`, gameInfo, {
                headers: {
                jwt: this.jwt,
                }
            })
            .then((result) => {
                socket.connect();
                socket.on('connect', () => {
                    socket.emit('joinGame', {
                        userId: result.data.userId,
                        room: this.textFieldValue,
                        jwt: this.jwt,
                        });
                });
                socket.on('join', (response) => {
                    console.log('response', response);
                    this.$goto('Game', {
                        props: {
                            socket: socket,
                            room: this.textFieldValue,
                            gameMode: this.gameMode,
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

                        console.log('longitude', this.lon);
                        console.log('latitude', this.lati);
                    })
                    .catch((error) => {
                        console.log('geolocation error', error);
                    });
            },
        },
    created() {
    this.getLocation();
    },
        data() {
            return {
                segmentedBarItems: (function() {
                    var segmentedBarModule = require(
                        "tns-core-modules/ui/segmented-bar");
                    let segmentedBarItem1 = new segmentedBarModule.SegmentedBarItem();
                    segmentedBarItem1.title = "Alley Cat";
                    let segmentedBarItem2 = new segmentedBarModule.SegmentedBarItem();
                    segmentedBarItem2.title = "Time Attack";
                    let segmentedBarItem3 = new segmentedBarModule.SegmentedBarItem();
                    segmentedBarItem3.title = "Team Sprint";
                    return [
                        segmentedBarItem1,
                        segmentedBarItem2,
                        segmentedBarItem3
                    ];
                })(),
                lati: "",
                lon: "",
                speed: "",
                addr: "",
                textFieldValue: "",
                jwt: appSettings.getString('jwt'),
                baseUrl: require('../../config').SERVER_BASE_URL,
                mapBoxApi: require('../../config').MAPBOX_API,
                selectedBarIndex: 0,
                gameMode: "",
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