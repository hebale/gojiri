<script setup lang="ts">
import type { FlickerType } from '@/types';
import type { FlickingOptions } from '@egjs/vue3-flicking';
import { onMounted, ref } from 'vue';
import Flicker from '@egjs/vue3-flicking';

const { dates, onChanged, optionsProps } = defineProps<{
  dates: (string | number | undefined)[]
  onChanged: (index: number) => void
  optionsProps?: Partial<FlickingOptions>
}>();
const flicking = ref<HTMLUListElement & FlickerType | null>(null);
const options: Partial<FlickingOptions> = {
  autoInit: false,
  defaultIndex: 0,
  align: 'center',
  horizontal: false,
  noPanelStyleOverride: true,
  duration: 350,
  preventClickOnDrag: true,
  ...(optionsProps && { ...optionsProps })
};

onMounted(() => {
  flicking.value?.init();
});

const motionTransform = currentTarget => {
  currentTarget.panels.forEach(panel => {
    const { sin, abs, PI } = Math;
    const rotateVal = -panel.progress * 30;
    const sinRot = sin(abs((rotateVal * PI) / 180));
    const depth = 150 * sinRot * sinRot;

    panel.element.style.transform = `translateZ(-${depth}px) rotateX(${rotateVal}deg)`;
  })
};
</script>

<template>
  <Flicker ref="flicking" class="picker" :options="options" :cameraTag="'ul'"
    @ready="({ currentTarget }) => motionTransform(currentTarget)"
    @move="({ currentTarget }) => motionTransform(currentTarget)" @changed="({ index }) => onChanged(index)">
    <template v-for="date in dates" :key="date">
      <li>{{ date }}</li>
    </template>
    <template #viewport>
      <div class="guide-line"></div>
      <div class="dim-top"></div>
      <div class="dim-bottom"></div>
    </template>
  </Flicker>
</template>