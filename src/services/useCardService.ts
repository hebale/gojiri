import { shallowRef } from 'vue';
import { storeToRefs } from 'pinia';

import pinia from '@/store'
import { useDateStore } from '@/store/useDateStore';
import { useCardStore } from '@/store/useCardStore';
import { useModalStore } from '@/store/useModalStore';

import AddCardModule from '@/components/modal/AddCardModule.vue'
import CloneListCardModule from '@/components/modal/CloneCardModule.vue'
import DeleteModule from '@/components/modal/DeleteModule.vue';
import ErrorTitleNullModule from '@/components/modal/ErrorTitleNullModule.vue';

import { accordionMotion } from '@/common/util';

const { getPeriodData } = storeToRefs(useDateStore(pinia()));
const { cloneCards, postCard, patchCard, deleteCard } = useCardStore(pinia());
const { openModal } = useModalStore(pinia());

export const cloneCard = () => {
  openModal({
    title: '날짜 선택',
    body: shallowRef(CloneListCardModule),
    onConfirm: {
      title: '불러오기',
      action: props => cloneCards({ CLONE_MONTH: String(props!.cloneMonth), MONTH: String(props!.month) })
    }
  })
};
export const addCard = () => {
  openModal({
    title: '카드 추가',
    body: shallowRef(AddCardModule),
    onConfirm: {
      title: '추가',
      action: props => postCard({ MONTH: getPeriodData.value, TITLE: String(props!.title) })
    }
  })
};
export const confirmDeleteCard = (id: number, title: string) => {
  openModal({
    title: '카드 삭제',
    props: {
      title: title
    },
    body: shallowRef(DeleteModule),
    onConfirm: {
      title: '삭제',
      action: () => deleteCard({ ID: id })
    }
  })
};
export const changeCardTitle = (id: number, title: string | null) => {
  if (title) patchCard({ ID: id, TITLE: title });
};
export const errorTitleNull = (callback: () => void) => {
  openModal({
    title: '오류',
    body: shallowRef(ErrorTitleNullModule),
    onClose: {
      title: '확인',
      action: () => callback()
    }
  })
};
export const openCardView = (target: HTMLElement, id: number, height: number) => {
  accordionMotion(target, 44, height, 350, () => {
    patchCard({ ID: id, VIEW: 'Y' });
  });
};
export const closeCardView = (target: HTMLElement, id: number, height: number) => {
  accordionMotion(target, height, 44, 350, () => {
    patchCard({ ID: id, VIEW: 'N' });
  });
};