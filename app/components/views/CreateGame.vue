
<template>
  <Page class="page" id="homeBackground">
    <ActionBar class="action-bar" title="Create Game"></ActionBar>
    <StackLayout>
      <Mapbox
        :accessToken="mapBoxApi"
        mapStyle="traffic_day"
        showUserLocation="true"
        zoomLevel="13"
        @mapReady="onMapReady($event)"
        height="50%"
        width="*"
      ></Mapbox>
      <DockLayout>
        <SegmentedBar
          :items="segmentedBarItems"
          v-model="selectedBarIndex"
          dock="center"
          width="90%"
        />
      </DockLayout>
      <TextField v-model="textFieldValue" hint="Name Your Game" class="text-field" width="85%" />
      <Button
        text="Create Game"
        width="60%"
        height="15%"
        backgroundColor="#ff9933"
        marginTop="20"
        textAlignment="center"
        color="white"
        fontSize="22"
        fontWeight="bold"
        borderRadius="20"
        @tap="handleCreateClick"
      />
    </StackLayout>
  </Page>
</template>


<script>
import * as utils from "utils/utils";
import Vue from "nativescript-vue";
import RadDataForm from "nativescript-ui-dataform/vue";
import PickerField from "nativescript-picker/vue";
import { SocketIO } from "nativescript-socketio";
import axios from "axios";
import * as appSettings from "tns-core-modules/application-settings";
var timerModule = require("tns-core-modules/timer");
var geolocation = require("nativescript-geolocation");
const { Accuracy } = require("tns-core-modules/ui/enums");

Vue.use(PickerField);
Vue.use(RadDataForm);

/**
 * Class that contains all the methods and variables of CreateGame view
 * @class
 * @name CreateGame
 *
 */

export default {
    props: ['profileName'],

  methods: {
    /**
     * Acquires the gamemode and options when a gamemode is selected
     * @name getGameInfo
     *
     */
    getGameInfo() {
      if (this.selectedBarIndex === 0) {
        //Alley-Cat
        this.gameMode = "alleycat";
        return {
          lat: "29.977936",
          long: "-90.080559",
          startTime: 20,
          code: this.textFieldValue,
          radius: 1,
          markerLimit: 3,
          timeLimit: 60 * 60,
          playerLimit: 2,
          mode: "alleycat"
        };
      } else if (this.selectedBarIndex === 1) {
        //Time attack
        this.gameMode = "timeattack";
        return {
          lat: "29.977936",
          long: "-90.080559",
          startTime: 20,
          code: this.textFieldValue,
          radius: 1,
          markerLimit: 15,
          timeLimit: 60 * 15,
          playerLimit: 1,
          mode: "timeattack"
        };
      } else {
        this.gameMode = "teamsprint";
        return {
          //Team Sprint
          lat: "29.977936",
          long: "-90.080559",
          startTime: 20,
          code: this.textFieldValue,
          radius: 1,
          markerLimit: 10,
          timeLimit: 60 * 30,
          playerLimit: 2,
          mode: "teamsprint"
        };
      }
    },

    /**
     * On the click of Create Game, Socket.io creates a room for players in the server
     * then connects the creator to the new game instance and routes to
     * the Game view
     */

    handleCreateClick() {
      var socket = new SocketIO(this.baseUrl);
      let gameInfo = this.getGameInfo();
      axios.post(`${this.baseUrl}/createGame`, gameInfo, {
          headers: {
            jwt: this.jwt
          }
        })
        .then(result => {
          socket.connect();
          socket.on("connect", () => {
            socket.emit("joinGame", {
              userId: result.data.userId,
              room: this.textFieldValue,
              jwt: this.jwt
            });
          });
          socket.on("join", response => {
            this.$goto("Game", {
              props: {
                socket: socket,
                room: this.textFieldValue,
                gameMode: this.gameMode,
                gameLength: gameInfo.timeLimit,
                gameInfo: gameInfo,
                profileName: this.profileName,
              }
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    onViewButtonClick() {
      let picker = this.$refs.apiPicker.nativeView;
    },

    /**
     * onMapReady is a Mapbox function triggered on the mapReady listener
     * any events/functions that need to be passed when the map loads is inserted here
     * @name onMapReady
     * @param {Object} readyEvent The event instance when the map loads that is passed in.
     * readyEvent gives access to the map options and methods.
     */
    onMapReady(readyEvent) {
      this.mapArgs = readyEvent;
      this.checkLocation();
    },

    checkLocation() {
      if (geolocation.isEnabled()) {
        this.getLocation();
      } else {
        geolocation
          .enableLocationRequest(true)
          .then(() => {
            this.getLocation();
          })
          .catch(err => {
            console.error(`Failed to enable location: ${err}`);
          });
      }
    },

    /**
     * getLocation calls the device native location request and saves that
     * location to the state as well as the current speed.
     * @name getLocation
     *
     */
    getLocation() {
      return geolocation
        .getCurrentLocation({
          maximumAge: 5000,
          timeout: 20000,
          desiredAccuracy: Accuracy.high,
        })
        .then(res => {
          const { latitude, longitude } = res;
          this.mapArgs.map.addMarkers([{
            id: 1,
            lat: latitude,
            lng: longitude,
            iconPath: 'assets/images/usermarker.png',
          }]);
          this.mapArgs.map.setCenter({ lat: Number(latitude), lng: Number(longitude) });
          this.mapArgs.map.setZoomLevel({
            level: 13,
            animated: true,
          });
        })
        .catch(error => {
          console.error("geolocation error", error);
        });
    }
  },
  /**
   * Holds all view-specific variables
   * @type {function}
   */
  data() {
    return {
      /**
       * Returns a list of gamemodes for the segmented bar
       * @type {function}
       * @name segmentedBarItems
       * @returns {Array} List of all gamemodes
       */
      segmentedBarItems: (function() {
        var segmentedBarModule = require("tns-core-modules/ui/segmented-bar");
        let segmentedBarItem1 = new segmentedBarModule.SegmentedBarItem();
        segmentedBarItem1.title = "Alley Cat";
        let segmentedBarItem2 = new segmentedBarModule.SegmentedBarItem();
        segmentedBarItem2.title = "Time Attack";
        let segmentedBarItem3 = new segmentedBarModule.SegmentedBarItem();
        segmentedBarItem3.title = "Team Sprint";
        return [segmentedBarItem1, segmentedBarItem2, segmentedBarItem3];
      })(),
      /**
       * Holds value of text field to name the game lobby
       * @type {String}
       */
      textFieldValue: "",
      /**
       * JSON Web Token used for user Authentification. Read from appSettings.
       * @type {String}
       */
      jwt: appSettings.getString("jwt"),
      /**
       * Base URL. Defined in config file as SERVER_BASE_URL
       * @type {String}
       */
      baseUrl: require("../../config").SERVER_BASE_URL,
      /**
       * Mapbox API key. Required for map to render properly. In config as
       * MAPBOX_API
       * @type {String}
       */
      mapBoxApi: require("../../config").MAPBOX_API,
      /**
       * Keeps track of the game mode selected on create game.
       * @type {Number}
       */
      selectedBarIndex: 0,
      /**
       * Marked on selecting a bar index
       * @type {String}
       */
      gameMode: "",
      mapArgs: {},
    };
  }
};
</script>

<style scoped>
.text-field {
  placeholder-color: white;
  color: white;
  text-color: white;
}

segmented-bar {
  selected-background-color: #ff9933;
  font-size: 15;
  color: white;
  font-weight: bold;
}

.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}
</style>