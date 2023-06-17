<script setup lang="ts">
import { ref, toRefs } from 'vue';
import type { CardItemType } from '@/types';

import CardItemControl from '@/components/card/CardItemControl.vue';
import CardItemInput from '@/components/card/CardItemInput.vue';

const props = defineProps<{
  cardItem: CardItemType
}>();
const { cardItem } = toRefs(props);

const cloneCardItem = ref<CardItemType>({ ...cardItem.value });
const isEditable = ref<boolean>(false);
const isNewItem = ref<boolean>(cardItem.value.CREATED === undefined);

const changeEditable = (state: boolean) => {
  isEditable.value = state;
};
const changeTitle = (event: Event) => {
  cloneCardItem.value.TITLE = (<HTMLInputElement>event.target).value;
};
const changeAmount = (event: Event) => {
  cloneCardItem.value.AMOUNT = parseInt((<HTMLInputElement>event.target).value, 10);
};
const changePeriod = ({ repeat, startDate, endDate }: { repeat: 'Y' | 'N', [key: string]: string | null }) => {
  cloneCardItem.value.REPEAT = repeat;
  cloneCardItem.value.START_DATE = startDate;
  cloneCardItem.value.END_DATE = endDate;
};
const updateClone = () => {
  cloneCardItem.value = { ...cardItem.value };
  isEditable.value = false;
};
</script>

<template>
  <li :class="{ edit: isEditable, clone: isNewItem }">
    <CardItemControl :cloneCardItem="cloneCardItem" :isEditable="isEditable" :isNewItem="isNewItem"
      :method="{ changeEditable, updateClone }">
      <CardItemInput :cardItem="cardItem" :cloneCardItem="cloneCardItem" :isEditable="isEditable" :isNewItem="isNewItem"
        :method="{ changeTitle, changeAmount, changePeriod }" />
    </CardItemControl>
  </li>
</template>