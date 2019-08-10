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
                    <Button text="End" width="100%" height="60%" backgroundColor="#5EB0E5"
                        marginTop="10" textAlignment="center" color="white"
                        fontSize="20" fontWeight="bold" borderRadius="20" @tap="onDirectionCall()" />
                </StackLayout>
        </StackLayout>
    </Page>
</template>


<script>
    var mapbox = require("nativescript-mapbox");
    import * as utils from "utils/utils";
    import axios from 'axios';
    import router from '../../router'
    export default {
        data () {
            return { };
        },
        props: ['socket'],

        methods: {
            openModal(){
                console.log("hit p2")
                this.$showModal(router.Alert, {})
            },
            onMapReady(args) {
            this.openModal();
              // console.log('args', args);
                args.map.addMarkers([
                    {
                     
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