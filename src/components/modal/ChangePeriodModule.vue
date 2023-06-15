<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useDateStore } from '@/store/useDateStore';
import { compareYearMonth } from '@/common/util';

import VerticalFlicker from '@/components/flicker/VerticalFlicker.vue';

const dateStore = useDateStore();
const { yearData, monthData } = storeToRefs(dateStore);
const { yearRange, monthRange } = dateStore;

const { props, modelValue } = defineProps(['props', 'modelValue']);

const period = ref<{ [key: string]: number }>({ ...props });
const updateProps = defineEmits(['update:modelValue']);

onMounted(() => {
  updateProps('update:modelValue', {
    isError: false,
  });
});

const changePeriod = (dates: { [key: string]: number }) => {
  period.value = { ...period.value, ...dates }

  const { startYear, startMonth, endYear, endMonth } = period.value;
  const startDate = [startYear, startMonth];
  const endDate = [endYear, endMonth];
  const nowDate = [yearData.value, monthData.value];

  const validate = {
    isWrong: compareYearMonth(startDate, endDate) === 1,
    isExcluded: compareYearMonth(startDate, nowDate) === 1 || compareYearMonth(endDate, nowDate) === -1
  };

  updateProps('update:modelValue', {
    ...period.value,
    ...validate,
    isError: validate.isWrong || validate.isExcluded
  });
};
</script>

<template>
  <div class="picker-wrap">
    <div class="start-date-module">
      <p>시작날짜</p>
      <div>
        <VerticalFlicker :dates="yearRange" :optionsProps="{ defaultIndex: yearRange.indexOf(period.startYear) }"
          :onChanged="(index: number) => changePeriod({ startYear: yearRange[index] })" />
        <VerticalFlicker :dates="monthRange" :optionsProps="{ defaultIndex: monthRange.indexOf(period.startMonth) }"
          :onChanged="(index: number) => changePeriod({ startMonth: monthRange[index] })" />
      </div>
    </div>
    <div class="end-date-module">
      <p>종료날짜</p>
      <div>
        <VerticalFlicker :dates="yearRange" :optionsProps="{ defaultIndex: yearRange.indexOf(period.endYear) }"
          :onChanged="(index: number) => changePeriod({ endYear: yearRange[index] })" />
        <VerticalFlicker :dates="monthRange" :optionsProps="{ defaultIndex: monthRange.indexOf(period.endMonth) }"
          :onChanged="(index: number) => changePeriod({ endMonth: monthRange[index] })" />
      </div>
    </div>
  </div>
  <span class="error" v-if="modelValue.isWrong">* 시작날짜가 종료날짜보다 큽니다.</span>
  <span class="error" v-if="modelValue.isExcluded">* 현재날짜가 설정된 기간에 포함되지 않습니다.</span>
</template>