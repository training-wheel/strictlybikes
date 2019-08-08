<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Game"></ActionBar>
        <StackLayout>
                <Mapbox
                    accessToken=process.env.MAP_ACCESS_TOKEN
                    mapStyle="traffic_day"
                    latitude="29.9643504"
                    longitude="-90.0816426"
                    hideCompass="true"
                    zoomLevel="12"
                    showUserLocation="false"
                    disableZoom="false"
                    disableRotation="false"
                    disableScroll="false"
                    disableTilt="false"
                    @mapReady="onMapReady($event)"
                    height=80%
                    width=*>
                </Mapbox>
                <StackLayout orientation="horizontal">
                <Button text="End" width="50%" height="60%" backgroundColor="#5EB0E5"
                    marginTop="10" textAlignment="center" color="white"
                    fontSize="20" fontWeight="bold" borderRadius="20" @tap="onDirectionCall()" />
                <Button text="Alert" width="50%" height="60%"
                    backgroundColor="#5EB0E5" marginTop="10" textAlignment="center"
                    color="white" fontSize="20" fontWeight="bold"
                    borderRadius="20" @tap="$goto('PLACEHOLDER')" />
                    </StackLayout>
        </StackLayout>
    </Page>
</template>


<script>
    var mapbox = require("nativescript-mapbox");
    import * as utils from "utils/utils";
    import axios from 'axios';
    export default {
        data () {
            return { };
        },
        methods: {
            onMapReady(args) {
              // console.log('args', args);
                args.map.addMarkers([
                    {
                        lat: 29.9643504,
                        lng: -90.0916426,
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    },
                ]);
            },
            onDirectionCall() {
              console.log('mapbox', mapbox.Mapbox.addMarkers);
          }
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