<script setup>
import { ref, onMounted } from 'vue';
let t = ref(0);
let loopCount = 100;
let runningCount = 0;
function step() {
  if (runningCount < loopCount) {
    runningCount += 1;
    console.log(runningCount);
    t.value = runningCount * 0.01;
    window.requestAnimationFrame(step);
  }
}

let onInstanceReady = function (i) {
  console.log(i);
  window.requestAnimationFrame(step);
};
</script>

<template>
  <pdfFrame id="canvasContid" type="canvas" :width="350" :height="441" @on-ready="onInstanceReady">
    <i-g transform="translate(180,50)">
      <i-rect
        v-for="n in 3"
        v-bind:key="n"
        :bbox="false"
        :x="Math.sin(n * 0.4 + t) * 50"
        :y="n * 11"
        :width="(Math.sin(n * 0.4 - 4.5 + t) + 1) * 3 + 4"
        :height="(Math.sin(n * 0.4 - 4.5 + t) + 1) * 3 + 4"
        :style="{
          fillStyle: 'hsl(' + ((n * 5) % 360) + ',100%,50%)',
          opacity: Math.sin(n * 0.4 + t) + 1 + 0.1,
          lineWidth: 1,
        }"
      />
      <!-- <i-rect
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
      /> -->
    </i-g>
  </pdfFrame>
</template>

<style scoped></style>
