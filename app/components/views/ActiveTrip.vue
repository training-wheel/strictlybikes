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
                    height=80%
                    width=*>
                </Mapbox>
                <StackLayout orientation="horizontal">
                <Button text="End" width="50%" height="60%" backgroundColor="#5EB0E5"
                    marginTop="20" textAlignment="center" color="white"
                    fontSize="20" fontWeight="bold" borderRadius="30" @tap="$goto('Home')" />
                <Button text="Alert" width="50%" height="60%"
                    backgroundColor="#5EB0E5" marginTop="20" textAlignment="center"
                    color="white" fontSize="20" fontWeight="bold"
                    borderRadius="30" @tap="$goto('PLACEHOLDER')" />
                    </StackLayout>
        </StackLayout>
    </Page>
</template>


<script>
    import * as utils from "utils/utils";
    export default {
        data () {
            return { };
        },
        methods: {
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
        }
    };
</script>

<style scoped>

</style>