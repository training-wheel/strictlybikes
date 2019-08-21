<template>
  <StackLayout>
    <Carousel v-if="gameStats.length > 0" @pageChanged="changeGameEvent" height="15%"
      android:indicatorAnimation="slide" indicatorColor="white" indicatorOffset="0, -10" showIndicator="true" >
      <CarouselItem v-for="(game, i) in gameStats" :key="i" verticalAlignment="middle" >
        <FlexboxLayout justifyContent="space-around">
          <Label :text="`${game.info.code}`" />
          <Label :text="`${game.info.mode} race`" />
          <Label :text="` with ${game.info.markerLimit} Checkpoints`" />
        </FlexboxLayout>
      </CarouselItem >
    </Carousel>
    <Mapbox
      :accessToken="mapBoxApi" 
      mapStyle="traffic_day"
      showUserLocation="true"
      @mapReady="onMapReady($event)"
      height=*
      width=*>
    </Mapbox>
  </StackLayout>
</template>

<script>
  import carousel from 'nativescript-carousel';
  import polyline from '@mapbox/polyline';
  const mapBoxApi = require('../../../config').MAPBOX_API;

  export default {
    name: 'PastGamesMap',
    props: {
      gameStats: Array,
    },
    watch: {
      async gameStats(to) {
        await this.$nextTick()
        this.$refs.myCarousel.nativeView.refresh();
      }
    },
    data() {
      return {
        mapArgs: null,
        currentGame: 0,
        selectedUser: '',
        mapBoxApi,
      }
    },
    methods: {
      onMapReady(eventList) {
        const markerList = [];
        const { lat, long } = this.gameStats[this.currentGame].info;
        this.gameStats[this.currentGame].markers.forEach((marker) => {
          const indiv = {lat: marker.lat, lng: marker.long, id: marker.id};
          markerList.push(indiv);
        })
        this.mapArgs = eventList;
        eventList.map.setCenter({ lat: Number(lat), lng: Number(long) });
        eventList.map.setZoomLevel({
          level: 13,
          animated: true,
        });
        eventList.map.addMarkers(
          markerList,
        );
        this.chooseUser(this.username);
      },
      chooseUser(selectedUser) {
        this.selectedUser = selectedUser;
        this.mapArgs.map.removePolylines();
        this.gameStats[this.currentGame].info.players.forEach((player) => {
          if (player.username === selectedUser) {
            const decodedPolyline = polyline.decode(player.polyline);
            const formattedPolyline = decodedPolyline.map((coord) => {
              const [lat, lng] = coord
              const coordObject = { lat, lng };
              return coordObject;
            });
            this.mapArgs.map.addPolyline({
              width: 3,
              color: 'orange',
              points: formattedPolyline,
            });
          }
        });
      },
      changeGameEvent(event) {
        const { index } = event;
        this.currentGame = index;
        this.mapArgs.map.removeMarkers();
        this.onMapReady(this.mapArgs);
      },
    },
  }
</script>

<style scoped>

</style>
