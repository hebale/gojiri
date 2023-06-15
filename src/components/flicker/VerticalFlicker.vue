<script setup lang="ts">
import type { FlickingOptions } from '@egjs/vue3-flicking'
import { defineProps } from 'vue';
import Flicker from '@egjs/vue3-flicking';

const { dates, onChanged, optionsProps } = defineProps<{
  dates: (string | number | undefined)[]
  onChanged: (index: number) => void
  optionsProps?: Partial<FlickingOptions>
}>();

const options: Partial<FlickingOptions> = {
  defaultIndex: 0,
  align: 'center',
  horizontal: false,
  duration: 350,
  preventClickOnDrag: true,
  ...(optionsProps && { ...optionsProps })
};

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
  <Flicker class="picker" :options="options" :cameraTag="'ul'"
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