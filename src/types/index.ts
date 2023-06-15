import type { Component } from 'vue';

export type DateType = {
  year: number,
  month: number
};

export type CardType = {
  ID: number
  USER: string
  MONTH: string
  VIEW: 'Y' | 'N'
  TITLE: string
  CREATED?: string
  MODIFIED?: string
  ITEMS: CardItemType[]
};

export type CardItemType = {
  ID: number
  TITLE: string
  COMPLETE: 'Y' | 'N'
  AMOUNT: number
  REPEAT: 'Y' | 'N'
  START_DATE: string | null
  END_DATE: string | null
  PARENTS_ID: number
  CREATED?: string
  MODIFIED?: string
};

export type QueryType = {
  [index: string]: string | undefined
  USER?: string
  MONTH: string
};

export type BodyType = {
  ID: number | number[]
  PARENTS_ID: number
  MONTH: string | string[]
  CLONE_MONTH: string
  VIEW: 'Y' | 'N'
  COMPLETE: 'Y' | 'N'
  REPEAT: 'Y' | 'N'
  TITLE: string
  AMOUNT: number
  START_DATE: string | null
  END_DATE: string | null
};

type ResponseType = Promise<{ code: number, data?: CardType[] | string[] }>;
type QueryMethodType = (path: string, queries?: QueryType) => ResponseType;
type BodyMethodType = (path: string, body?: Partial<BodyType>) => ResponseType;
export type HttpMethodType = {
  get: QueryMethodType
  post: BodyMethodType
  pull: BodyMethodType
  patch: BodyMethodType
  delete: BodyMethodType
}

export type FlickerType = {
  animating: boolean
  prev: (duration?: number) => Promise<void>
  next: (duration?: number) => Promise<void>
}

export type ModalId = {
  id: number
}

export type ModalDataType = {
  title: string
  error?: boolean
  props?: {
    [key: string]: string | number
  }
  body?: Component | string
  onConfirm?: {
    title?: string
    action: (props?: ActionPropsType) => void
  }
  onClose?: {
    title?: string
    action?: (props?: ActionPropsType) => void
  }
}
type ActionPropsType = {
  [key: string]: string | number | boolean
}
