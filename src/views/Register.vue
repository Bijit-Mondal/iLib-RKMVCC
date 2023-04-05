<template>
  <div>
    <h1 style="text-align:center" class="pure_comfortaa color">Create a New Account</h1>
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

    <vs-row justify="space-around">
      <vs-col :w="w" style="margin-bottom:20px;">
        <vs-input style="align-items:center" v-model="user_name" state="warn" warn class="color comfortaa" placeholder="Enter Your Name  ">
          <template #icon>
            <span class="material-icons-outlined">face</span>
          </template>
        </vs-input>
      </vs-col>

      <vs-col :w="w" style="margin-bottom:30px;">
        <vs-input style="align-items:center" state="warn" v-model.number="mobile" type="tel" warn class="color comfortaa" placeholder="Enter Mobile Number ">
          <template #icon>
            <span class="material-icons-outlined">smartphone</span>
          </template>
        </vs-input>
      </vs-col>

    </vs-row>

    <vs-row justify="space-around">
      <vs-col :w="w" style="margin-bottom:20px;">
        <vs-input style="align-items:center" v-model="email" type="email" state="warn" warn class="color comfortaa" placeholder="Enter Your EMail Id  ">
          <template #icon>
            <span class="material-icons-outlined">mail</span>
          </template>
        </vs-input>
      </vs-col>

      <vs-col :w="w" style="margin-bottom:30px;">
        <vs-input style="align-items:center" state="warn" type="password" v-model="pin" warn class="color comfortaa" placeholder="Enter your pin ">
          <template #icon>
            <span class="material-icons-outlined">key</span>
          </template>
        </vs-input>
      </vs-col>

    </vs-row>

    <vs-row justify="space-around">
      <vs-col :w="w" style="margin-bottom:20px;">
        <vs-input style="align-items:center" v-model="address" type="text" state="warn" warn class="color comfortaa" placeholder="Address  ">
          <template #icon>
            <span class="material-icons-outlined">home</span>
          </template>
        </vs-input>
      </vs-col>

      <vs-col :w="w" style="margin-bottom:20px;">
        <vs-input style="align-items:center;" state="warn" warn class="color comfortaa" label="Profile Image(less than 350KB)" @change='chooseFile()' type="file"></vs-input>
      </vs-col>

    </vs-row>

    <vs-row justify="space-around">
      <vs-col :w="w" ></vs-col><vs-col :w="w" ></vs-col>
      <vs-col :w="w">
        <vs-button gradient warn class="pure_comfortaa btn_center" :active="active == 1" @click="create">
          Create
        </vs-button>
      </vs-col>

    </vs-row>

  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'
import 'firebase/compat/storage'
export default{
  data:() => ({
    w: 12,
    windowWidth: 721,
    active:0,
    user_name:'',
    mobile:'',
    email:'',
    pin:'',
    address:'',
    profiel_image:null,
    error:0,
    error_message:'',
    success_message:'',
    success:0,
    time:3000,
    progress:0
  }),
  mounted(){
    this.windowWidth = window.innerWidth;
    if(this.windowWidth>990){
      this.w=4;
    }
  },
  watch:{
    $route (){
      this.width();
    },
    error(val) {
      if(val) {
        var interval = setInterval(() => {
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
  methods:{
    chooseFile(){
      this.profiel_image = event.target.files[0];
      if(this.profiel_image.size>350000){
        alert('Reduce Image Size');
        this.profiel_image = null;
      }
    },
    create(){
      if(this.email!=''&& this.pin !=''&& this.address !='' && this.mobile !='' && this.user_name!='' && this.profiel_image!=null){
        console.log(this.profiel_image);
        firebase.auth().createUserWithEmailAndPassword(this.email, this.pin)
            .then(cred=>{
              this.success_message = `Account created successfully.${cred.user.uid}. Confirm Your Email Please`;
              this.success = 1;

              firebase.auth().currentUser.sendEmailVerification();

              cred.user.updateProfile({
                displayName: this.user_name,
              })
              firebase.firestore().collection('userInfo').doc(cred.user.uid).set({
                Address : this.address,
                MobileNumber : this.mobile
              })
              return firebase.storage().ref().child('users/'+cred.user.uid+'/profile.jpg')
                  .put(this.profiel_image,{contentType: 'image/jpg'})
            }).then(()=>{alert('Please Verify Your Mail');})
            .catch(err=>{
              this.error_message = err.message;
              this.error = 1;
              console.log(err);
            });

      }else{
        this.error_message="Fill The Form Properly";
        this.error = 1;
      }
    }
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

@media screen and (max-width: 990px){
  .btn_center{
    margin: 0;
    top: 50%;
    left: 65%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
</style>