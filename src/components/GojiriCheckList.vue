<script>
</script>

<template>
  <div class="card-list">
    <header>
      <button type="button">버튼</button>
      <div>
        <input type="checkbox" />
        <input type="text" placeholder="제목을 입력하세요" />
        <button type="button">수정</button>
      </div>
      <button type="button">삭제</button>
    </header>
    <ul>
      <li>
        <div class="list">
          <label for="check_1">
            <input id="check_1" type="checkbox">
            <input type="text" placeholder="제목을 입력하세요" readonly />
            <span>이번달만</span>
            <input type="text" placeholder="금액을 입력하세요" readonly />
          </label>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
        <div class="edit">
          <label><input type="radio" name="radio_1"/>매월반복</label>
          <label><input type="radio" name="radio_1" checked/>이번달만</label>
          <label><input type="radio" name="radio_1"/>기간입력</label>
        </div>
      </li>
    </ul>
    <button type="button">추가+</button>
  </div>
</template>