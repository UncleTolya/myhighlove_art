<template>
  <div class="tab-content">
    <div class="tab-content-part text">{{ $t('text1') }}</div>
    <div class="tab-content-part text">{{ $t('text2') }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "History"
  });
</script>

<script setup lang="ts">

const dict: Record<'en' | 'ru', Record<string, string>> = {
  'en': {
    'text1': 'I am an artist with a passion for bringing joy and creativity to the world through my work. I specialize in handcrafted toys, designed to delight and engage people of all ages. Whether it\'s for a special occasion like New Year\'s or Easter;',
    'text2': 'I pour my heart and soul into each piece, using only the finest materials and techniques to create something truly unique and memorable.',
  },
  'ru': {
    'text1': 'Игрушки из ваты. Ручная работа.\nВыполнены в технике 1930-х годов. В современной стилизации.',
    'text2': 'Я вкладываю свое сердце в каждое изделие, используя только лучшие материалы и техники, чтобы создать что-то действительно уникальное и запоминающееся.',
  },
}

const $t = (t: string): string => {
  return dict['ru'][t];
}
</script>

<style scoped>
.text {
  white-space: pre-wrap;
  text-align: center;
}
</style>
