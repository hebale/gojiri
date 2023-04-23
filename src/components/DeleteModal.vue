<script>
export default {
  props: {
    state: Boolean,
    data: Object,
    onConfirm: Function,
    onClose: Function
  }
}
</script>

<template>
  <div class="dim" v-show="state">
    <div class='modal'>
      <p>
        <b>{{ data?.name }}</b>
        항목을 삭제하시겠습니까?
      </p>
      <div>
        <button
          type="button"
          @click="onConfirm(data)"
        >
          삭제
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