<template>
  <div>
    <vs-alert v-model="alertSignal.bool" style="margin-bottom:20px;">
      <template #title>
        {{alertSignal.type}}
      </template>
      {{alertSignal.message}}
    </vs-alert>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  props: {
    alertSignal: {
      type: Object,
      required: true
    }
  }
}
</script>