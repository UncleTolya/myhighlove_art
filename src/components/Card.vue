<template>
  <div class="card">
    <div class="card-image tab-content-part">
      <img
        ref="pic"
        :src="getImageUrl(`${toy.series}_${toy.images[0]}-tiny`)"
        :data-src="getImageUrl(`${toy.series}_${toy.images[0]}-min`)"
        :data-src2="getImageUrl(`${toy.series}_${toy.images[0]}`)"
        :alt="toy.details"
        @click="showModal?.(toy)"
      >
    </div>
    <div class="card-content">
      <div class="tab-content-part" style="display: flex">
        <div class="card-title tab-content-part">{{ toy.name }}</div>
        <div >{{ $t(toy.series) }}</div>
      </div>
      <div class="card-details tab-content-part">{{ toy.details }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent( {
    name: 'Card',
  })

  const dict: Record<'en' | 'ru', Record<string, string>> = {
    'en': {
      'circus': 'Circus',
      'easter': 'Easter',
      'details': 'Details',
    },
    'ru': {
      'circus': 'Цирк',
      'easter': 'Пасха',
      'details': 'Детали',
    },
  }

  const $t = (t: string): string => {
    return dict['ru'][t];
  }
</script>

<script setup lang="ts">

import { onMounted, ref, inject } from 'vue';
import { getImageUrl } from '../shared/utils.js';
import { Toy } from './model.js';

const props = defineProps<{
  toy: Toy,
}>()

const pic = ref()

const showModal = inject<(toy: Toy) => void>('showModal');

onMounted(() => {
  const item = pic.value;
  const img = new Image();
  img.src = item.dataset.src;
  img.onload = () => {
    item.src = item.dataset.src;
    const src2 = item.dataset.src2;
    if (!src2) {
      return;
    }
    const img2 = new Image();
    img2.src = src2;
    // img2.onload = () => {
    //   item.src = src2;
    // };
  };
})
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 250px;
    height: 100%;
    justify-content: space-between;
  }
  .card-image {
    display: flex;
    justify-content: center;
    height: 72%;
    /*width: 50%;*/
  }
  .card-title {
    font-size: 1.2em;
    font-weight: bold;
  }
  .card-status {
    font-size: 0.8em;
    font-weight: bold;
  }
  .card-content {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  img {
    cursor: pointer;
    height: 100%;
    max-width: 100%;
    padding: 10px 0;
    object-fit: cover;
  }
</style>
