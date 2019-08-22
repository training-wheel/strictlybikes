<template>
  <StackLayout>
    <GridLayout height="10%">
      <Carousel v-if="gameStats.length > 0" @pageChanged="changeGameEvent"
        android:indicatorAnimation="drop" indicatorColor="white" indicatorOffset="0, 10" showIndicator="true" >
        <CarouselItem v-for="(game, i) in gameStats" :key="i" verticalAlignment="middle" >
          <Label horizontalAlignment="center"
            :text="`${game.info.code}: ${game.info.mode} race with ${markersHit} / ${game.info.markerLimit} hits`"
          />
        </CarouselItem >
      </Carousel>
    </GridLayout>
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
        markersHit: 0,
        mapBoxApi,
      }
    },
    methods: {
      onMapReady(eventList) {
        const markerList = [];
        const { lat, long } = this.gameStats[this.currentGame].info;
        const iconPath = 'assets/images/checkpoints.png';
        this.gameStats[this.currentGame].markers.forEach((marker) => {
          const { lat, long: lng, id } = marker
          const indiv = {lat: lat, lng: long, id: id, iconPath};
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
            this.markersHit = player.markerCount;
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
