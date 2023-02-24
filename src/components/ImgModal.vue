<template>
  <div class="modal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content__container">
      <div class="modal-content">
        <img class="main-image" :src="imgUrls[selectedImageIndex]">
<!--        <div class="other-images">-->
<!--          <img-->
<!--              class="other-image"-->
<!--              v-for="(img, i) in imgUrls"-->
<!--              :key="i"-->
<!--              :src="img"-->
<!--              @click="selectedImageIndex = i"-->
<!--          >-->
<!--        </div>-->
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<script lang="ts">
export default {
  name: "ImgModal"
}
</script>

<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { getImageUrl } from '../shared/utils.js';
import { Toy } from './model.js';

const props = defineProps<{
  toy: Toy | null,
}>();

const modal = ref<HTMLElement | null>(null);

const selectedImageIndex = ref(0);

const closeModal = inject<() => void>('closeModal');

const imgUrls = computed(() => {
  const toy = props.toy;
  if (!toy) {
    return [];
  }
  return toy.images.map((img) => getImageUrl(`${toy.series}_${img}`));
});

</script>

<style scoped>
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.85);
}
.modal-background {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-content__container {
  z-index: 101;
  /*container-type: inline-size;*/
  /*container-name: affa;*/
  /*width: 80%;*/
  max-height: 80vh;
  overflow: hidden;
  background-color: white;
  border-radius: 4px;
}
.modal-content {
  width: 100%;
  height: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.other-images {
  height: 70vh;
  display: flex;
  overflow-y: scroll;
  flex-direction: row;
  gap: 10px;
}
.main-image {
  height: 70vh;
  object-fit: contain;
}
.other-image {
  height: 25vh;
  object-fit: contain;
  cursor: pointer;
}

@container affa (min-width: 600px) {
  .modal-content {
    flex-direction: row;
  }
  .other-images {
    min-width: 120px;
    flex-direction: column;
    overflow-x: scroll;
  }
}

button {
  cursor: pointer;
}

</style>
