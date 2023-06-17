<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useDateStore } from '@/store/useDateStore';
import { useCardStore } from '@/store/useCardStore';

import { toDateFormat } from '@/common/util';

import VerticalFlicker from '@/components/flicker/VerticalFlicker.vue';

const { getPeriodData } = storeToRefs(useDateStore());
const { cardDates } = storeToRefs(useCardStore());
const updateProps = defineEmits(['update:modelValue']);
const formatedDates = computed(() => cardDates.value.map((date) => toDateFormat(date)));

onMounted(() => {
  updateProps('update:modelValue', {
    cloneMonth: cardDates.value[0],
    month: getPeriodData,
    isError: false
  });
});
const changeYearMonth = (index: number) => {
  updateProps('update:modelValue', {
    cloneMonth: cardDates.value[index],
    month: getPeriodData
  });
};
</script>

<template>
  <div class="picker-wrap">
    <div class="month-module">
      <div>
        <VerticalFlicker :dates="formatedDates" :onChanged="(index: number) => changeYearMonth(index)" />
      </div>
    </div>
  </div>
</template>