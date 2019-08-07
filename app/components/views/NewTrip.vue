<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Active Trip"></ActionBar>
        <StackLayout>
                <Mapbox
                    accessToken=process.env.MAP_ACCESS_TOKEN
                    mapStyle="traffic_day"
                    latitude="37.7397"
                    longitude="-121.4252"
                    hideCompass="true"
                    zoomLevel="12"
                    showUserLocation="false"
                    disableZoom="false"
                    disableRotation="false"
                    disableScroll="false"
                    disableTilt="false"
                    @mapReady="onMapReady($event)"
                    height=30%
                    width=*>
                </Mapbox>
                
                <RadDataForm :source="form" />
                <PickerField hint="Condition" :items="pickerItems" ref="apiPicker"></PickerField>
                
                <StackLayout orientation="horizontal">
                <Button text="View" width="50%" height="60%" backgroundColor="#5EB0E5"
                    marginTop="20" textAlignment="center" color="white"
                    fontSize="20" fontWeight="bold" borderRadius="20" @tap="onViewButtonClick(form)" />
                <Button text="Start Trip" width="50%" height="60%"
                    backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                    color="white" fontSize="20" fontWeight="bold"
                    borderRadius="20" @tap="$goto('ActiveTrip')" />
                    </StackLayout>
        </StackLayout>
    </Page>
</template>


<script>
    import * as utils from "utils/utils";
    import Vue from "nativescript-vue";
    import RadDataForm from "nativescript-ui-dataform/vue";
    import PickerField from 'nativescript-picker/vue';
    import axios from 'axios'
 
    Vue.use(PickerField);
    Vue.use(RadDataForm);

    export default {
        methods: {
            onViewButtonClick(form) {
                let picker = this.$refs.apiPicker.nativeView;
                console.log('picker', picker.selectedValue)
                console.log(form.To, form.From)
            },
            onMapReady(args) {
                args.map.addMarkers([
                    {
                        lat: 37.7397,
                        lng: -121.4252,
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
                    'Joy',
                    'Commute',
                    'Speedy'
                ],
                form: {
                    From: "X",
                    To: "Y",
                    To: "Y",
                }
            };
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