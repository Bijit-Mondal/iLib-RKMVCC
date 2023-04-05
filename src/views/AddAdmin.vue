<template>
  <div class="login" style="padding-bottom:40px;">
    <h2 class="center-heading color comfortaa" >Make A Admin User</h2>
    <h4 class="center-heading color Island">Welcome to the infinity of knowledge</h4>
    <div class="center content-inputs">
      <Alert :alertSignal="alertSignal"></Alert>
      <vs-input style="align-items:center" state="warn" warn v-model="email" class="color comfortaa"  autocomplete=false placeholder="Enter Your Email Id  ">
        <template #icon>
          <span class="material-icons-outlined">account_circle</span>
        </template>
      </vs-input>

    </div>
    <div style="padding-top:40px;padding-bottom:20px">
      <vs-button @click="addAdmin" warn gradient :active="active == 3" style="jusitfy-items:center;" class="comfortaa btn_center"> Add Admin &nbsp; <img src="../assets/arrow_forward_white_18dp.svg"> </vs-button>
    </div>
  </div>
</template>
<script>
  import firebase from "firebase/compat/app";
  import 'firebase/compat/functions'
  import Alert from '../components/Alert.vue'
  export default{
    components:{
      Alert
    },
    data(){
      return{
        active:0,
        email:'',
        alertSignal: {
          bool:false,
          type:'',
          message:'',
          color:''
        }
      }
    },
    methods:{
      addAdmin(){
        const addAdmin = firebase.functions().httpsCallable('addAdmin');
        addAdmin(({
          email:this.email
        })).then(res=>{
          // this.success = 1;
          // this.success_message = res.data.success;
          this.alertSignal.bool = true;
          this.alertSignal.type='Success';
          this.alertSignal.message= res.data.success;
        }).catch(err=>{
          this.alertSignal.bool = true;
          this.alertSignal.type='Error';
          this.alertSignal.message= err;
        })
      }
    }
  }
</script>

<style scoped>
.btn_center{
  margin: 0;
  top: 50%;
  left: 53%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>