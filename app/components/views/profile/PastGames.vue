// <template>
//   <ScrollView height="40%" orientation="horizontal">
//     <Mapbox
//       :accessToken="mapBoxApi"
//       mapStyle="traffic_day"
//       latitude="29.9643504"
//       longitude="-90.0816426"
//       showUserLocation="true"
//       zoomLevel="9"
//       @mapReady="onMapReady($events)"
//       height=50%
//       width=*>
//       </Mapbox>
//   </ScrollView>
// </template>

// <script>
//   export default {

//     props: {
//       gameMarkers: {
//         type: Array,
//       },

//       gameInfo: {
//         type: Array,
//       },
//     },
//     name: "PastGames",
//     methods: {
//       check: function() {
//         console.log(this.gameMarkers[0]);
//       },
//       onMapReady(readyEvent) {

//       },
//     },
//     data() {
//       return {
//         mapboxApi: require('../../../config').MAPBOX_API,
        
//       }
//     },
//   }
// </script>

// <style lang="scss" scoped>

// </style>