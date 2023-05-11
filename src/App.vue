
<script>
  import FlickHeader from './layout/FlickHeader.vue';
  import ContentsBody from './layout/ContentsBody.vue';

  export default {
    components: {
      FlickHeader,
      ContentsBody
    },
    mounted(){
      // this.$nextTick(() => console.log('loaded'))
    }
  }
</script>

<template>
  <main class="gojiri">
    <flick-header />
    <contents-body />
  </main>
</template>

<style lang='sass'>
@import './assets/scss/style.scss'
</style>