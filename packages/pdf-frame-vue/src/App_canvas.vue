<script setup>
import { ref } from 'vue';
// import {i2dClient} from './../dist/i2d-client.es.js'

let showgreenrect = ref(false);
let aboutText = ref("About I2djs frame");
let rectWidth = ref(300);
let rectColor = ref("#ff0000");


setTimeout(() => {
  aboutText.value = "About PDF frame";
  rectWidth.value = 500;
  rectColor.value = "#00ff00";
  console.log("value changes");
}, 10000)

</script>

<template>
  <div class="pdfContainer">
    <pdfFrame
      id="canvasContainer"
      type="canvas"
    >
        <i-rect
          :x="0"
          :y="0"
          :width="rectWidth"
          :height="800"
          :style="{ fill:rectColor, opacity: 0.3 }"
        />
        <i-text
            :x="200"
            :y="60"
            :text="aboutText"
            :width="530"
            :style="{fillStyle:'#000000',font: '25px Arial'}"
            class="text_123"
          />
    </pdfFrame>
  </div>
</template>

<style>
html, body, #app {
    height: 100%;
    width: 100%;
  }

.pdfContainer {
  height: 100%;
  width: 100%;
}

#canvasContainer{
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
