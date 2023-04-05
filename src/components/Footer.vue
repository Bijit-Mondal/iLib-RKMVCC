<template>
    <div class="grid" style="padding-top:20px;">
        <hr>
        <vs-row>
            <vs-col :w="w">
            <p class="contact_font" ><b>Contact Us</b></p>
            <h5 class="contact_font"  >Address: Ramakrishna Mission
        Vivekananda Centenary College
        Rahara Kolkata - 700118
      </h5>
            </vs-col>
            <vs-col :w="w">
            <p class="contact_font" ><b>Contact Developer</b></p>
            <h5 class="contact_font" ><a href="https://wa.me/6291171004" style="text-decoration:none" class="contact_font">WhatsApp : 6291171004</a></h5>
            </vs-col>
            <vs-col :w="w">
            <p class="contact_font" ><b>Further Development</b></p>
            <h5 class="contact_font" >This is a open source project where you can contribute and make it better</h5>
            </vs-col>

            <vs-col w=12>
            <p class="contact_font" style="text-align:right;">©
                <a class="contact_font" target="blank" href="https://rkmvccrahara.org">rkmvccrahara.org</a>
                Developed By
                <a class="contact_font" href="https://github.com/Bijit-Mondal">Bijit Mondal</a>
            </p>

            </vs-col>
        </vs-row>
    </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
         return {
            w: 12,
            windowWidth: 721,
            active:0
         }
     },
     mounted() {
       window.addEventListener('resize', () => {
         this.windowWidth = window.innerWidth;
         if(this.windowWidth>990){
           this.w=4;
         }
       })
     },
     created(){
       this.windowWidth = window.innerWidth;
       if(this.windowWidth>990){
         this.w=4;
       }
     }
}
</script>

<style scoped>
  .contact_font{
    /* font-family: 'Merriweather', serif; */
    /* font-family:'Vujahday Script', comfortaa; */
    font-family: 'comfortaa', comfortaa;
    /* font-size: 20px; */
    font-weight:1200;
    color:lavender;
    text-decoration:none;
  }
  .comfortaa{
    font-family: 'comfortaa', comfortaa;
  }
  .Vujahday{
    font-family:'Vujahday Script', comfortaa;
  }
  .comfortaa{
    font-family: comfortaa;
  }
</style>
