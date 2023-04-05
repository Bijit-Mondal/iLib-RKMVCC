<template>
  <div class="color">
    <h2 class="color pure_comfortaa">Borrowed</h2>
    <Details :details="borrowedDetails"/>
    <h2 class="color pure_comfortaa">History</h2>
    <Details :details="historyDetails"/>
  </div>
</template>
<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import Details from "@/components/Details";
export default {
  components:{
    Details
  },
  data(){
    return{
      historyDetails:[],
      borrowedDetails:[]
    }
  },
  mounted() {
    this.fetchHistory(this.$route.params.uid);
    //this.fetchBorrowed(this.$route.params.uid);
  },
  methods:{
    fetchHistory(uid){
      firebase.firestore().collection('users').doc(uid).onSnapshot(userDoc=>{
        const history = userDoc.data().history;
        history.forEach(id=>{
          firebase.firestore().collection('history').doc(id).get().then(historyDoc => {
            firebase.firestore().collection('books').doc(historyDoc.data().book_isbn).get().then(bookDetails=>{
              this.historyDetails.push({
                BookName: historyDoc.data().book_name,
                id:historyDoc.data().borrowed_uid,
                borrowedDate:new Date(historyDoc.data().borrowed_date.seconds),
                img_src:bookDetails.data().img_url
              })
            })
          }).catch(err=>{
            alert(err);
          })
        })
      })
    },
    // fetchBorrowed(uid){
    //   firebase.firestore().collection('users').doc(uid).onSnapshot(userDoc=>{
    //     const borrowed = userDoc.data().borrowed;
    //     console.log(borrowed);
    //     borrowed.forEach(id=>{
    //       firebase.firestore().collection('borrowed').doc(id).get().then(borrowedDoc => {
    //         // firebase.firestore().collection('books').doc(borrowedDoc.data().book_isbn).get().then(bookDetails=>{
    //         //   this.borrowedDetails.push({
    //         //     BookName: borrowedDoc.data().book_name,
    //         //     id:borrowedDoc.data().borrowed_uid,
    //         //     borrowedDate:new Date(borrowedDoc.data().borrowed_date.seconds),
    //         //     img_src:bookDetails.data().img_url
    //         //   })
    //         // })
    //         console.log(borrowedDoc.data());
    //       }).catch(err=>{
    //         alert(err);
    //       })
    //     })
    //   })
    // }
  }
}
</script>