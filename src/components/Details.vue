<template>
  <div>
    <vs-row  :key="i"
             v-for="(detail, i) in details" style="padding: 20px">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="2">
        <vs-avatar size="70" badge badge-color="success">
          <img :src="detail.img_src" alt="">
        </vs-avatar>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
        {{detail.id}}
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
        {{ detail.BookName }}
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
        {{detail.borrowedDate}}
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
export default {
  props: {
    details: {
      type: Array,
      required: true
    }
  }
}
</script>