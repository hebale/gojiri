<script setup lang="ts">
import { defineProps, toRefs, computed } from 'vue';
import type { CardItemType } from '@/types';

import {
  addCardItem,
  errorTitleNull,
  changeCardItem,
  removeNewCardItemForm,
  changeCardItemComplete,
  confirmDeleteCardItem
} from '@/services/useCardItemService';

const props = defineProps<{
  isEditable: boolean,
  isNewItem: boolean,
  cloneCardItem: CardItemType,
  method: {
    changeEditable: (status: boolean) => void
    updateClone: () => void
  }
}>();
const { isEditable, isNewItem, cloneCardItem } = toRefs(props);
const { changeEditable, updateClone } = props.method;
const isComplete = computed(() => cloneCardItem.value.COMPLETE === 'Y');

const checkTitleNull = () => {
  if (cloneCardItem.value.TITLE) {
    addCardItem(cloneCardItem.value);
  } else {
    errorTitleNull();
  }
};
</script>

<template>
  <label :for="`checklist_${cloneCardItem.ID}`" :class="{ complete: isComplete }">
    <input type="checkbox" :id="`checklist_${cloneCardItem.ID}`" :checked="isComplete"
      @input="event => changeCardItemComplete(event, cloneCardItem.ID)" />
    <span>체크박스</span>
  </label>

  <slot></slot>

  <div class="control">
    <template v-if="isNewItem">
      <button type="button" class="confirm-btn" @click="() => checkTitleNull()">등록</button>
      <button type="button" class="cancel-btn" @click="() => removeNewCardItemForm(cloneCardItem.ID)">취소</button>
    </template>

    <template v-else-if="isEditable">
      <button type="button" class="confirm-btn" @click="() => {
        changeCardItem(cloneCardItem);
        changeEditable(false);
      }">완료</button>
      <button type="button" class="cancel-btn" @click="() => updateClone()">취소</button>
    </template>

    <template v-else>
      <button type="button" class="modify-btn" @click="() => changeEditable(true)">수정</button>
      <button type="button" class="delete-btn"
        @click="() => confirmDeleteCardItem(cloneCardItem.ID, cloneCardItem.TITLE)">삭제</button>
    </template>
  </div>
</template>