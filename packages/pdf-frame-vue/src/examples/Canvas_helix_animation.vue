<template>
  <pdfFrame id="canvasContid" type="canvas" 
      @on-ready="onInstanceReady"
      @on-resize="onInstanceResize"
      :setCtxClear="onClear">
    <i-g :transform="{ translate: [width * 0.5 - 50,50], scale: [2, 2] }">
      <i-circle
        v-for="n in 30"
        v-bind:key="n"
        :bbox="false"
        :cx="Math.sin(n * 0.4 + t) * 50"
        :cy="n * 11"
        :r="((Math.sin(n * 0.4 - 4.5 + t) + 1) * 3 + 4) * 0.5"
        :style="{
          fillStyle: 'hsl(' + ((n * 5) % 360) + ',100%,50%)',
          opacity: Math.sin(n * 0.4 + t) + 1 + 0.1,
          lineWidth: 1,
        }"
      />
      <i-rect
        v-for="n in 30"
        v-bind:key="n"
        :bbox="false"
        :x="Math.sin((n + 7.5) * 0.4 + t) * 50"
        :y="n * 11"
        :width="(Math.sin((n + 7.5) * 0.4 - 4.5 + t) + 1) * 3 + 4"
        :height="(Math.sin((n + 7.5) * 0.4 - 4.5 + t) + 1) * 3 + 4"
        :style="{
          fillStyle: 'hsl(' + (((n + 7.5) * 10) % 360) + ',100%,50%)',
          opacity: Math.sin((n + 7.5) * 0.4 + t) + 1 + 0.1,
          lineWidth: 1,
        }"
      />
    </i-g>
  </pdfFrame>
</template>

<script setup>
import { ref, onMounted } from 'vue';
let t = ref(0);
let loopCount = 2000;
let runningCount = 0;
let i2dinstanceID = 0;
function step() {
  if (runningCount < loopCount) {
    runningCount += 1;
    t.value = runningCount * 0.01;
    var elementExists = document.getElementById("canvasContid");
      if (elementExists) {
        window.requestAnimationFrame(step);
      }
  }
}

let width = ref(0);
  let height = ref(0);
  let layerInstance;

  function onInstanceResize(data) {
    width.value = data.width;
    height.value = data.height;
  }

  function onInstanceReady (layer) {
    layerInstance = layer;
    width.value = layer.width;
    height.value = layer.height;
    i2dinstanceID = layer.vDomIndex;
    window.requestAnimationFrame(step);
  }

  function onClear(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, layerInstance?.width ?? 0, layerInstance?.height ?? 0);
  }
</script>

<style scoped></style>
