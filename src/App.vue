
<script>
  import GojiriHeader from './layout/GojiriHeader.vue'
  import GojiriBody from './layout/GojiriBody.vue'

  export default {
    components: {
      GojiriHeader,
      GojiriBody,
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
  </main>
</template>

<style lang='sass'>
@import './assets/sass/style.scss'
</style>