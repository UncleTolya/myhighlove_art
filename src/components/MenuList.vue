<template>
  <div class="menu-list color5">
    <div class="title">{{$t('title')}}</div>
    <div class="subtitle">{{$t('subtitle')}}</div>
    <div class="btn" @click="onClick('toys')">{{$t('toys')}}</div>
    <div class="tab" :style="opened === 'toys' ? tabStyle : {}">
      <ToysList v-show="opened === 'toys'"/>
    </div>
    <div class="btn" @click="onClick('history')">{{$t('history')}}</div>
    <div class="tab" :style="opened === 'history' ? tabStyle : {}">
      <History v-show="opened === 'history'"/>
    </div>
    <div class="btn" @click="onClick('contacts')">{{$t('contacts')}}</div>
    <div class="tab" :style="opened === 'contacts' ? tabStyle : {}">
      <Contacts v-show="opened === 'contacts'"/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MenuList'
}
</script>

<script setup lang="ts">
import ToysList from './ToysList.vue';
import History from './History.vue';
import Contacts from './Contacts.vue';
import { computed, ref } from 'vue';
import { height } from '../shared/canvasStore.js';

const INTERFACE_HEIGHT = 360;

const dict: Record<'en' | 'ru', Record<string, string>> = {
  'en': {
    'toys': 'toys',
    'history': 'history',
    'contacts': 'contacts',
    'title': 'Olga Mikhailova',
    'subtitle': 'игрушки из лисьего носа',
  },
  'ru': {
    'toys': 'игрушки',
    'history': 'история',
    'contacts': 'контакты',
    'title': 'Ольга Михайлова',
    'subtitle': 'игрушки из лисьего носа',
  },
}

const $t = (t: string): string => {
  return dict['ru'][t];
}

const opened = ref<'toys' | 'contacts' | 'history' | 'empty'>('empty');
const tabStyle = computed(() => {
  return {
    backgroundColor: 'rgba(214, 222, 255, 0.5)',
    height: `${height.value - INTERFACE_HEIGHT}px`,
    marginTop: '10px',
  };
});

function onClick(tab: 'toys' | 'contacts' | 'history' | 'empty') {
  opened.value = opened.value === tab
      ? 'empty'
      : tab;
}
</script>

<style scoped>
  .menu-list {
    padding-top: 48px;
    padding-bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 100%;
    font-family: "Raleway", sans-serif;
    font-weight: 200;
    font-size: 30px;
  }
  .title {
    padding: 12px 12px 0;
    letter-spacing: -3px;
    font-size: 42px;
    font-weight: 400;
    width: 100%;
    align-self: center;
  }
  .subtitle {
    padding: 0 12px 24px;
    letter-spacing: 4px;
    font-size: 15px;
    font-weight: 200;
    width: 100%;
    align-self: center;
  }
  .tab {
    height: 0;
    overflow: hidden;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 300;
    padding: 0 12px;
    width: 100%;
    transition: height 0.3s;
  }
  .btn {
    position: relative;
    margin-left: 30px;
    padding: 0 20px 8px;
    border-bottom: 1px solid transparent;
    border-left: 1px solid transparent;
    background-color: white;
    border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    cursor: pointer;
  }
  .btn:hover::before {
    content: '';
    inset: 0;
    position: absolute;
    bottom: -2px;
    left: -2px;
    border-bottom: 2px solid gray;
    border-left: 1px solid gray;
    border-radius: 0px 0px 0px 10px;
    -moz-border-radius: 0px 0px 0px 10px;
    -webkit-border-radius: 0px 0px 0px 10px;
    padding: 0 6px;
    -webkit-mask:
        linear-gradient(174deg, gray 10%, transparent),
        linear-gradient(89deg, gray 10%, transparent);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
</style>
