<template>
  <Page class="page">
    <FlexboxLayout height="98%" flexDirection="column">
      <StackLayout>
        <Label :text="username + '\'s Profile'" flexGrow=".3" fontSize="30" color="#000000" fontWeight="bold" horizontalAlignment="center" />
        <Image :src="imageUrl" height="20%" width="auto" />
        <Label text="Badges" fontSize="30" color="black" />
        <Badges backgroundColor="#0F62AB" />
        <PastGames />
      </StackLayout>
  
    </FlexboxLayout>
  </Page>
</template>

<script>
  import Badges from "./Badges";
  import PastGames from "./PastGames";
  import axios from 'axios';
  import * as appSettings from 'tns-core-modules/application-settings';

  export default {
    name: "Profile",

    components: {
      Badges,
      PastGames
    },
    methods: {
      name() {
        
      }
    },
    data() {
      return {
        baseUrl: require('../../../config').SERVER_BASE_URL,
        username: '',
        imageUrl: '',
        userMetrics: [],
        userBadges: [],
      }
    },
    mounted() {
      const token = appSettings.getString('jwt');
      axios.get(`${this.baseUrl}/profile`, {
        headers: {
          jwt: token,
        }
      })
        .then((result) => {
          const { username, imageUrl, userMetrics, userBadges } = result.data;
          this.username = username;
          this.imageUrl = imageUrl;
          this.userMetrics = userMetrics;
          this.userBadges = userBadges;
        })
        .catch((err) => {
          console.error(`Failed to fetch profile: ${err}`);
        });
    }
  }
</script>

<style lang="scss" scoped>

</style>