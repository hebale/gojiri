import type { CardType, QueryType, BodyType } from '@/types';
import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

import { useDateStore } from '@/store/useDateStore';

import Http from '@/common/http';
import { toDateFormat } from '@/common/util';

export const useCardStore = defineStore('card-store', () => {
  const { getPeriodData, prevMonth, nextMonth } = storeToRefs(useDateStore());

  const loading = ref<boolean>(false);
  const cards = ref<CardType[]>([]);
  const cardDates = ref<string[]>([]);
  const incompleted = ref<string[]>([]);
  const validCards = computed(() => cards.value.map(card => card.ITEMS.filter(item => {
    if (item.END_DATE === null) return true;
    return Number(item.END_DATE) >= Number(getPeriodData.value) && Number(item.START_DATE) <= Number(getPeriodData.value)
  })));
  const updateLoading = (bool: boolean) => {
    loading.value = bool;
  };
  const updateCards = () => {
    getCards({ MONTH: getPeriodData.value });
    totalCardsMonth();
    incompletedMonths({
      MONTH: `${prevMonth.value},${getPeriodData.value},${nextMonth.value}`
    });
  };
  const cloneCards = async (body: Partial<BodyType>) => {
    updateLoading(true);
    const { code } = await Http.post('cards-clone-month', body);
    if (code === 200) updateCards();
  };
  const incompletedMonths = async (queries: QueryType) => {
    const { code, data } = await Http.get('incompleted-months', queries);
    if (code === 200) incompleted.value = (<string[]>data);
  };
  const totalCardsMonth = async () => {
    const { code, data } = await Http.get('total-card-months');
    if (code === 200) cardDates.value = (<string[]>data);
  };
  const getCards = async (queries: QueryType) => {
    const { code, data } = await Http.get('cards', queries);
    if (code === 200) {
      cards.value = data ? (<CardType[]>data) : [];
      updateLoading(false);
    }
  };
  const postCard = async (body: Partial<BodyType>) => {
    const { code } = await Http.post('cards', body);
    if (code === 200) updateCards();
  };
  const patchCard = async (body: Partial<BodyType>) => {
    const { code } = await Http.patch('cards', body);
    if (code === 200) updateCards();
  };
  const deleteCard = async (body: Partial<BodyType>) => {
    const { code } = await Http.delete('cards', body);
    if (code === 200) updateCards();
  };
  updateCards();

  return {
    loading,
    updateLoading,
    cards,
    cardDates,
    incompleted,
    updateCards,
    cloneCards,
    getCards,
    postCard,
    patchCard,
    deleteCard,
    hasCardItem: computed(() => cards.value.length > 0),
    getCardDates: computed(() => cardDates.value.map(date => toDateFormat(date))),
    completedAmount: computed(() =>
      validCards.value.map(card => card.reduce((a, b) => b.COMPLETE === 'Y' ? a + b.AMOUNT : a, 0)).reduce((a, b) => a + b, 0)
    ),
    totalAmount: computed(() =>
      validCards.value.map(card => card.reduce((a, b) => a + b.AMOUNT, 0)).reduce((a, b) => a + b, 0)
    )
  };
})