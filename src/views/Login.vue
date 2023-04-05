<template>
  <div class="login" style="padding-bottom:40px;">
    <h2 class="center-heading color comfortaa" >Login to Your Account</h2>
    <h4 class="center-heading color Island">Welcome to the infinity of knowledge</h4>
    <div class="center content-inputs">

      <vs-alert v-model="error" color="danger" style="margin-bottom:20px;">
        <template #title>
          Error
        </template>
       {{error_message}}
      </vs-alert>

      <vs-alert v-model="success" color="success" style="margin-bottom:20px;">
        <template #title>
          Success
        </template>
       {{success_message}}
      </vs-alert>


      <vs-input style="align-items:center" state="warn" warn v-model="email" class="color comfortaa"  autocomplete=false placeholder="Enter Your Email Id  ">
        <template #icon>
           <span class="material-icons-outlined">account_circle</span>
        </template>
      </vs-input>

      <vs-input type="password" state="warn" icon-after style="align-items:center; padding-top:20px;" warn v-model="pin"  autocomplete=false class="color comfortaa" placeholder="Enter Your Secret Pin">
        <template #icon>
           <span class="material-icons-outlined">lock</span>
        </template>
      </vs-input>

      <vs-row :w="mainw">
        <vs-col :w="x">

        </vs-col>
        <vs-col :w="w">
           <vs-checkbox class="color comfortaa" style="text-align:center; vertical-align:middle; padding-top:20px;" warn gradient v-model="terms">
            <h5>I agree to all the terms & condition</h5>
           </vs-checkbox>
        </vs-col>
        <vs-col :w="y">

        </vs-col>
      </vs-row>

    </div>
    <div style="padding-top:40px;padding-bottom:20px">
     <vs-button @click="login" warn gradient :active="active == 3" style="jusitfy-items:center;" class="comfortaa btn_center"> Login &nbsp; <img src="../assets/arrow_forward_white_18dp.svg"> </vs-button>
    </div>
     <vs-button
        transparent
        :active="active == 1"
        @click="active = 1"
        style="jusitfy-items:center;"
        class="comfortaa btn_center"
        to="/register"
      >
        Register for a new account
      </vs-button>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
export default{
  data: () => ({
    mainw:12,
    email:'',
    terms:false,
    active:0,
    pin:'',
    error:0,
    error_message:'',
    success_message:'',
    success:0,
    w: 8,
    x:3,
    y:1,
    windowWidth: 721,
    time:3000,
    progress:0,
  }),
  methods:{
    width(){
     this.windowWidth = window.innerWidth;
     if(this.windowWidth>990){
        this.x=5;
        this.w=4;
        this.y=3;
     }
    },
    login(){
      if(this.terms == true){
        firebase.auth().signOut();
        firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.pin)
        .then(cred => {
          this.success_message = `Logged in successfully.${cred.user.uid} Go to Home Page`
          this.success = 1;
          // cred.user.getIdTokenResult().then(result=>{
          //     console.log(result.claims);
          // });
        })
        .catch(error => {
          this.error_message=error.message;
          this.error=1;
        });
        this.active = 3;
      }
      else{
        this.error_message="Do agree with our terms and conditions";
        this.error=1;
      }
    }
  },
  watch:{
    $route (){
      this.width();
    },
    error(val) {
          if(val) {
            let interval = setInterval(() => {
              this.progress++
            }, this.time / 100);

            setTimeout(() => {
              this.error = 0;
              clearInterval(interval)
              this.progress = 0
            }, this.time);
          }
        }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(()=>{
      this.$router.push({ path: '/info'}).catch(()=>{});
    })
  },
  created(){
    this.width();
  }
}
</script>


<style scoped>
.center-heading{
  text-align: center;
}
.color{
  color:lavender;
}
.btn_center{
  margin: 0;
  top: 50%;
  left: 53%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
