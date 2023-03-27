<script>
  import GoCheckList from './Go-Checklist.vue';

   export default {
    components: {
      GoCheckList,  
    }
   }
</script>

<template>
  <div class="card">
    <header>
      <button type="button">카드닫기</button>
      <h2>
        <input type="checkbox" />
        <input type="text" placeholder="제목을 입력하세요" />
        <button type="button">수정</button>
      </h2>
      <button type="button">카드삭제</button>
    </header>

    <ul>
      <template v-for="list in 20" key="list">
        <GoCheckList />
      </template>
    </ul>

    <button type="button">추가+</button>
  </div>
</template>