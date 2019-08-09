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
                    showUserLocation="false"
                    disableZoom="false"
                    disableRotation="false"
                    disableScroll="false"
                    disableTilt="false"
                    @mapReady="onMapReady($event)"
                    height=50%
                    width=*>
                </Mapbox>
                
                <!-- <RadDataForm :source="form" /> -->
                <PickerField hint="Radius" :items="pickerItems" ref="apiPicker"></PickerField>
                
                <StackLayout orientation="horizontal">
                <Button text="Start Game" width="100%" height="30%"
                    backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                    color="white" fontSize="20" fontWeight="bold"
                    borderRadius="20" @tap="$goto('Game')" />
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

    export default {
        methods: {
            onViewButtonClick() {
                let picker = this.$refs.apiPicker.nativeView;
                console.log('picker', picker.selectedValue)
            },
            onMapReady(args) {
                args.map.addMarkers([
                    {
                        lat: 29.9643504,
                        lng: -90.0816426,
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    },
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
            }
            
        },
        data() {
            return {
                pickerItems: [
                    15, 35, 55
                ],
                // form: {
                //     From: "X",
                //     To: "Y",
                // }
            };
        },
         mounted() {
            console.log('Nothing gets called before me!');
            
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