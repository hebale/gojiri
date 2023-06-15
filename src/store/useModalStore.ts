import type { ModalId, ModalDataType } from '@/types';

import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal-store', () => {
  const modalData = ref<(ModalId & ModalDataType)[]>([]);

  const openModal = (modal: ModalDataType) => {
    const id: ModalId = { id: new Date().getTime() }
    modalData.value.push({ ...modal, ...id });
  };
  const closeModal = (id: number) => {
    modalData.value = modalData.value.filter(modal => modal.id !== id);
  };

  return {
    modalData,
    openModal,
    closeModal
  }
});