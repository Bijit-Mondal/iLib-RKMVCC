<template>
  <div id="app">
    <div style="margin-bottom:60px">
      <NavBar/>
    </div>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from './components/Header.vue'
import Footer from './components/Footer.vue'
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/functions'
// import 'firebase/compat/firestore'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  data: () => ({
      color:process.env.VUE_APP_BTN_COLOR,
      loading : ''
      }),
  methods:{
    loader(type){
      this.loading = this.$vs.loading({
      type,
      color: this.color,
       })
    },
    close_loader(){
      document.onreadystatechange = () => {
        if (document.readyState == "complete") {
          this.loading.close();
        }
      }
    },
    loaderroute(type){
      const loading = this.$vs.loading({type, color:this.color})
      setTimeout(() => {
          loading.close()
      }, 1000)
    },

  },
  watch:{
    $route (){
      this.loaderroute('waves');
    }
  },
  created(){
    this.loader('waves');
  },
  mounted(){
    this.close_loader();
    // const auth = firebase.auth();
    // auth.useEmulator("http://localhost:9099");
    // let storage = firebase.storage();
    // storage.useEmulator("localhost", 9199)
    // firebase.functions().useEmulator("localhost", 5001);
    // firebase.firestore().useEmulator("localhost", 8008);
  }
}
</script>

<style scoped>
@media screen and (min-width: 990px) {
  #app {
    padding-left:257px;
  }
}
@import './styles/main.css';
</style>
