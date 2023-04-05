<template>
  <div >
    <h1 style="text-align:center" class="color pure_comfortaa">Student Details</h1>
    <div v-if="isAdmin" class="tabs">

      <input type="radio" id="tab1" name="tab-control" checked>
      <input type="radio" id="tab2" name="tab-control">
      <input type="radio" id="tab3" name="tab-control">
      <input type="radio" id="tab4" name="tab-control">
      <ul>
        <li title="Student Details"><label for="tab1" role="button">
          <svg viewBox="0 0 24 24"><path d="M5.282 12.064c-.428.328-.72.609-.875.851-.155.24-.249.498-.279.768h2.679v-.748H5.413c.081-.081.152-.151.212-.201.062-.05.182-.142.361-.27.303-.218.511-.42.626-.604.116-.186.173-.375.173-.578a.898.898 0 0 0-.151-.512.892.892 0 0 0-.412-.341c-.174-.076-.419-.111-.733-.111-.3 0-.537.038-.706.114a.889.889 0 0 0-.396.338c-.094.143-.159.346-.194.604l.894.076c.025-.188.074-.317.147-.394a.375.375 0 0 1 .279-.108c.11 0 .2.035.272.108a.344.344 0 0 1 .108.258.55.55 0 0 1-.108.297c-.074.102-.241.254-.503.453zm.055 6.386a.398.398 0 0 1-.282-.105c-.074-.07-.128-.195-.162-.378L4 18.085c.059.204.142.372.251.506.109.133.248.235.417.306.168.069.399.103.692.103.3 0 .541-.047.725-.14a1 1 0 0 0 .424-.403c.098-.175.146-.354.146-.544a.823.823 0 0 0-.088-.393.708.708 0 0 0-.249-.261 1.015 1.015 0 0 0-.286-.11.943.943 0 0 0 .345-.299.673.673 0 0 0 .113-.383.747.747 0 0 0-.281-.596c-.187-.159-.49-.238-.909-.238-.365 0-.648.072-.847.219-.2.143-.334.353-.404.626l.844.151c.023-.162.067-.274.133-.338s.151-.098.257-.098a.33.33 0 0 1 .241.089c.059.06.087.139.087.238 0 .104-.038.193-.117.27s-.177.112-.293.112a.907.907 0 0 1-.116-.011l-.045.649a1.13 1.13 0 0 1 .289-.056c.132 0 .237.041.313.126.077.082.115.199.115.352 0 .146-.04.266-.119.354a.394.394 0 0 1-.301.134zm.948-10.083V5h-.739a1.47 1.47 0 0 1-.394.523c-.168.142-.404.262-.708.365v.754a2.595 2.595 0 0 0 .937-.48v2.206h.904zM9 6h11v2H9zm0 5h11v2H9zm0 5h11v2H9z"/>

        </svg><br><span class="comfortaa">Student Details</span></label></li>
        <li title="Pending Request"><label for="tab2" role="button">
          <svg viewBox="0 0 24 23">
            <path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
          </svg>
          <br><span class="comfortaa">Pending Request</span></label></li>
        <li title="Return"><label for="tab3" role="button"><svg viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 12h-3V8h-4v4H7l5 5zm2-9h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"/>
      </svg><br><span class="comfortaa">Return</span></label></li>    <li title="Dues"><label for="tab4" role="button"><svg viewBox="0 0 24 24">
        <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
    </svg><br><span class="comfortaa">Dues</span></label></li>
      </ul>

      <div class="slider"><div class="indicator"></div></div>
      <div class="content">
        <section>
          <h2 class="comfortaa">Student Details</h2>
          <p style="text-align:center" class="comfortaa color">Enter the Student Email to see the details</p>
          <vs-row justify="space-around">
            <vs-col :w="w" :offset="offset">
              <vs-button
                  warn
                  size="large"
                  transparent
                  class="pure_comfortaa"
                  :active="active == 1"
                  @click="openPrompt=!openPrompt"
                  to=""
              >
                Get Details By Email
              </vs-button>
            </vs-col>
          </vs-row>

        </section>
            <section>
              <h2 class="comfortaa">Pending Request</h2>
              <p style="text-align:center" class="comfortaa color">See All Pending Request</p>
              <vs-row justify="space-around">
                <vs-col :w="w" :offset="offset">
                  <vs-button
                    warn
                    size="large"
                    transparent
                    class="pure_comfortaa"
                    :active="active == 2"
                    @click="openRequest"
                  >
                    Pending Books
                  </vs-button>
                </vs-col>
              </vs-row>
            </section>
              <section>
                <h2>Return</h2>
                <p style="text-align:center" class="comfortaa color">Books To be Returned</p>
                <vs-row justify="space-around">
                  <vs-col :w="w" :offset="offset">
                    <vs-button
                        warn
                        size="large"
                        transparent
                        class="pure_comfortaa"
                        :active="active == 3"
                        @click="returnList"
                    >
                      Return Book
                    </vs-button>
                  </vs-col>
                </vs-row>
              </section>
              <section>
              <h2>Dues</h2>
              <p style="text-align:center" class="comfortaa color">Student book return due list</p>
              <vs-row justify="space-around">
                <vs-col :w="w" :offset="offset">
                  <vs-button
                      warn
                      size="large"
                      transparent
                      class="pure_comfortaa"
                      :active="active == 4"
                      @click="active = 4"
                      to=""

                  >
                    Load Due Students
                  </vs-button>
                </vs-col>
              </vs-row>
            </section>
      </div>
      <!--student details by email dialog box-->
      <div class="center">
        <vs-dialog width="300px" blur not-center v-model="openPrompt">
          <template #header>
            <h4 class="not-margin comfortaa">
              Enter the <b style="color:#ffd534" >Email</b>
            </h4>
          </template>


          <div class="con-content">
            <vs-input v-model="student_email" type="email" placeholder="Email address"></vs-input>
          </div>

          <template #footer>
            <div class="con-footer">
              <vs-button @click="getDetailsByEmail" class="pure_comfortaa" :loading="stnd_dtls_btn" floating border warn>
                Ok
              </vs-button>
              <vs-button @click="openPrompt=false" color="pinterest" class="pure_comfortaa" border floating>
                Cancel
              </vs-button>
            </div>
          </template>
        </vs-dialog>
      </div>


    </div>

    <div v-if="!isAdmin">
      <h1 style="text-align:center" class="color pure_comfortaa"> Only Admin Can See it</h1>
    </div>

    <Alert :alertSignal="alertSignal"></Alert>

    <div  v-if="userInfo">
      <div class="center color comfortaa">
        <Profile :userDetails="userDetails"/>
        <vs-row justify="space-around" style="padding-top: 20px">
          <vs-col w=6>
            <vs-button @click="deleteUser(userDetails.uid)" color="pinterest" class="pure_comfortaa" border floating>
              <span class="material-icons-outlined">
                delete
              </span>
              Delete this Account
            </vs-button>
          </vs-col>

          <vs-col w=6>
            <vs-button @click="makePremium(userDetails.email)" color="spotify"  class="comfortaa btn_center" border floating>
              Make Premium &nbsp; <img src="../assets/arrow_forward_white_18dp.svg">
            </vs-button>
          </vs-col>
        </vs-row>

      </div>
    </div>

    <div v-if="requestInfo">
      <h3 style="text-align: center" class="color pure_comfortaa">Requested Books</h3>
      <div class="center color comfortaa" striped>
        <vs-table striped>
          <template #header>
            <vs-input v-model="search" border placeholder="Search" />
          </template>
          <template #thead>
            <vs-tr>
              <vs-th sort @click="requestedInfoArr = $vs.sortData($event ,requestedInfoArr, 'book_isbn')">
                Book ISBN
              </vs-th>
              <vs-th sort @click="requestedInfoArr = $vs.sortData($event ,requestedInfoArr, 'book_name')">
                Book Name
              </vs-th>
              <vs-th sort @click="requestedInfoArr = $vs.sortData($event ,requestedInfoArr, 'email')">
                Request By
              </vs-th>
              <vs-th>
                 Accept
              </vs-th>
              <vs-th>
                Reject
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getSearch(requestedInfoArr, search)"
                :data="tr"
            >
              <vs-td>
                {{ tr.book_isbn }}
              </vs-td>
              <vs-td>
                {{ tr.book_name }}
              </vs-td>
              <vs-td>
                {{ tr.email }}
              </vs-td>
              <vs-td>
                <vs-button class="pure_comfortaa" @click="accept(tr.id)" border success>
                  Accept
                </vs-button>
              </vs-td>
              <vs-td>
                <vs-button class="pure_comfortaa" @click="reject(tr.id)" flat color="pinterest">
                  Reject
                </vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>

    </div>

    <div v-if="returnInfo">

      <h3 style="text-align: center" class="color pure_comfortaa">Books to be returned</h3>
      <div class="center color comfortaa" striped>
        <vs-table striped>
          <template #header>
            <vs-input v-model="search" border placeholder="Search" />
          </template>
          <template #thead>
            <vs-tr>
              <vs-th sort @click="returnedInfoArr = $vs.sortData($event ,returnedInfoArr, 'book_isbn')">
                Book ISBN
              </vs-th>
              <vs-th sort @click="returnedInfoArr = $vs.sortData($event ,returnedInfoArr, 'book_name')">
                Book Name
              </vs-th>
              <vs-th sort @click="returnedInfoArr = $vs.sortData($event ,returnedInfoArr, 'borrowed_uid')">
                Request By
              </vs-th>
              <vs-th sort @click="returnedInfoArr = $vs.sortData($event ,returnedInfoArr, 'borrowed_by')">
                Student Email
              </vs-th>
              <vs-th>
                Borrowed Date
              </vs-th>
              <vs-th>
                Fine
              </vs-th>
              <vs-th>
                Accept
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getSearch(returnedInfoArr, search)"
                :data="tr"
            >
              <vs-td>
                {{ tr.book_isbn }}
              </vs-td>
              <vs-td>
                {{ tr.book_name }}
              </vs-td>
              <vs-td>
                {{ tr.borrowed_uid }}
              </vs-td>
              <vs-td>
                {{tr.borrowed_by}}
              </vs-td>
              <vs-td>
                {{tr.borrowed_date.toDate()}}
              </vs-td>
              <vs-td>
                <vs-button class="pure_comfortaa" v-if="(tr.diffDays>15)" border floating color="pinterest">
                  Fine Charges
                </vs-button>
                <vs-button class="pure_comfortaa" v-else border disabled floating color="pinterest">
                  No Fine
                </vs-button>
              </vs-td>
              <vs-td>
                <vs-button class="pure_comfortaa" @click="acceptReturn(tr.id,tr.diffDays)" border floating warn>
                  Accept
                </vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'
