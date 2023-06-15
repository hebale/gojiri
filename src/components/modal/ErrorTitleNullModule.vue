<script setup lang="ts">
import { defineProps, defineEmits, onMounted } from 'vue';

const updateProps = defineEmits(['update:modelValue']);
onMounted(() => {
  updateProps('update:modelValue', {
    isError: false,
  });
});
</script>

<template>
  <p>
    타이틀을 입력해주세요!
  </p>
</template>