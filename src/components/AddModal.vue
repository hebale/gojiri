<script>
export default {
  props: {
    onConfirm: Function,
    onClose: Function
  },
  data() {
    return {
      cardTitle: '',
      isNull: false
    }
  },
  mounted(){
    this.cardTitle = '';
    this.isNull = false;
  },
  methods: {
    addCardData(){
      if(!this.cardTitle) {
        this.isNull = true;
        return;
      };
      this.onConfirm({
        MONTH: `${this.$store.state.year}${this.$store.state.month}`,
        TITLE: this.cardTitle,
      });
    },
    changeTitle(){
      if(this.cardTitle) this.isNull = false;
    }
  }
}
</script>

<template>
  <div class="dim">
    <div class='modal'>
      <h3>카드추가</h3>
      <div class="body">
        <input type="text" placeholder="카드명 입력" v-model='cardTitle' @input='changeTitle'>
        <span v-if="isNull">카드명을 입력해주세요!</span>
      </div>
      <div class="control">
        <button
          type="button"
          @click="addCardData()"
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