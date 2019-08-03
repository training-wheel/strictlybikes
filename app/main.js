import Vue from 'nativescript-vue'
import Home from './components/views/Home'
import store from './store';

import VueDevtools from 'nativescript-vue-devtools'
//import for the favicons
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './font-awesome.css',
  'ion': './ionicons.css'
};
TNSFontIcon.loadCss(); 

Vue.filter('fonticon', fonticon);
// end of favicon code

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(Home)])
}).$start()
