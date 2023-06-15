<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/store/useModalStore';

const modalStore = useModalStore();
const { modalData } = storeToRefs(modalStore);
const { closeModal } = modalStore;

const model = ref<{
  [key: string]: string | number | boolean
}>({});
</script>

<template>
  <div class="dim" v-for="{ id, title, props, body, onConfirm, onClose } in modalData" :key="id">
    <div class="modal">
      <h3>{{ title }}</h3>
      <div class="body" v-if="body">
        <component :is="body" :props="props || ''" v-model="model" />
      </div>
      <div class="control">
        <button type="button" v-if="onConfirm" @click="() => {
          if (!model?.isError) {
            onConfirm?.action({ ...props, ...model })
            closeModal(id);
          };
        }">
          {{ onConfirm.title ? onConfirm.title : '확인' }}
        </button>
        <button type="button" @click="() => {
          onClose?.action && onClose.action();
          closeModal(id);
        }">
          {{ onClose?.title ? onClose.title : '닫기' }}
        </button>
      </div>
    </div>
  </div>
</template>