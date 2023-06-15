<script setup lang="ts">
import type { CardType } from '@/types';
import { defineProps, ref, computed, toRefs, onMounted } from 'vue';

import { changeCardTitle, errorTitleNull } from '@/services/useCardService';

const props = defineProps<{
  card: CardType
  isIncompleted: boolean
}>();
const { card, isIncompleted } = toRefs(props);
const title = ref<string>(card.value.TITLE);
const p = ref<HTMLParagraphElement>();
const input = ref<HTMLInputElement>();
const inputWidth = ref<number>(0);

const isEditable = ref<boolean>(false);
const isChanged = computed(() => title.value !== card.value.TITLE);

onMounted(() => {
  changeInputWidth(title.value);
});

const inputChangeTitle = (event: Event) => changeInputWidth((<HTMLInputElement>event.target).value);
const changeInputWidth = (string: string) => {
  title.value = string;
  if (p.value) {
    p.value.innerText = string;
    inputWidth.value = parseInt(getComputedStyle(p.value).width, 10) + 4;
  };
};
const changeEditable = () => {
  if (!isEditable.value) input.value?.focus();
  isEditable.value = !isEditable.value;
};
const checkTitleNull = () => {
  if (title.value) {
    if (isChanged) changeCardTitle(card.value.ID, title.value);
    changeEditable();
  } else {
    errorTitleNull(() => {
      inputWidth.value = 70;
      input.value?.focus();
    });
  }
};
</script>

<template>
  <h2 :class="{ incompleted: isIncompleted }">
    <input ref="input" type="text" placeholder="타이트 입력" :value="title"
      :style="{ width: inputWidth ? `${inputWidth}px` : 'auto' }" @input="event => inputChangeTitle(event)"
      :readonly="!isEditable">
    <p ref="p" class="hidden-title"></p>

    <template v-if="isEditable">
      <button type="button" class="confirm-btn" @click="() => checkTitleNull()">확인</button>
    </template>
    <template v-else>
      <button type="button" class="modify-btn" @click="() => changeEditable()">수정</button>
    </template>
  </h2>
</template>