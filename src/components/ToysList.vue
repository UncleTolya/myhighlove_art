<template>
  <div class="container">
    <div class="list">
      <Card
        v-for="(toy, index) in toys"
        :key="index"
        :toy="toy"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent( {
    name: 'ToysList',
  })
</script>

<script setup lang="ts">
  import { computed } from 'vue';
  import Card from './Card.vue';
  import { toys as toyconfigs } from '../app/toyConfigs.json'
  import { Toy } from './model.js';

  const toys = computed<Toy[]>(() => {
    return toyconfigs;
  })
</script>

<style scoped>
.container {
  padding: 10px 0;
  height: 100%;
}
.list {
  /*background-color: rgba(255, 255, 255, 0.5);*/
  height: 100%;
  overflow-x: scroll;
  display: flex;
  align-items: center;
  gap: 10px;
}
html {
  --scrollbarBG: #FFFFFF;
  --thumbBG: #90A4AE;
}
.list::-webkit-scrollbar {
  width: 11px;
}
.list {
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
.list::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
.list::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG) ;
  border-radius: 6px;
  border: 3px solid var(--scrollbarBG);
}
.tab-content-part {
  background-color: rgba(255, 255, 255, 0.5);
  text-align: start;
  padding: 2px 2px;
}
</style>
