
<script>
  import GojiriHeader from './layout/GojiriHeader.vue';
  import GojiriBody from './layout/GojiriBody.vue';
  import GojiriConfirm from './components/GojiriConfirm.vue';
  import GojiriDatePicker from './components/GojiriDatePicker.vue';

  export default {
    components: {
      GojiriHeader,
      GojiriBody,
      GojiriConfirm,
      GojiriDatePicker
    },
    mounted(){
      this.$nextTick(() => console.log('loaded'))
    }
  }
</script>

<template>
  <main class="gojiri">
    <GojiriHeader />
    <GojiriBody />

    <GojiriConfirm />
    <GojiriDatePicker />
  </main>
</template>

<style lang='sass'>
@import './assets/sass/style.scss'
</style>