<script setup lang="ts">
import type { DateType } from '@/types'
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useDateStore } from '@/store/useDateStore';
import { useCardStore } from '@/store/useCardStore';

import HorizonFlicker from '@/components/flicker/HorizonFlicker.vue';

const { yearData, monthData } = storeToRefs(useDateStore());
const { incompleted } = storeToRefs(useCardStore());
const initDate = ref<DateType>({
  year: yearData.value,
  month: monthData.value
});
const incompletedMonth = computed(() => incompleted.value.map(date => parseInt(date.substring(4, 6), 10) - 1));

</script>

<template>
  <header>
    <h1>
      <a href="/"><img src="" alt="" />GOJIRI</a>
    </h1>
    <HorizonFlicker :initDate="initDate" :incompleted="incompletedMonth" />
  </header>
</template>