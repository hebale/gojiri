<script setup lang="ts">
import type { DateType, FlickerType } from '@/types';
import type { FlickingOptions } from '@egjs/vue3-flicking'
import { ref, toRefs } from 'vue'
import FlickingComp from '@egjs/vue3-flicking'

import { useDateStore } from '@/store/useDateStore';
import { useCardStore } from '@/store/useCardStore';

const props = defineProps<{
  initDate: DateType
  incompleted?: number[]
  optionsProps?: Partial<FlickingOptions>
}>();
const { initDate, optionsProps } = props;
const { incompleted } = toRefs(props);

const { monthRange, setPeriodData } = useDateStore();
const { updateCards } = useCardStore();

const flicking = ref<HTMLUListElement & FlickerType | null>(null);
const flickerDate = ref(initDate);
const options: Partial<FlickingOptions> = {
  defaultIndex: flickerDate.value.month - 1,
  panelsPerView: 3,
  circular: true,
  align: 'center',
  duration: 350,
  preventClickOnDrag: true,
  ...(optionsProps && { ...optionsProps })
};

const motionTransform = (currentTarget, direction?) => {
  const { abs, floor, max } = Math;
  const fontRange = [16, 26];
  const scaleRange = [0.7, 2.1];

  currentTarget.panels.forEach((panel) => {
    const progress = abs(floor(panel.progress * 100) / 100);
    // panel.element.querySelector('span')!.style.fontSize = `${max(fontRange[0], fontRange[1] - progress * 10)}px`;
    panel.element.style.fontSize = `${max(fontRange[0], parseInt((fontRange[1] - progress * 10).toFixed(2), 10))}px`;
    panel.element.querySelector('button')!.style.transform = `scale(${max(scaleRange[0], 1 - progress / scaleRange[1])})`
    if (progress < 0.2) {
      panel.element.classList.add('active')
    } else {
      panel.element.classList.remove('active')
    }
  });

  const nowValue = currentTarget.panels
    .filter(panel => abs(floor(panel.progress * 100) / 100) < 0.9)[0].element.innerText;
  if (direction === 'PREV' && flickerDate.value.month < parseInt(nowValue)) flickerDate.value.year -= 1;
  if (direction === 'NEXT' && flickerDate.value.month > parseInt(nowValue)) flickerDate.value.year += 1;

  flickerDate.value.month = parseInt(nowValue);
};
const slideToPrev = () => {
  if (flicking.value && !flicking.value.animating) flicking.value.prev();
};
const onSlideToNext = () => {
  if (flicking.value && !flicking.value.animating) flicking.value.next();
};
const onChanged = (index: number) => {
  setPeriodData({
    ...flickerDate.value,
    month: monthRange[index]
  });
  updateCards();
};
</script>

<template>
  <p class="year">{{ flickerDate.year }}</p>
  <flicking-comp ref="flicking" :cameraTag="'ul'" :options="options"
    @ready="({ currentTarget }) => motionTransform(currentTarget)"
    @move="({ currentTarget, direction }) => motionTransform(currentTarget, direction)"
    @changed="({ index }) => onChanged(index)">
    <li v-for="(value, index) in monthRange" :key="`month_${value}`">
      <button type="button" :class="{ incomplete: incompleted!.indexOf(index) > -1 }">
        <span>{{ value }}</span>
      </button>
    </li>
    <template #viewport>
      <button type="button" class="prev" @click="slideToPrev">이전</button>
      <button type="button" class="next" @click="onSlideToNext">다음</button>
    </template>
  </flicking-comp>
</template>