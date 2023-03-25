<template>
  <div class="tab-content" style="display: unset">
    <div class="tab-content-part">
      <h4 class="title">{{ $t('title1') }}</h4>
      <div class="text">{{ $t('text1') }}</div>
    </div>
    <div class="tab-content-part">
      <h4 class="title">{{ $t('title2') }}</h4>
      <div class="text">{{ $t('text2') }}</div>
    </div>
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
    title1: 'Творчество - моя страсть',
    'text1': 'Я рисую с детства. Закончила художественную школу, а затем кафедру дизайна факультета журналистики Санкт-Петербургского Государственного Университета. С развитием технологий переключилась на цифровую иллюстрацию, а с недавнего времени решила освоить направление ватной игрушки.',
    title2: 'Вековые традиции в актуальной форме',
    'text2': 'Я создаю ватную игрушку для интерьера в технике 1930-х годов в современной стилизации, используя экологически чистые материалы. Каждая игрушка неповторима, поскольку я расписываю их вручную, используя свой многолетний художественный опыт. Основой интерьерной игрушки является проволочный каркас, обмотанный ватой. Лицо формируется из гипса. Моя миссия - в сохранении и развитии ремесла и традиции ватной игрушки.',
  },
}

const $t = (t: string): string => {
  return dict['ru'][t];
}
</script>

<style scoped>
  .title {
    white-space: pre-wrap;
    text-align: left;
    margin-bottom: 10px;
  }
  .text {
    white-space: pre-wrap;
    text-align: justify;
  }
  h4 {
    color: #0F0F0F
  }
</style>
