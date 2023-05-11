<script>
export default {
  props: {
    data: Object,
    onConfirm: Function,
    onClose: Function
  }
}
</script>

<template>
  <div class="dim">
    <div class='modal'>
      <h3>삭제</h3>
      <div class="body"> 
        <p>
          <b>{{ data?.TITLE }}</b>
          항목을 삭제하시겠습니까?
        </p>
      </div>
      <div class="control">
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