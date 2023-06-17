<script setup lang="ts">
import { onMounted } from 'vue';

const updateProps = defineEmits(['update:modelValue']);

const { props } = defineProps(['props']);
onMounted(() => {
  updateProps('update:modelValue', {
    isError: false,
  });
});
</script>

<template>
  <p>
    <b>{{ props.title }}</b>
    항목을 삭제하시겠습니까?
  </p>
</template>