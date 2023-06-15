<script setup lang="ts">
import type { CardType } from '@/types'
import { ref, toRefs } from 'vue';

import { confirmDeleteCard } from '@/services/useCardService';
import { addNewCardItemForm } from '@/services/useCardItemService';

const props = defineProps<{
  card: CardType
  method: {
    openCardAccordion: () => void
    closeCardAccordion: () => void
  }
}>();
const { card } = toRefs(props);
const isVisible = ref<boolean>(card.value.VIEW === 'Y');
const { openCardAccordion, closeCardAccordion } = props.method;
const changeCardView = () => {
  if (isVisible.value) {
    closeCardAccordion();
  } else {
    openCardAccordion();
  }
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <header>
    <button type="button" class="view-btn" :class="{ active: isVisible }" @click="() => changeCardView()">
      {{ isVisible ? '카드열기' : '카드닫기' }}
    </button>
    <slot name="cardInput"></slot>
    <button type="button" class="delete-btn" @click="() => confirmDeleteCard(card.ID, card.TITLE)">카드삭제</button>
  </header>
  <ul>
    <slot name="cardItem"></slot>
  </ul>
  <button type="button" @click="() => addNewCardItemForm(card.ID)">아이템 추가</button>
</template>