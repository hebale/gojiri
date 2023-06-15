import type { CardItemType, BodyType } from '@/types';
import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useCardStore } from '@/store/useCardStore'

import Http from '@/common/http';

export const useCardItemStore = defineStore('card-item', () => {
  const { updateCards } = useCardStore();
  const newCardItems = ref<CardItemType[]>([]);

  const postCardItem = async (body: Partial<BodyType>) => {
    const { code } = await Http.post('cards-items', body);
    if (code === 200) updateCards();
  };
  const patchCardItem = async (body: Partial<BodyType>) => {
    const { code } = await Http.patch('cards-items', body);
    if (code === 200) updateCards();
  };
  const deleteCardItem = async (body: Partial<BodyType>) => {
    const { code } = await Http.delete('cards-items', body);
    if (code === 200) updateCards();
  };

  return {
    newCardItems,
    postCardItem,
    patchCardItem,
    deleteCardItem,
    addNewCardItem: (cardItem: CardItemType) => newCardItems.value.push(cardItem),
    removeNewCardItem: (id: number) => {
      newCardItems.value = newCardItems.value.filter(cardItem => cardItem.ID !== id)
    }
  }
});