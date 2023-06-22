<script setup lang="ts">
import type { DateType, FlickerType } from '@/types';
import type { FlickingOptions } from '@egjs/vue3-flicking'
import { ref, toRefs, onMounted } from 'vue'
import Flicker from '@egjs/vue3-flicking'

import { useDateStore } from '@/store/useDateStore';
import { useCardStore } from '@/store/useCardStore';

const props = defineProps<{
  initDate: DateType
  incompleted: number[]
  optionsProps?: Partial<FlickingOptions>
}>();
const { initDate, optionsProps } = props;
const { incompleted } = toRefs(props);

const { monthRange, setPeriodData } = useDateStore();
const { updateLoading, updateCards } = useCardStore();

const flicking = ref<HTMLUListElement & FlickerType | null>(null);
const flickerDate = ref(initDate);
const options: Partial<FlickingOptions> = {
  autoInit: false,
  defaultIndex: flickerDate.value.month - 1,
  panelsPerView: 3,
  circular: true,
  // renderOnlyVisible: true,
  noPanelStyleOverride: true,
  align: 'center',
  duration: 350,
  preventClickOnDrag: true,
  ...(optionsProps && { ...optionsProps })
};

onMounted(() => {
  flicking.value?.init();
});

const motionTransform = (currentTarget, direction?) => {
  const { abs, floor, max } = Math;
  const fontRange = [16, 26];
  const scaleRange = [0.68, 1];
  let nowValue = null;

  currentTarget.panels.forEach(panel => {
    if (panel.rendered) {
      const progress = abs(floor(panel.outsetProgress * 100) / 100);

      panel.element.style.fontSize = `${max(fontRange[0], parseInt((fontRange[1] - progress * 24).toFixed(2), 10))}px`;
      panel.element.style.transform = `scale(${max(scaleRange[0], 1 - progress / scaleRange[1])})`;

      if (incompleted.value.indexOf(panel.index) > -1) {
        console.log(panel);
        panel.element.classList.add('incompleted');
      } else {
        panel.element.classList.remove('incompleted');
      }

      if (abs(panel.outsetProgress) < 0.2) {
        panel.element.classList.add('active');
        nowValue = panel.index + 1;
      } else {
        panel.element.classList.remove('active');
      }
    };
  });

  if (nowValue) {
    if (direction === 'PREV' && flickerDate.value.month < nowValue) flickerDate.value.year -= 1;
    if (direction === 'NEXT' && flickerDate.value.month > nowValue) flickerDate.value.year += 1;
    flickerDate.value.month = nowValue;
  }
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
    month: index + 1
  });
  updateCards();
};
const onMoveEnd = (currentTarget) => {
  motionTransform(currentTarget);
  updateLoading(false);
};
</script>

<template>
  <p class="year">{{ flickerDate.year }}</p>
  <Flicker ref="flicking" :cameraTag="'ul'" :options="options"
    @ready="({ currentTarget }) => motionTransform(currentTarget)" @moveStart="() => updateLoading(true)"
    @move="({ currentTarget, direction }) => motionTransform(currentTarget, direction)"
    @changed="({ index }) => onChanged(index)" @moveEnd="({ currentTarget }) => onMoveEnd(currentTarget)"
    @holdEnd="({ currentTarget }) => motionTransform(currentTarget)">
    <li v-for="(value, index) in monthRange" :key="`month_${value}`"
      :class="{ active: index === flickerDate.month - 1, incompleted: incompleted!.indexOf(index) > -1 }">
      <button type="button"><span>{{ value }}</span></button>
    </li>
    <template #viewport>
      <button type="button" class="prev" @click="slideToPrev">이전</button>
      <button type="button" class="next" @click="onSlideToNext">다음</button>
    </template>
  </Flicker>
</template>