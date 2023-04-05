<template>
  <div>
    <h1 style="text-align:center" class="pure_comfortaa color">Borrow a New Book</h1>

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
         <vs-input style="align-items:center" v-model="query" state="warn" warn class="color comfortaa" placeholder="Enter Book/Writer Name  ">
           <template #icon>
              <span class="material-icons-outlined">local_library</span>
           </template>
         </vs-input>
       </vs-col>

       <vs-col :w="w">
         <vs-button gradient warn class="pure_comfortaa btn_center" :loading="load" @click="search" :active="active == 1">
           Search
        </vs-button>
       </vs-col>

     </vs-row>



     <div class="center color comfortaa" striped>
      <vs-table striped>
        <template #thead>
          <vs-tr>
            <vs-th>
              ISBN
            </vs-th>
            <vs-th>
              Book Name
            </vs-th>
            <vs-th>
              Author Name
            </vs-th>
            <vs-th>
                Number Of Books
            </vs-th>
            <vs-th>
              PDF
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
           <vs-tr v-for="book in books" :key="book.isbn">
            <vs-td>
              {{ book.isbn }}
            </vs-td>
            <vs-td>
              {{ book.book_name }}
            </vs-td>
            <vs-td>
              {{ book.writer }}
            </vs-td>
            <vs-td>
                {{book.nob}}
            </vs-td>
            <vs-td>
              {{book.have_pdf}}
            </vs-td>

          <template #expand>
              <vs-row justify="space-between">
                <vs-col w="2">
                  <vs-avatar>
                    <img :src="book.img_url" alt="">
                  </vs-avatar>
                </vs-col>
                <vs-col w="2">
                  <p>
                    {{ book.book_name }}
                  </p>
                </vs-col>

                <vs-col w="3">
                  <vs-button v-if="book.nob>0" :active="active == 2"  class="pure_comfortaa" border @click="request(book.isbn)" upload success>
                    Request The Book
                  </vs-button>
                  <vs-button v-else class="pure_comfortaa" success @click="request(book.isbn)"  disabled>
                    Request The Book
                  </vs-button>
                </vs-col>


                <vs-col w="3" v-if="book.have_pdf">
                  <vs-button class="pure_comfortaa" @click="pdfDownload(book.isbn,book.book_name)" flat warn>
                    Download The Pdf
                  </vs-button>
                </vs-col>

            </vs-row>
            </template>
          </vs-tr>
        </template>
      </vs-table>
       <div class="center con-pagination">
         <vs-pagination only-arrows v-model="page" :length="paginationLength" />
       </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'
import 'firebase/compat/storage'
import algoliasearch from 'algoliasearch/lite';
export default {
  data() {
         return {
            w: 12,
            APP_ID: process.env.VUE_APP_ALGOLIA_APPID,
            API_KEY:process.env.VUE_APP_ALGOLIA_API_KEY,
            books:[],
            windowWidth: 721,
            active:0,
            query:'',
            load:false,
            success:0,
            error: 0,
            success_message:'',
            error_message:'',
            time:3000,
            progress:0,
            page:1,
            paginationLength:1,
         }
     },
     methods:{
        search(){
          this.load = true;
          const searchClient = algoliasearch(this.APP_ID,this.API_KEY);
          const index = searchClient.initIndex('books');
          if(this.query!=""){
            index.search(this.query).then(({hits})=>{
              this.load = !this.load;
              this.books = hits;
            }).catch(err=>{
              console.log(err);
            })
          }else {
            index.search(this.query,{
              page: this.page
            }).then((hits)=>{
              this.load = !this.load;
              this.books = hits.hits;
              this.paginationLength = (hits.nbHits/10)+1;
            }).catch(err=>{
              console.log(err);
            })
          }
        },
       request(isbn){
         const requestBook = firebase.functions().httpsCallable('requestBook');
         requestBook(({
           isbn:isbn
         })).then(res=>{
           this.success = 1;
           this.success_message = res.data.success;
         }).catch(res=>{
           this.error =1;
           this.error_message = res;
         })
       },
       pdfDownload(isbn,book_name){
          firebase.storage().ref(`booksPdf/${isbn}/${book_name}.pdf`).getDownloadURL().then(URL=>{
            window.location.replace(URL);
          })
       }
     },
  watch:{
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
    },
    page(){
      this.search();
    },
    $route (){
      this.width();
    }
  },
     mounted() {
         this.windowWidth = window.innerWidth;
         if(this.windowWidth>990){
           this.w=4;
         }
     },
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
