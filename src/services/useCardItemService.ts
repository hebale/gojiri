import type { CardItemType } from '@/types';
import { shallowRef } from 'vue';
import { storeToRefs } from 'pinia';

import pinia from '@/store';
import { useCardItemStore } from '@/store/useCardItemStore';
import { useModalStore } from '@/store/useModalStore';

import DeleteModule from '@/components/modal/DeleteModule.vue';
import ChangePeriodModule from '@/components/modal/ChangePeriodModule.vue';
import ErrorTitleNullModule from '@/components/modal/ErrorTitleNullModule.vue';

const cardStore = useCardItemStore(pinia());
const { newCardItems } = storeToRefs(cardStore);
const { postCardItem, patchCardItem, deleteCardItem, addNewCardItem, removeNewCardItem } = cardStore;
const { openModal } = useModalStore(pinia());

export const changeTotalCardItemComplete = (event: Event, id: number[]) => {
  const complete = (<HTMLInputElement>event.target).checked ? 'Y' : 'N';
  patchCardItem({ ID: id, COMPLETE: complete });
};
export const changeCardItemComplete = (event: Event, id: number) => {
  const complete = (<HTMLInputElement>event.target).checked ? 'Y' : 'N';
  patchCardItem({ ID: id, COMPLETE: complete });
};
export const addCardItem = ({ ID, PARENTS_ID, TITLE, AMOUNT, REPEAT, START_DATE, END_DATE }: Partial<CardItemType>) => {
  postCardItem({ PARENTS_ID, TITLE, AMOUNT, REPEAT, START_DATE, END_DATE });
  if (ID !== undefined) removeNewCardItem(ID);
};
export const errorTitleNull = () => {
  openModal({
    title: '오류',
    body: shallowRef(ErrorTitleNullModule),
    onClose: {
      title: '확인'
    }
  })
};
export const changeCardItem = ({ ID, TITLE, AMOUNT, REPEAT, START_DATE, END_DATE }: Partial<CardItemType>) => {
  patchCardItem({ ID, TITLE, AMOUNT, REPEAT, START_DATE, END_DATE });
};
export const confirmDeleteCardItem = (id: number, title: string) => {
  openModal({
    title: '아이템 삭제',
    props: {
      title: title
    },
    body: shallowRef(DeleteModule),
    onConfirm: {
      title: '삭제',
      action: () => deleteCardItem({ ID: id })
    }
  })
};
export const addNewCardItemForm = (id: number) => {
  const itemFormData: CardItemType = {
    PARENTS_ID: id,
    ID: newCardItems.value.length
      ? newCardItems.value[newCardItems.value.length - 1].ID + 1 : 0,
    TITLE: '',
    COMPLETE: 'N',
    AMOUNT: 0,
    REPEAT: 'Y',
    START_DATE: null,
    END_DATE: null
  }
  addNewCardItem(itemFormData);
};
export const removeNewCardItemForm = (id: number) => {
  removeNewCardItem(id);
};
export const changeCardItemPeriod = (startDate: string | null, endDate: string | null, callback: (dates: { [key: string]: number }) => void) => {
  if (startDate && endDate) {
    openModal({
      title: '아이템 기간선택',
      props: {
        startYear: parseInt(startDate.substring(0, 4), 10),
        startMonth: parseInt(startDate.substring(4, 6), 10),
        endYear: parseInt(endDate.substring(0, 4), 10),
        endMonth: parseInt(endDate.substring(4, 6), 10)
      },
      body: shallowRef(ChangePeriodModule),
      onConfirm: {
        title: '수정',
        action: (dates) => callback((<{ [key: string]: number }>dates))
      }
    });
  };
};