<template>
  <div class="canvasParentContainer">
    <pdfFrame id="nswamyid" type="canvas" :width="1000" :height="841">
      <i-rect
        v-for="n in 150"
        v-bind:key="n"
        :x="6 * n"
        :y="100"
        :width="4"
        :height="-1 * (100 + Math.random() * 300)"
        :transform="{ translate: [0, 500] }"
        :style="{
          fillStyle: 'hsl(' + ((n * 4) % 360) + ',100%,50%)',
        }"
      >
        <i-animate
          :to="{ 
            height: -1 * (100 + Math.random() * 300),
            style:{
              fillStyle: 'hsl(' + ((Math.random() * 25 * 4) % 360) + ',100%,50%)',
            }
          }"
          ease= "easeInOutSin"
          :delay="Math.random()*1000"
          loop="100"
          direction= "alternate" :duration="1000"
        />
      </i-rect>
  </pdfFrame>
  </div>
</template>
<script setup>
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
