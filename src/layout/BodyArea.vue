<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useCardStore } from '@/store/useCardStore';
import { addCard, cloneCard } from '@/services/useCardService';

import Card from '@/components/card/Card.vue';

const { cards, hasCardItem } = storeToRefs(useCardStore());
</script>

<template>
  <section>
    <div class="card-wrap">
      <Card v-for="card in cards" :key="`card_${card.ID}`" :card="card" />
    </div>
    <div class="card-control" :class="{ single: hasCardItem }">
      <button type="button" class="add-btn" @click="() => addCard()">카드 추가</button>
      <button type="button" class="load-btn" v-if="!hasCardItem" @click="() => cloneCard()">카드 불러오기</button>
    </div>
  </section>
</template>
