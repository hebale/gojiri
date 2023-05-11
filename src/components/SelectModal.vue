<script>
  import DateFlicker from './FlickingComp.vue';

  export default {
    components: {
      DateFlicker
    },
    props: {
      onConfirm: Function,
      onClose: Function
    },
    mounted() {
      this.cardList();
    },
    data(){
      return {
        selectMonth: null,
        period: []
      }
    },
    computed: {
      formatDate(){
        return (date) => {
          return String(date).replace(/(\d{4})(\d{2})/, '$1-$2');
        };
      },
    },
    methods: {
      async cardList(){
        const { code, data } = await this.$store.dispatch('fetchApi', {
          method: 'GET',
          path: 'cards-all'
        });

        if(code === 200) {
          this.period = data;
          this.selectMonth = data[0];
        }
      },
      setCardMonth(data){
        this.selectMonth = data.replace(/-/g,'');
      }
    }
  }
</script>

<template>
  <div class="dim" v-if="period.length">
    <div class='modal'>
      <h3>카드기간선택</h3>
      <div class="body">
        <div class="picker-wrap">
          <div class="month-module">
            <div>
              <date-flicker
                :data="period.map(el => formatDate(el))"
                :onChanged="setCardMonth"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="control">
        <button
          type="button"
          @click="onConfirm({ CLONE_MONTH: selectMonth })"
        >
          등록
        </button>
        <button
          type="button"
          @click="onClose()"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>