import 'firebase/compat/storage'
import Alert from '../components/Alert.vue'
import Profile from "@/components/Profile";

export default {
  components:{
    Alert,
    Profile
  },
  data() {
         return {
            active:0,
            w: 8,
            offset:1,
            windowWidth: 721,
            openPrompt:false,
            isAdmin : false,
            student_email:'',
            time:3000,
            alertSignal: {
               bool:false,
               type:'',
               message:'',
               color:''
            },
            userDetails:{
              username:'',
              email:'',
              uid:'',
              number:null,
              img_src:"https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
              address:'',
              isPremium:false,
              admin:false,
              requested :[],
              borrowed:[],
              createdAt:'',
              lastSignInTime:''
            },
            stnd_dtls_btn:false,
            userInfo :false,
            requestInfo:false,
            returnInfo:false,
            search:'',
            requestedInfoArr:[],
            returnedInfoArr:[]
         }
        },
        methods:{
          getDetailsByEmail(){
            this.stnd_dtls_btn= true;
            const fun = firebase.functions().httpsCallable('getUserByEmail');
            fun(({email:this.student_email}))
                .then(res=>{
                  this.userDetails.username = res.data.displayName;
                  this.userDetails.email = res.data.email;
                  this.userDetails.uid = res.data.uid;
                  if(res.data.customClaims){
                    this.userDetails.isPremium = res.data.customClaims.premium;
                  }
                  this.userDetails.createdAt= res.data.metadata.creationTime;
                  this.userDetails.lastSignInTime = res.data.metadata.lastSignInTime;
                  firebase.storage().ref(`users/${res.data.uid}/profile.jpg`).getDownloadURL().then(imgURL=>{
                    this.userDetails.img_src = imgURL;
                  })
                  let docRef = firebase.firestore().collection('users/').doc(res.data.uid);
                  docRef.get().then(doc=>{
                    this.userDetails.admin = true;
                    this.userDetails.requested = doc.data().requested;
                    this.userDetails.borrowed = doc.data().borrowed;
                  })
                  firebase.firestore().collection('userInfo').doc(res.data.uid).get().then(doc=>{
                    this.userDetails.address = doc.data().Address,
                        this.userDetails.number = doc.data().MobileNumber
                  })

                  this.stnd_dtls_btn = false;
                  this.openPrompt = false;
                  this.userInfo = true;
                })
                .catch(err=>{
                  alert(err);
                  this.stnd_dtls_btn = false;
                })
          },
          deleteUser(uid){
            const deleteUserByUID = firebase.functions().httpsCallable('deleteUser');
            deleteUserByUID(({
              uid : uid
            })).then(res=>{
              this.alertSignal.bool = true;
              this.alertSignal.type="Success";
              this.alertSignal.message = res.data.success;
            }).catch(err=>{
              this.alertSignal.bool = true;
              this.alertSignal.type="Error";
              this.alertSignal.message = err;
            })

            let profileImg = firebase.storage().ref().child(`users/${uid}/profile.jpg`);
            profileImg.delete();
          },
          makePremium(email) {
            const addPremiumRole = firebase.functions().httpsCallable('addPremium');
            addPremiumRole(({email:email}))
                .then(res=>{
                  if(res.data.error != undefined){
                    this.alertSignal.bool = true;
                    this.alertSignal.type="Error";
                    this.alertSignal.message = res.data.error;
                  }else if(res.data.errorInfo != undefined){
                    this.alertSignal.bool = true;
                    this.alertSignal.type="Error";
                    this.alertSignal.message = res.data.errorInfo.message;
                  }else if(res.data.success != undefined){
                    this.alertSignal.bool = true;
                    this.alertSignal.type="Success";
                    this.alertSignal.message = res.data.success;
                  }
                })
          },
          openRequest(){
            this.active =2;
            firebase.firestore().collection('requested').onSnapshot(snapshot => {
              let requestedInfoArr = [];
              snapshot.forEach(doc=>{
                requestedInfoArr.push({...doc.data(),'id':doc.id});
              })
              this.requestedInfoArr = requestedInfoArr;
              this.requestInfo = !this.requestInfo;
            })
          },
          accept(id){
            const acceptRequest = firebase.functions().httpsCallable('accept');
            acceptRequest(({
              id : id
            })).then(res=>{
              this.alertSignal.bool = true;
              this.alertSignal.type="Success";
              this.alertSignal.message = res.data.success;
            }).catch(err=>{
              this.alertSignal.bool = true;
              this.alertSignal.type="Error";
              this.alertSignal.message = err;
            })
          },
          reject(id){
            const rejectRequest = firebase.functions().httpsCallable('reject');
            rejectRequest(({
              id:id
            })).then(res=>{
              this.alertSignal.bool = true;
              this.alertSignal.type="Success";
              this.alertSignal.message = res.data.success;
            }).catch(err=>{
              this.alertSignal.bool = true;
              this.alertSignal.type="Error";
              this.alertSignal.message = err;
            })
          },
          returnList(){
            this.active = 3;
            const date = new Date();
            firebase.firestore().collection('borrowed').onSnapshot(snapshot => {
              let returnedInfoArr = [];
              snapshot.forEach(doc=>{
                let diffTime = Math.abs(date- doc.data().borrowed_date.toDate());
                let diffDays = Math.ceil(diffTime/(1000*60*60*24));
                returnedInfoArr.push({...doc.data(),'id':doc.id,'diffDays':diffDays});
              })
              this.returnedInfoArr = returnedInfoArr;
              this.returnInfo = !this.returnInfo;
            })
          },
          acceptReturn(id,diffDays){
            if(diffDays>15){
              alert("Make Sure to collect Fine Charges for " +(diffDays-15) +" days");
            }
            const acceptReturn = firebase.functions().httpsCallable('acceptReturn');
            acceptReturn(({
              id:id
            })).then(res=>{
              this.alertSignal.bool = true;
              this.alertSignal.type="Success";
              this.alertSignal.message = res.data.success;
            }).catch(err=>{
              this.alertSignal.bool = true;
              this.alertSignal.type="Error";
              this.alertSignal.message = err;
            })
          }

        },
      mounted(){
          this.windowWidth = window.innerWidth;
          if(this.windowWidth>990){
            this.w=8;
            this.offset = 5;
          }
          firebase.auth().currentUser.getIdTokenResult().then(result=>{
            this.isAdmin = result.claims.admin;
          });
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
                this.success =0;
                clearInterval(interval)
                this.progress = 0
              }, this.time);
            }
          }
        }
}
</script>

