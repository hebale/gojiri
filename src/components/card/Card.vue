<script setup lang="ts">
import type { CardType, CardItemType } from '@/types';
import { defineProps, computed, ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';

import { useDateStore } from '@/store/useDateStore';
import { useCardItemStore } from '@/store/useCardItemStore';

import { openCardView, closeCardView } from '@/services/useCardService';

import CardControl from '@/components/card/CardControl.vue';
import CardInput from '@/components/card/CardInput.vue';
import CardItem from '@/components/card/CardItem.vue';

const props = defineProps<{ card: CardType }>();
const { getPeriodData } = storeToRefs(useDateStore());
const { newCardItems } = storeToRefs(useCardItemStore());

const { card } = toRefs(props);
const cardItems = computed(() => card.value.ITEMS.filter(item => {
  if (item.END_DATE === null) return true;
  return Number(item.END_DATE) >= Number(getPeriodData.value)
}));
const isVisible = computed(() => card.value.VIEW === 'Y');
const isIncompleted = computed(() => !cardItems.value.every(el => el.COMPLETE === 'Y'));
const cardDiv = ref<HTMLDivElement | null>(null);
const childNewCardItems = computed(() => (id: number) => {
  return newCardItems.value.filter((cardItem: CardItemType) => cardItem.PARENTS_ID === id);
});
const openCardAccordion = () => {
  if (cardDiv.value) openCardView(cardDiv.value, card.value.ID, cardDiv.value.children[0].clientHeight);
};
const closeCardAccordion = () => {
  if (cardDiv.value) closeCardView(cardDiv.value, card.value.ID, cardDiv.value.children[0].clientHeight);
};
</script>

<template>
  <div class="card" ref="cardDiv" :style="{ height: isVisible ? 'auto' : '44px' }">
    <div class="inner">
      <CardControl :card="card" :method="{ openCardAccordion, closeCardAccordion }">
        <template v-slot:cardInput>
          <CardInput :card="card" :isIncompleted="isIncompleted"></CardInput>
        </template>
        <template v-slot:cardItem>
          <CardItem v-for="cardItem in cardItems" :key="`checklist_${card.ID}_${cardItem.ID}`" :cardItem="cardItem" />
          <CardItem v-for="cardItem in childNewCardItems(card.ID)" :key="`checklist_${card.ID}_${cardItem.ID}`"
            :cardItem="cardItem" />
        </template>
      </CardControl>
    </div>
  </div>
</template>