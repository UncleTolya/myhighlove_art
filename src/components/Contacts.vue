<template>
  <div class="tab-content">
    <div class="tab-content-part">
      {{ $t('asks') }} <a :href="`mailto: ${email}`" class="highlighted"><b>{{ email }}</b></a>
    </div>
    <div class="tab-content-part">
      <div class="title">{{ $t('toys') }}</div>
      <ul style="margin: 0">
        <li class="adress">{{ $t('mag1') }}</li>
        <li class="adress">{{ $t('mag2') }}</li>
      </ul>
    </div>
    <div class="tab-content-part" style="display: flex; gap: 10px;">
      <img class="btn" src="../assets/inst.png" style="width: 36px; height: 36px" alt="img" @click="onClick('https://instagram.com/myhighlove_art')">
      <img class="btn" src="../assets/teleg.png" style="width: 36px; height: 36px" alt="img" @click="onClick('https://t.me/mhlvart')">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Contacts',
});
</script>

<script setup lang="ts">

const email = 'olga.helmi@gmail.com';

const dict: Record<'en' | 'ru', Record<string, string>> = {
  'en': {
    'toys': 'My toys are sold in stores: ',
    'asks': 'For orders and questions write at',
    'mag1': '21–23a Bolshaya Konyushennaya st., Saint-Petersburg, "DLT"',
    'mag2': '11/1 Novy Arbat st., Moscow, "Detskiy Mir"',
  },
  'ru': {
    'toys': 'Мои игрушки продаются в магазинах: ',
    'asks': 'Для заказов и вопросов пишите на ',
    'mag1': '"ДЛТ" Санкт-Петербург, Большая Конюшенная, 21–23a',
    'mag2': '11/1 Novy Arbat st., Moscow, "Detskiy Mir"',
  },
}

const $t = (t: string): string => {
  return dict['ru'][t];
}

const onClick = (link: string): void => {
  window.open(link, '_blank');
}

</script>

<style scoped>
.btn {
  cursor: pointer;
}
.title {
  margin-bottom: 7px;
}
.adress:not(:last-child) {
  margin-bottom: 5px;
}
</style>
