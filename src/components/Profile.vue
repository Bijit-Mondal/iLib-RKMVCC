<template>
  <div>
    <h1 style="text-align:center" class="pure_comfortaa color"> {{greetMsg}} {{userDetails.username}}</h1>
    <vs-avatar v-if="userDetails.img_src" size="70" history history-gradient>
      <a :href="userDetails.img_src"><img :src="userDetails.img_src" alt="Profile Image"></a>
    </vs-avatar>
    <h2 class="comfortaa color">Account Details</h2>
    <div class="center color comfortaa">
      <vs-table striped>
        <template #tbody>
          <vs-tr>
            <vs-td>
              Full Name
            </vs-td>
            <vs-td>
              {{userDetails.username}}
            </vs-td>
          </vs-tr>
          <vs-tr>
            <vs-td>
              ID
            </vs-td>
            <vs-td>
              {{userDetails.uid}}
            </vs-td>
          </vs-tr>
          <vs-tr>
            <vs-td>
              Premium
            </vs-td>
            <vs-td>
              {{userDetails.isPremium}}
            </vs-td>
          </vs-tr>
          <vs-tr>
            <vs-td>
              Email
            </vs-td>
            <vs-td>
              <a class="color" style="text-decoration:none"  :href="'mailto:'+userDetails.email">{{userDetails.email}}</a>
            </vs-td>
          </vs-tr>
          <vs-tr>
            <vs-td>
              Phone Number
            </vs-td>
            <vs-td>
              <a class="color" style="text-decoration:none;" :href="'tel:'+userDetails.number">{{userDetails.number}}</a>
            </vs-td>
          </vs-tr>
          <vs-tr>
            <vs-td>
              Address
            </vs-td>
            <vs-td>
              {{userDetails.address}}
            </vs-td>
          </vs-tr>

          <vs-tr v-if="userDetails.admin">
            <vs-td>
              Requested for
            </vs-td>
            <vs-td v-for="res in userDetails.requested" :key="res">
              {{res}},
            </vs-td>
          </vs-tr>

          <vs-tr v-if="userDetails.admin">
            <vs-td>
              Borrowed
            </vs-td>
            <vs-td v-for="borrow in userDetails.borrowed" :key="borrow">
              {{borrow}},
            </vs-td>
          </vs-tr>
          <vs-tr v-if="userDetails.admin">
            <vs-td>
              Account Created At
            </vs-td>
            <vs-td>
              {{userDetails.createdAt}}
            </vs-td>
          </vs-tr>
          <vs-tr v-if="userDetails.admin">
            <vs-td>
              Last Sign In
            </vs-td>
            <vs-td>
              {{userDetails.lastSignInTime}}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return{
        greetMsg:''
      }
    },
    props: {
      userDetails: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.greet();
    },
    methods:{
      greet(){
        let d =new Date();
        d = d.getHours();
        if(d>=0&&d<=4){
          this.greetMsg = `Good Night, it's time to sleep`
        }
        if(d>4&&d<=6){
          this.greetMsg = `Wish a nice dawn to you,`
        }
        if(d>6&&d<=12){
          this.greetMsg = `Good Morning,`
        }
        if(d>12&&d<=17){
          this.greetMsg = `Good AfterNoon,`
        }
        if(d>17&&d<=19){
          this.greetMsg =`Good Evening,`
        }
        if(d>19&&d<=23){
          this.greetMsg=`It's Night,`
        }
      },
    }
  }
</script>