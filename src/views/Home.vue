<template>
  <div class="home">
    <vs-card-group>
        <vs-card type='4' v-for="card in cards" :key="card.id">
          <template #title>
            <h3 class="comfortaa">{{card.title}}</h3>
          </template>
          <template #img>
            <img :src="`${card.img}`" alt="image">
          </template>
          <template #text>
            <p class="comfortaa">
              {{card.content}}
            </p>
          </template>
        </vs-card>
    </vs-card-group>
    <div class="color comfortaa grid">
      <h3 class="center-heading">About College</h3>
      <p style="padding-left: 3%; padding-right:3%">
        The Ramakrishna Mission Boys’ Home at Rahara, a branch centre of the Ramakrishna Mission, was founded in 1944 as an orphanage with a nucleus of 37 boys rendered orphan by the Great Bengal Famine of 1942-1943. Since then the Home grew in dimensions and activities adhering to the principle of service to mankind in the spirit of worship. Today, the Home is an educational complex with several schools and colleges wherein nearly four thousand students are receiving education and training in different subjects and trades according to the aptitude of each individual<a style="text-decoration: none" class="color comfortaa" href="https://rkmvccrahara.org">...</a>
      </p>
    </div>
    <center>
      <vs-button
        transparent
        :active="active == 0"
        @click="active = 0"
        class="comfortaa"
        to="/dashboard"
      >
        Let's get started
      </vs-button>
    </center>


  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
         return {
            cards:[
              {id:1, title:'Grade A',content:"Accredited by NAAC with Grade A++",img:'https://rkmvccrahara.org/upload/Category_54_200723084903526.jpg'},
              {id:2, title:'Ranking',content:"NIRF India ranking: In 2019 - 8th in India, In 2020 11th in India",img:'https://rkmvccrahara.org/upload/Category_54_200724034645297.jpg'},
              {id:3, title:'DBT Star',content:"DBT-STAR College by DBT India",img:'https://rkmvccrahara.org/upload/Category_54_200724034010059.jpg'}
            ],
            active:0
         }
     },
     mounted() {

     },
     created(){

     }
}
</script>
<style scoped>
  

</style>
