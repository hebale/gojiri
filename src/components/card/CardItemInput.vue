<script setup lang="ts">
import type { CardItemType } from '@/types';
import { defineProps, ref, toRefs, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useDateStore } from '@/store/useDateStore';

import { changeCardItemPeriod } from '@/services/useCardItemService';
import { toAmountFormat, toDateFormat } from '@/common/util';

const periodType = ['매월반복', '이번달만', '기간입력'];
const props = defineProps<{
  cardItem: CardItemType
  cloneCardItem: CardItemType
  isEditable: boolean
  isNewItem: boolean
  method: {
    changeTitle: (event: Event) => void
    changeAmount: (event: Event) => void
    changePeriod: ({ repeat, startDate, endDate }: { repeat: 'Y' | 'N', [key: string]: string | null }) => void
  }
}>();
const { cardItem, cloneCardItem, isEditable, isNewItem } = toRefs(props);
const { changeTitle, changeAmount, changePeriod } = props.method;
const { getPeriodData } = storeToRefs(useDateStore());

const isCloneData = computed(() => isEditable.value || isNewItem.value);
const title = computed(() => isCloneData.value ? cloneCardItem.value.TITLE : cardItem.value.TITLE);
const amount = computed(() => isCloneData.value ? cloneCardItem.value.AMOUNT : toAmountFormat(cardItem.value.AMOUNT));
const period = computed(() => isCloneData.value
  ? `${toDateFormat(cloneCardItem.value.START_DATE)} ~ ${toDateFormat(cloneCardItem.value.END_DATE)}`
  : `${toDateFormat(cardItem.value.START_DATE)} ~ ${toDateFormat(cardItem.value.END_DATE)}`
);
const hasPeriod = computed(() => cardItem.value.START_DATE && cardItem.value.END_DATE && (cardItem.value.START_DATE !== cardItem.value.END_DATE));
const checkPeriodType = computed(() => ({ REPEAT, START_DATE, END_DATE }: CardItemType) => {
  if (REPEAT === 'Y') return '매월반복';
  if (START_DATE === END_DATE) return '이번달만';
  return '기간입력';
});
const expire = ref<string>(checkPeriodType.value(cloneCardItem.value));
const changePeriodType = (name: string) => {
  const isRepeat = name === '매월반복';
  const startDate = name === '기간입력' && !isNewItem ? cardItem.value.START_DATE : getPeriodData.value;
  const endDate = name === '기간입력' && !isNewItem ? cardItem.value.END_DATE : getPeriodData.value;

  changePeriod({
    repeat: isRepeat ? 'Y' : 'N',
    startDate: isRepeat ? null : startDate,
    endDate: isRepeat ? null : endDate
  });
};
const changePeriodDate = (dates: { [key: string]: number }) => {
  changePeriod({
    repeat: 'N',
    startDate: `${dates.startYear}${dates.startMonth < 10 ? "0" + dates.startMonth : dates.startMonth}`,
    endDate: `${dates.endYear}${dates.endMonth < 10 ? "0" + dates.endMonth : dates.endMonth}`,
  });
}
</script>

<template>
  <div class="input">
    <div class="group">
      <input type="text" class="title-input" placeholder="제목 입력" :value="title" @input="event => changeTitle(event)" />
      <label class="amount">
        <input :type="isCloneData ? 'number' : 'text'" placeholder="금액 입력" :value="amount"
          @input="event => changeAmount(event)" />
        <span class="unit">원</span>
      </label>
    </div>

    <template v-if="isEditable || isNewItem">
      <div class="group">
        <div class="setting">
          <label v-for="name in periodType" :key="name">
            <input type="radio" :name="`radio_${cardItem.PARENTS_ID}_${cardItem.ID}`" :value="name" v-model="expire"
              :checked="checkPeriodType(cardItem) === name" @change="() => changePeriodType(name)">
            <span>{{ name }}</span>
          </label>
        </div>
      </div>

      <div class="group" v-if="expire === '기간입력'">
        <button type="button" class="date-btn"
          @click="() => changeCardItemPeriod(cloneCardItem.START_DATE, cloneCardItem.END_DATE, changePeriodDate)">
          <span class="start-date">{{ toDateFormat(cloneCardItem.START_DATE) }}</span>
          ~
          <span class="end-date">{{ toDateFormat(cloneCardItem.END_DATE) }}</span>
        </button>
      </div>
    </template>
    <template v-else>
      <div class="group">
        <span class="period-type">{{ checkPeriodType(cardItem) }}</span>
        <div class="period" v-if="hasPeriod">{{ period }}</div>
      </div>
    </template>
  </div>
</template>