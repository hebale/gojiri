<script>
  export default {
    props: {
      data: Object,
      openDeleteModal: Function,
      changeItemList: Function
    },
    data() {
      return {
        isEditable: false
      }
    },
    methods: {
      changeEditable: function() {
        console.log(this)
        this.$data.isEditable = !this.$data.isEditable;
      }
    }
  }
</script>

<template>
  <li :class="isEditable ? 'edit' : ''" >
    <div class="list">
      <label for="check_1">
        <input id="check_1" type="checkbox">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          :value="data.name"
          :readonly="isEditable"
        />
        <span>이번달만</span>
        <input
          type="text"
          placeholder="금액을 입력하세요"
          :value="data.amount"
          :readonly="isEditable"
        />
      </label>
      <button type="button"
        @click="changeEditable"      
      >
        {{isEditable ? "완료" : "수정"}}
      </button>
      <button
        type="button"
        @click='openDeleteModal(data)'
      >
        삭제
      </button>
    </div>
    <div class="edit">
      <label><input type="radio" name="radio_1"/>매월반복</label>
      <label><input type="radio" name="radio_1" checked/>이번달만</label>
      <label><input type="radio" name="radio_1"/>기간입력</label>
    </div>
  </li>
</template>