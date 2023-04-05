<template>
    <div>
     <h1 style="text-align:center" class="pure_comfortaa color">Welcome, {{username}}</h1>
      <vs-alert>
        <template class="comfortaa" #title>
          Issued Book
        </template>
        <p class="pure_comfortaa">You Have {{haveBooks}} books with you.<br><br>
          You have requested for {{requested}} Books<br><br>
          You have borrowed this {{borrowed}} Books
        </p>
      </vs-alert>


      <vs-button to="/request" style="float:right; margin-top:20px;" transparent :active="active == 1" @click="active = 1" class="pure_comfortaa">
       Request a New Book
    </vs-button>

    </div>
</template>

<script>
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
export default ({
    data:()=> ({
        active:0,
        w:12,
        haveBooks:0,
        requested:[],
        borrowed:[],
        username:'',
    }),
    created(){
       this.windowWidth = window.innerWidth;
       if(this.windowWidth>990){
         this.w=6;
       }
    },
    mounted() {
      const user = firebase.auth().currentUser;
      this.username = user.displayName;
      if(user){
        firebase.firestore().collection('users').doc(user.uid).get().then(doc=>{
          this.haveBooks = doc.data().haveBooks;
          this.requested = doc.data().requested;
          this.borrowed = doc.data().borrowed;
        })
      }
    }
})
</script>

<style scoped>
  
</style>
