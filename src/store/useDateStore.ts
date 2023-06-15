import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

import { getYear, getMonth } from 'date-fns';

export const useDateStore = defineStore('date-store', () => {
  const yearData = ref<number>(getYear(new Date()));
  const monthData = ref<number>(getMonth(new Date()) + 1);

  const yearRange = reactive<number[]>(
    Array(100).fill(0).map((_: number, index): number => index + 1991)
  );
  const monthRange = reactive<number[]>(
    Array(12).fill(0).map((_: number, index): number => index + 1)
  );

  return {
    yearData,
    monthData,
    yearRange,
    monthRange,
    prevMonth: computed(() => {
      const month = monthData.value - 1;
      if (month < 1) return `${yearData.value - 1}12`;
      return `${yearData.value}${month < 10 ? "0" + month : month}`;
    }),
    nextMonth: computed(() => {
      const month = monthData.value + 1;
      if (month > 12) return `${yearData.value + 1}01`;
      return `${yearData.value}${month < 10 ? "0" + month : month}`;
    }),
    getPeriodData: computed(() => `${yearData.value}${monthData.value < 10
      ? "0" + monthData.value
      : monthData.value}`
    ),
    setPeriodData: ({ year, month }: { year?: number, month?: number }) => {
      if (year) yearData.value = year;
      if (month) monthData.value = month;
    }
  }
});
