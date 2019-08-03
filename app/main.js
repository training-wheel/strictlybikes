import Vue from 'nativescript-vue'
import store from './store';
import VueDevtools from 'nativescript-vue-devtools'
import router from './router'
//router function
Vue.prototype.$router = router
Vue.prototype.$goto = function (to, options) {
  var options = options || { 
    clearHistory: false, 
    backstackVisible: true, 
    transition: { 
        name: "slide",
        duration: 380,
        curve: "easeIn"
    }
  } 
    this.$navigateTo(this.$router[to])
}

//import for the favicons
// import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

// TNSFontIcon.debug = true;
// TNSFontIcon.paths = {
//   'fa': './font-awesome.css',
//   'ion': './ionicons.css'
// };
// TNSFontIcon.loadCss(); 

// Vue.filter('fonticon', fonticon);
// end of favicon code

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({ 
  render: h => h('frame', [h(router['Home'])])
}).$start()