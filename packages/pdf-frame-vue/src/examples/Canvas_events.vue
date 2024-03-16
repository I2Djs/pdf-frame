<template>
  <div class="canvasParentContainer">
    <pdfFrame
      id="canvasContainer"
      type="canvas"
    >
        <i-circle
            :cx="300"
            :cy="300"
            :r="100"
            :style="{
                fill: fillColor
            }"
            :event="{
                mousein: mouseinhdlr,
                mouseout: mouseouthdlr
            }">
        </i-circle>
    </pdfFrame>
  </div>
</template>

<script setup>
import { ref } from "vue";

let fillColor = ref('#0ff000');

  function mouseinhdlr() {
    fillColor.value = '#f0f0f0';
  }

  function mouseouthdlr() {
    fillColor.value = '#0ff000';
  }

</script>

<style>
html, body, #app {
    height: 100%;
    width: 100%;
  }

.canvasParentContainer {
  height: 100%;
  width: 100%;
}

#canvasContainer{
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
