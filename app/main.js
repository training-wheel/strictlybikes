import Vue from 'nativescript-vue';
import VueDevtools from 'nativescript-vue-devtools';
import * as appSettings from 'tns-core-modules/application-settings';
import store from './store';
import router from './router';
import { configureOAuthProviders } from './auth/auth-service';

configureOAuthProviders();

// router function
Vue.prototype.$router = router;
Vue.registerElement('Mapbox', () => require('nativescript-mapbox').MapboxView);
Vue.prototype.$goto = (to, options) => {
  const that = Vue.prototype;
  options = options || {
    clearHistory: false,
    backstackVisible: true,
    transition: {
      name: 'slide',
      duration: 380,
      curve: 'easeIn',
    },
  };
  that.$navigateTo(that.$router[to]);
};

// import for the favicons
// import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

// TNSFontIcon.debug = true;
// TNSFontIcon.paths = {
//   'fa': './font-awesome.css',
//   'ion': './ionicons.css'
// };
// TNSFontIcon.loadCss();

// Vue.filter('fonticon', fonticon);
// end of favicon code

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

const isLoggedIn = appSettings.hasKey('jwt');
const authRoute = isLoggedIn ? router.Home : router.Login;

new Vue({
  render: h => h('frame', [h(authRoute)]),
}).$start();