<style scoped>
html {
  width: 100%;
  height: 100%;
}
body {
  background-color: #ffd534;
  height: 100%;
}
.tabs {
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  padding: 50px 50px 80px;
  width: 70%;
  height: 250px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  min-width: 240px;
  backdrop-filter: blur(8px) saturate(180%);
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  background: rgba(231, 202, 21, 0);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}
.tabs input[name=tab-control] {
  display: none;
}
.tabs .content section h2,
.tabs ul li label {
  font-family: comfortaa;
  font-weight: bold;
  font-size: 18px;
  color: #ffd534;
}
.tabs ul {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
}
.tabs ul li {
  box-sizing: border-box;
  flex: 1;
  width: 25%;
  padding: 0 10px;
  text-align: center;
}
.tabs ul li label {
  transition: all 0.3s ease-in-out;
  color: #929daf;
  padding: 5px auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.tabs ul li label br {
  display: none;
}
.tabs ul li label svg {
  fill: #929daf;
  height: 1.2em;
  vertical-align: bottom;
  margin-right: 0.2em;
  transition: all 0.2s ease-in-out;
}
.tabs ul li label:hover, .tabs ul li label:focus, .tabs ul li label:active {
  outline: 0;
  color: #bec5cf;
}
.tabs ul li label:hover svg, .tabs ul li label:focus svg, .tabs ul li label:active svg {
  fill: #bec5cf;
}
.tabs .slider {
  position: relative;
  width: 25%;
  transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
}
.tabs .slider .indicator {
  position: relative;
  width: 50px;
  max-width: 100%;
  margin: 0 auto;
  height: 4px;
  background: #ffd534;
  border-radius: 1px;
}
.tabs .content {
  margin-top: 30px;
}
.tabs .content section {
  display: none;
  -webkit-animation-name: content;
          animation-name: content;
  -webkit-animation-direction: normal;
          animation-direction: normal;
  -webkit-animation-duration: 0.3s;
          animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
          animation-iteration-count: 1;
  line-height: 1.4;
}
.tabs .content section h2 {
  color: #ffd534;
  display: none;
}
.tabs .content section h2::after {
  content: "";
  position: relative;
  display: block;
  width: 30px;
  height: 3px;
  background: #ffd534;
  margin-top: 5px;
  left: 1px;
}
.tabs input[name=tab-control]:nth-of-type(1):checked ~ ul > li:nth-child(1) > label {
  cursor: default;
  color: #ffd534;
}
.tabs input[name=tab-control]:nth-of-type(1):checked ~ ul > li:nth-child(1) > label svg {
  fill: #ffd534;
}
@media (max-width: 600px) {
  .tabs input[name=tab-control]:nth-of-type(1):checked ~ ul > li:nth-child(1) > label {
    background: rgba(0, 0, 0, 0.08);
  }
}
.tabs input[name=tab-control]:nth-of-type(1):checked ~ .slider {
  transform: translateX(0%);
}
.tabs input[name=tab-control]:nth-of-type(1):checked ~ .content > section:nth-child(1) {
  display: block;
}
.tabs input[name=tab-control]:nth-of-type(2):checked ~ ul > li:nth-child(2) > label {
  cursor: default;
  color: #ffd534;
}
.tabs input[name=tab-control]:nth-of-type(2):checked ~ ul > li:nth-child(2) > label svg {
  fill: #ffd534;
}
@media (max-width: 600px) {
  .tabs input[name=tab-control]:nth-of-type(2):checked ~ ul > li:nth-child(2) > label {
    background: rgba(0, 0, 0, 0.08);
  }
}
.tabs input[name=tab-control]:nth-of-type(2):checked ~ .slider {
  transform: translateX(100%);
}
.tabs input[name=tab-control]:nth-of-type(2):checked ~ .content > section:nth-child(2) {
  display: block;
}
.tabs input[name=tab-control]:nth-of-type(3):checked ~ ul > li:nth-child(3) > label {
  cursor: default;
  color: #ffd534;
}
.tabs input[name=tab-control]:nth-of-type(3):checked ~ ul > li:nth-child(3) > label svg {
  fill: #ffd534;
}
@media (max-width: 600px) {
  .tabs input[name=tab-control]:nth-of-type(3):checked ~ ul > li:nth-child(3) > label {
    background: rgba(0, 0, 0, 0.08);
  }
}
.tabs input[name=tab-control]:nth-of-type(3):checked ~ .slider {
  transform: translateX(200%);
}
.tabs input[name=tab-control]:nth-of-type(3):checked ~ .content > section:nth-child(3) {
  display: block;
}
.tabs input[name=tab-control]:nth-of-type(4):checked ~ ul > li:nth-child(4) > label {
  cursor: default;
  color: #ffd534;
}
.tabs input[name=tab-control]:nth-of-type(4):checked ~ ul > li:nth-child(4) > label svg {
  fill: #ffd534;
}
@media (max-width: 600px) {
  .tabs input[name=tab-control]:nth-of-type(4):checked ~ ul > li:nth-child(4) > label {
    background: rgba(0, 0, 0, 0.08);
  }
}
.tabs input[name=tab-control]:nth-of-type(4):checked ~ .slider {
  transform: translateX(300%);
}
.tabs input[name=tab-control]:nth-of-type(4):checked ~ .content > section:nth-child(4) {
  display: block;
}
@-webkit-keyframes content {
  from {
    opacity: 0;
    transform: translateY(5%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes content {
  from {
    opacity: 0;
    transform: translateY(5%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}
@media (max-width: 1000px) {
  .tabs ul li label {
    white-space: initial;
  }
  .tabs ul li label br {
    display: initial;
  }
  .tabs ul li label svg {
    height: 1.5em;
  }
}
@media (max-width: 600px) {
  .tabs ul li label {
    padding: 5px;
    border-radius: 5px;
  }
  .tabs ul li label span {
    display: none;
  }
  .tabs .slider {
    display: none;
  }
  .tabs .content {
    margin-top: 20px;
  }
  .tabs .content section h2 {
    display: block;
  }
}



.center-heading{
  text-align: center;
}
.color{
  color:lavender;
}
.Island{
  font-family: 'Island Moments', comfortaa;
}
.comfortaa{
  font-family: 'comfortaa', comfortaa;
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
    padding: 10px 10px 0px;
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
    margin: 20px 0px 0px;
    padding: 0px;
    font-size: 0.7rem;
  }
  .footer-dialog .new a {
    color: #ffd534;
    margin-left: 6px;
  }
  .footer-dialog .new a:hover {
    text-decoration: underline;
  }
  .footer-dialog .vs-button {
    margin: 0px;
  }

</style>