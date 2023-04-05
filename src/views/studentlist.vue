<template class="admin">
  <div class="center comfortaa color">
    <vs-table>
      <template #header>
        <vs-input v-model="search" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="users = $vs.sortData($event ,users, 'email')">
            Email
          </vs-th>
          <vs-th sort @click="users = $vs.sortData($event ,users, 'id')">
            Id
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in $vs.getSearch(users, search)"
          :data="tr"
        >
          <vs-td>
          {{ tr.email }}
          </vs-td>
          <vs-td>
          {{ tr.id }}
          </vs-td>
          <template #expand>
            <vs-row justify="space-between">
              <vs-col w="2">
                  <vs-avatar>
                    <img :src="tr.img_src" alt="">
                  </vs-avatar>
              </vs-col>
              <vs-col w="3">
                    <p>
                      {{ tr.name }}
                    </p>
              </vs-col>
              <vs-col w="3">
                <vs-button
                  icon
                  size="mini"
                  circle
                  gradient
                  color="success"
                  animation-type="rotate"
                  :href="'tel:'+tr.number"
                >
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z"/></svg>
                  <template #animate >
                    <p class='black pure_comfortaa'>Call</p>
                  </template>
                </vs-button>
              </vs-col>
              <vs-col w="3">
                <vs-button @click="clicked(tr.id)" flat color="#ADD8E6" danger>
                  <span class="pure_comfortaa">Student History</span>
                </vs-button>
              </vs-col>
            </vs-row>

          </template>

        </vs-tr>
      </template>

    </vs-table>
  </div>
</template>

<script>
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/firestore'
  import 'firebase/compat/storage'
  export default {
    data:() => ({
      search: '',
      users: []
    }),
    mounted() {
      this.loadStudent();
    },
    methods:{
      loadStudent(){
        firebase.firestore().collection('users').get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // console.log(doc.id, ' => ', doc.data());
                firebase.storage().ref('users/'+doc.id+'/profile.jpg').getDownloadURL().then(imgURL => {
                  firebase.firestore().collection('userInfo').doc(doc.id).get().then(docs=>{
                    this.users.push({ id: doc.id, img_src:imgURL, number:docs.data().MobileNumber , ...doc.data() });
                  })
                });
              });
            })
            .catch((error) => {
              alert('Error getting users collection:', error);
            });
      },
      clicked(id){
        this.$router.push(`/student/${id}`);
      }
    }
  }
  </script>


<style scoped>
.color{
  color:lavender;
}
.black{
  color: black;
}
</style>
