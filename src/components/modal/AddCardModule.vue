<script setup lang="ts">
import { ref, onMounted } from 'vue';

const { modelValue } = defineProps(['modelValue'])
const updateProps = defineEmits(['update:modelValue']);

const input = ref<HTMLInputElement>();

onMounted(() => {
  updateProps('update:modelValue', {
    isError: true,
  });
});
const changeTitle = (event: Event) => {
  updateProps('update:modelValue', {
    title: (<HTMLInputElement>event.target).value,
    isError: input.value?.value ? false : true
  });
};
</script>

<template>
  <div>
    <input ref="input" type="text" placeholder="카드명 입력" :value="modelValue.title" @input="event => changeTitle(event)" />
    <span class="error" v-if="modelValue.isError">* 카드명을 입력해주세요!</span>
  </div>
</template>