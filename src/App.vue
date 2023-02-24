<script setup lang="ts">
import { computed, onMounted, ref, provide } from 'vue'
import MenuList from './components/MenuList.vue';
import { width, height, incFrame, drawer } from './shared/canvasStore.js';
import ImgModal from './components/ImgModal.vue';
import { Toy } from './components/model.js';
import { Drawer } from './entities/drawer/drawer.js';
import { initAnimation } from './shared/animationController.js';

const workspaceStyle = computed(() => {
  return {
    width: `${width.value}px`,
    height: `${height.value}px`,
  };
});

const toy = ref<Toy | null>(null);

provide('showModal', (_toy: Toy) => {
  toy.value = _toy;
});
provide('closeModal', () => {
  toy.value = null
});


onMounted(() => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const _ctx = canvas.getContext('2d', { alpha: false })
  if (!_ctx) {
    throw new Error('Canvas context not found')
  }
  drawer.value = new Drawer(_ctx);
  initAnimation();

  const loop = () => {
    incFrame();
    requestAnimationFrame(loop);
  };
  loop();
  function resizeCanvas() {
    const w = window.innerWidth;
    let h = window.innerHeight;
    h = h > 600 ? h : 600;

    width.value = w;
    height.value = h;

    canvas.setAttribute('width', `${w}`);
    canvas.setAttribute('height', `${h}`);
  }
  resizeCanvas();
  window.addEventListener("orientationchange", resizeCanvas, false);
  window.addEventListener('resize', resizeCanvas);


  let isDebug = false;
  const onMouseMove = function () {
    if (!isDebug) {
      return;
    }
  };
  canvas.addEventListener('mousemove', onMouseMove);
  window.addEventListener('keydown', function(e) {
    if (e.key === 'q') {
      isDebug = !isDebug;
    }
  });

  window.addEventListener('keyup', function(e) {
  });
})
</script>

<template>
  <div :style="workspaceStyle" style="position: relative;">
    <canvas
      id="canvas"
      width="100"
      height="100"
      tabindex='1'
    ></canvas>
    <div class="workspace">
      <MenuList/>
    </div>
    <ImgModal v-if="toy" :toy="toy" />
  </div>
</template>

<style scoped>
  .workspace {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 20;
  }
  canvas {
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 10;
  }
</style>
