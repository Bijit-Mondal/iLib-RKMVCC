<template>
  <div>
    <Profile :userDetails="userDetails"/>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import Profile from "@/components/Profile";
export default{
  components:{
    Profile
  },
  data: () =>({
    userDetails:{
      username:'',
      email:'',
      uid:'',
      number:null,
      img_src:"https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      address:'',
      isPremium:false
    }
  }),
  methods:{
    accessDetails(){
      const user = firebase.auth().currentUser;
      if(user){
        firebase.storage().ref('users/'+user.uid+'/profile.jpg').getDownloadURL().then(imgURL => {
          this.userDetails.img_src = imgURL;
        }).catch(()=>{});
        this.userDetails.username = user.displayName;
        this.userDetails.email = user.email;
        this.userDetails.uid = user.uid;
        user.getIdTokenResult().then(result=>{
          this.userDetails.isPremium = result.claims.premium;
        })
        firebase.firestore().collection('userInfo').doc(user.uid).get().then(doc=>{
          this.userDetails.address = doc.data().Address,
          this.userDetails.number = doc.data().MobileNumber
        })
      }
    }
  },
  mounted(){
    this.accessDetails();
  }
}
</script>

<style scoped>
</style>
