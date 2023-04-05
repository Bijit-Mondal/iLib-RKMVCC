import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'material-icons/iconfont/material-icons.css'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import './registerServiceWorker'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
require('dotenv').config();

Vue.use(Vuesax,{
  colors:{
      primary:'#ffd534',
      myWarn:'#FFDB58'
    //   primary:'#4c00b0',
    //   warn:'#4c00b0'
  }
})

Vue.config.productionTip = false

let firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_measurementId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 new Vue({
        router,
        render: h => h(App)
      }).$mount('#app')
