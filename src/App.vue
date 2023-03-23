
<script>
  import GoHeader from './layout/Go-Header.vue';
  import GoContents from './layout/Go-Contents.vue';
  import GoConfirm from './components/Go-Confirm.vue';
  import GoDatepicker from './components/Go-Datepicker.vue';

  export default {
    components: {
      GoHeader,
      GoContents,
      GoConfirm,
      GoDatepicker
    },
    mounted(){
      this.$nextTick(() => console.log('loaded'))
    }
  }
</script>

<template>
  <main class="gojiri">
    <GoHeader />
    <GoContents />

    <GoConfirm />
    <GoDatepicker />
  </main>
</template>

<style lang='sass'>
@import './assets/sass/style.scss'
</style>