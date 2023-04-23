<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        test: null
      }
    },
    methods: {
      changeCardVisible: function(params) {
        this.$store.dispatch(
          'testCall',
          { methods: 'PATCH' }
        )
      },
      changeCardName: function(params) {
        this.$store.dispatch(
          'testCall',
          { method: 'PATCH' }
        )
      },
      addCardItemList: function(){
        this.$store
      },
      deleteCardItem: function(){

      }
    }
  }
</script>

<template>
  <div class="card">
    <header>
      <button
        type="button"
        @click="changeCardVisible(data)"
      >
        카드닫기
      </button>
      <h2>
        <input
          type="checkbox"
        />
        <input type="text" placeholder="제목을 입력하세요" :value="data.name" />
        <button
          type="button"
          @click="changeCardName(data)"
        >
          수정
        </button>
      </h2>
      <button
        type="button"
        @click="deleteCardItem(data)"
      >
        카드삭제
      </button>
    </header>
    <ul>
      <slot />
    </ul>
    <button
      type="button"
      @click="addCardItemList(data)"
    >
      추가+
    </button>
  </div>
</template>