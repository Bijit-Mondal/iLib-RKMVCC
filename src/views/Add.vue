<template>
  <div v-if="isAdmin" class="add">
   <BarcodeReader @new-barcode="fetchBookDetails" />
    <h1 style="text-align:center" class="pure_comfortaa color">Add a new Book</h1>
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
        <vs-input style="align-items:center" v-model="book_name" state="warn" warn class="color comfortaa" placeholder="Enter Book Name  ">
          <template #icon>
            <span class="material-icons-outlined">sticky_note_2</span>
          </template>
        </vs-input>
      </vs-col>

      <vs-col :w="w" style="margin-bottom:30px;">
        <vs-input style="align-items:center" state="warn" v-model.number="nob" type="number" warn class="color comfortaa" placeholder="Enter number of books ">
          <template #icon>
            <span class="material-icons-outlined">numbers</span>
          </template>
        </vs-input>
      </vs-col>

    </vs-row>

    <vs-row justify="space-around">
      <vs-col :w="w" style="margin-bottom:20px;">
        <vs-input style="align-items:center" v-model="writer" type="text" state="warn" warn class="color comfortaa" placeholder="Enter author name ">
          <template #icon>
            <span class="material-icons-outlined">attribution</span>
          </template>
        </vs-input>
      </vs-col>

      <vs-col :w="w" style="margin-bottom:30px;">
        <vs-input style="align-items:center" state="warn" type="text" v-model="isbn" warn class="color comfortaa" placeholder="Enter isbn number">
          <template #icon>
            <span class="material-icons-outlined">list</span>
          </template>
        </vs-input>
      </vs-col>

    </vs-row>

    <vs-row justify="space-around">
      <vs-col :w="w" style="margin-bottom:20px;">
        <vs-input style="align-items:center" v-model="img_url" type="text" state="warn" warn class="color comfortaa" placeholder="Enter image url  ">
          <template #icon>
            <span class="material-icons-outlined">image</span>
          </template>
        </vs-input>
      </vs-col>

      <vs-col :w="w" style="margin-bottom:20px;">
        <vs-input style="align-items:center;" state="warn" warn class="color comfortaa" label="Choose PDF(optional)" @change='chooseFile()' type="file"></vs-input>
      </vs-col>

    </vs-row>

    <vs-row justify="space-around">
      <vs-col :w="w" ></vs-col><vs-col :w="w" ></vs-col>
      <vs-col :w="w">
        <vs-button gradient warn class="pure_comfortaa btn_center" :active="active == 5" @click="upload">
          Create
        </vs-button>
      </vs-col>

    </vs-row>

  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'
import 'firebase/compat/storage'
import BarcodeReader from "@/components/BarcodeReader.vue";
export default{
  components:{
    BarcodeReader
  },
  data:() => ({
    w: 12,
    windowWidth: 721,
    active:0,
    book_name:'',
    nob:0,
    writer:'',
    isbn:'',
    img_url:'',
    have_pdf:false,
    books_pdf:null,
    error:0,
    error_message:'',
    success_message:'',
    success:0,
    time:3000,
    progress:0,
    isAdmin:false
  }),
  mounted(){
    this.windowWidth = window.innerWidth;
    if(this.windowWidth>990){
      this.w=4;
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
          clearInterval(interval)
          this.progress = 0
        }, this.time);
      }
    }
  },
  methods:{
    chooseFile(){
      this.books_pdf = event.target.files[0];
      this.have_pdf=(!this.have_pdf);
    },
    upload(){
      this.active = 5;
      if(this.book_name!=''&& this.isbn !=''&& this.img_url !='' && this.nob !=0 && this.writer!=''){
          const addBook = firebase.functions().httpsCallable('addBook');
          addBook(({
            book_name:this.book_name,
            isbn: this.isbn,
            nob : this.nob,
            writer : this.writer,
            img_url : this.img_url,
            have_pdf : this.have_pdf,
          })).then(res=>{
            this.success = 1;
            this.success_message = res.data.success;
          }).catch(res=>{
            this.error = 1;
            this.error_message = res;
          })
          if(this.have_pdf){
            this.uploadPdf(this.books_pdf,this.isbn,this.book_name);
          }
          this.book_name = '';
          this.isbn ='';
          this.nob = '';
          this.writer= '';
          this.img_url = '';
      }else{
        this.error_message="Fill The Form Properly";
        this.error = 1;
      }
    },
    uploadPdf(file,isbn,book_name){
      firebase.storage().ref().child('booksPdf/'+isbn+`/${book_name}.pdf`)
      .put(file,{contentType : 'application/pdf'})
          .then(snapshot => {
            console.log('PDF uploaded  '+snapshot);
          }).catch(err=>{
            console.log(err);
      })
    },
     fetchBookDetails(isbn) {
      const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn.rawValue}&jscmd=details&format=json`;
      console.log(isbn.rawValue)
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Log the response data to the console
        if(data[`ISBN:${isbn.rawValue}`]){
          // console.log(data[`ISBN:${isbn.rawValue}`].info_url)
          data = data[`ISBN:${isbn.rawValue}`];
          this.book_name = data.details.title;
          this.isbn = data.details.isbn_13[0];
          const authors = data.details.authors;
          for (let i = 0; i < authors.length; i++) {
            this.writer += authors[i].name;
            if (i < authors.length - 1) {
              this.writer += ', ';
            }
          }
          this.img_url = data.thumbnail_url;
        }else{
          alert("Details not found, scan again or enter manually ");
        }
      })
      .catch(error => {
        console.error(error); // Log any errors to the console
      });
}
  }
}
</script>


<style scoped>
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