
<template>
    <div class="hidden">
      <vs-navbar style="position:fixed;" center-collapsed v-model="active">
        <template #left>
          <vs-button v-show="mobile" @click="activeSidebar = !activeSidebar" flat icon>
            <span class="material-icons">menu</span>
          </vs-button>
        </template>


        <template #right>
          <vs-button class="comfortaa" :color="btn_color" v-if="login==0"  :active="active_button == 1" @click="active_button = 1" flat to="/login">Login</vs-button>
          <vs-button class="comfortaa" :color="btn_color" v-if="login==1"  :active="active_button == 3" @click="open_logout_modal" flat>LogOut</vs-button>
          <vs-button class="comfortaa" :color="btn_color"  @click="active_button = 2"  to="/dashboard" gradient>Get Started</vs-button>
        </template>
      </vs-navbar>
      <vs-sidebar

        v-model="active"
        :open.sync="activeSidebar"
        style="position:fixed;"
        >
        <template #logo>
          <img src="../assets/logo.png" style="padding-right:20px;" v-if="mobile==false"  alt="">

          <img src="../assets/coollogo_com-76182378.png" alt="Logo">
        </template>
        <vs-sidebar-item class="comfortaa" id="home" to="/" :color="btn_color">
          <template #icon>
              <span class="material-icons-outlined ">home</span>
          </template>
          Home
        </vs-sidebar-item>
        <vs-sidebar-item class="comfortaa" to="/dashboard" id="dashboard">
          <template #icon>
            <span class="material-icons-outlined">dashboard</span>
          </template>
          Dashboard
        </vs-sidebar-item>
        <vs-sidebar-item class="comfortaa" to="/info" id="account">
          <template #icon>
            <span class="material-icons-outlined">account_box</span>
          </template>
          Account Details
        </vs-sidebar-item>
        <vs-sidebar-item class="comfortaa" to="/request" id="request">
          <template #icon>
            <span class="material-icons-outlined">library_books</span>
          </template>
          Request a New Book
        </vs-sidebar-item>

        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item class="comfortaa" arrow>
              <template #icon>
                <span class="material-icons-outlined">group</span>
              </template>
              Admin Section
            </vs-sidebar-item>
          </template>

          <vs-sidebar-item to='/studentdetails' class="comfortaa" id="studentdetails">
            <template #icon>
              <span class="material-icons-outlined">settings_suggest</span>
            </template>
            Student's Details
          </vs-sidebar-item>
          <vs-sidebar-item to="/add" class="comfortaa" id="books_add">
            <template #icon>
              <span class="material-icons-outlined">library_books</span>
            </template>
            Add Books
          </vs-sidebar-item>
          <vs-sidebar-item to="/student" class="comfortaa" id="list">
            <template #icon>
              <span class="material-icons-outlined">list</span>
            </template>
            Student List
          </vs-sidebar-item>
        </vs-sidebar-group>


        <vs-sidebar-item href="https://github.com/Bijit-Mondal/ilib" class="comfortaa" id="github">
          <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>
          </template>
          Github
        </vs-sidebar-item>
        <vs-sidebar-item href="https://rkmvccrahara.org/" class="comfortaa" id="college">
          <template #icon>
            <span class="material-icons-outlined">school</span>
          </template>
          College
        </vs-sidebar-item>
        <vs-sidebar-item href="https://bijit-mondal.github.io/Bijit-Mondal/" class="comfortaa" id="other">
          <template #icon>
            <span class="material-icons-outlined">developer_board</span>
          </template>
          Developer's Other Project
        </vs-sidebar-item>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar>
              <img :src="img_src" alt="">
            </vs-avatar>

            <vs-avatar badge-color="danger" badge-position="top-right">
              <span class="material-icons-outlined">assignment_return</span>
              <template #badge>
                28
              </template>
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>


      <vs-dialog width="300px" not-center v-model="logout_modal">
       <template #header>
         <h3 style="text-align:center" class="comfortaa not-margin">
           Welcome {{username}}
         </h3>
       </template>


       <div class="con-content">
         <h4 class="comfortaa" style="text-align:center">Are you sure you want to logout</h4>
       </div>

       <template #footer>
         <div class="con-footer">
           <vs-button class="comfortaa" @click="logout" transparent>
             Yes
           </vs-button>
           <vs-button class="comfortaa" @click="logout_modal=!logout_modal" success transparent>
             Cancel
           </vs-button>
         </div>
       </template>
     </vs-dialog>


    </div>
  </template>
<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
  export default {
    data:() => ({
      active: 'home',
      active_button: 0,
      login:2,
      btn_color: process.env.VUE_APP_BTN_COLOR,
      activeSidebar: false,
      mobile: false,
      windowWidth: 721,
      logout_modal:false,
      username:'',
      img_src:'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'
    }),
    mounted() {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
        if(this.windowWidth<990){
          this.mobile = true;
          this.activeSidebar = false;
        }
        else{
          this.activeSidebar = true;
          this.mobile = false;
        }
      })
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.login = 1;
            this.username = user.displayName;
            firebase.storage().ref('users/'+user.uid+'/profile.jpg').getDownloadURL().then(imgURL => {
              this.img_src = imgURL;
            });
          } else {
            this.login = 0;
          }
        });
    },
    methods:{
      open_logout_modal(){
        this.logout_modal=!this.logout_modal;
        // this.active_button = 3;
      },
      logout(){
        let self = this;
        firebase.auth().signOut()
        .then(function() {
          alert("Logout Successfully");
          self.$router.push({ path: '/login'}).catch((err)=>{console.error(err)});
        })
        .catch(function(error) {
          console.log(error);
        });
        this.logout_modal=!this.logout_modal;
      }
    },
    created(){
      this.windowWidth = window.innerWidth;
      if(this.windowWidth<990){
        this.mobile = true;
        this.activeSidebar = false;
      }
      else{
        this.activeSidebar = true;
        this.mobile = false;
      }
    }
  }
  </script>
<style scoped>
  .comfortaa{
    font-family: comfortaa;
  }

  .con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.con-footer .vs-button {
  margin: 0px;
}
.con-footer .vs-button .vs-button__content {
  padding: 10px 30px;
}
.con-footer .vs-button ~ .vs-button {
  margin-left: 10px;
}
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  padding-bottom: 0px;
}
.con-content {
  width: 100%;
}
.con-content p {
  font-size: 0.8rem;
  padding: 0px 10px;
}
.con-content .vs-checkbox-label {
  font-size: 0.8rem;
}
.con-content .vs-input-parent {
  width: 100%;
}
.con-content .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-content .vs-input-content .vs-input {
  width: 100%;
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
}
.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}
.footer-dialog .new a {
  color: rgba(var(--vs-primary), 1) !important;
  margin-left: 6px;
}
.footer-dialog .new a:hover {
  text-decoration: underline;
}
.footer-dialog .vs-button {
  margin: 0px;
}

</style>
