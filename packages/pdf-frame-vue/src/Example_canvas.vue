<script setup>
  import { ref, watch,onMounted } from "vue";

  function onInstanceResize(data) {
    console.log(data);
  }

  function onInstanceReady (layer) {
    console.log(layer);
  }

  let featuresList = ["Declarative HTML syntax for defining PDF content.", "Adoption of SVG tag syntax for creating geometrical shapes.", "Rendering outputs: PDF and Canvas.","Supports the creation of multi-page PDF documents.", "Framework component support: Vue, nuxt."];
</script>

<template>
  <div class="canvasParentContainer">
    <pdfFrame
      id="canvasContainer"
      type="canvas"
      :width="595"
      :height="841"
      @on-ready="onInstanceReady"
      @on-resize="onInstanceResize"
    >
      <i-linearGradient
        id="grad3"
        :x1="0"
        :y1="0"
        :x2="100"
        :y2="100"
        :colorStops="[
          {
            color: '#023c73',
            offset: 0,
          },
          {
            color: '#5f0b9c',
            offset: 50,
          },
          {
            color: '#b814c4',
            offset: 100,
          },
        ]"
      />
      <i-rect
        :x="0"
        :y="0"
        :width="600"
        :height="800"
        :style="{ fillStyle: 'grad(grad3)' }"
      />
      <i-linearGradient
        id="grad4"
        :x1="0"
        :y1="0"
        :x2="0"
        :y2="100"
        :colorStops="[
          {
            color: '#42f590',
            offset: 0,
          },
          {
            color: '#42b0f5',
            offset: 50,
          },
          {
            color: '#9e30d1',
            offset: 100,
          },
        ]"
      />
      <i-path
        d="M366.2,204.2 c-9.8,0 -15,-5.6 -15,-15.1 V77.2 h-85 v28 h19.5 c9.8,0 8.5,2.1 8.5,11.6 v72.4 c0,9.5 0.5,15.1 -9.3,15.1 H277 h-20.7 c-8.5,0 -14.2,-4.1 -14.2,-12.9 V52.4 c0,-8.5 5.7,-12.3 14.2,-12.3 h18.8 v-28 h-127 v28 h18.1 c8.5,0 9.9,2.1 9.9,8.9 v56.1 h-75 V53.4 c0,-11.5 8.6,-13.3 17,-13.3 h11 v-28 H2.2 v28 h26 c8.5,0 12,2.1 12,7.9 v142.2 c0,8.5 -3.6,13.9 -12,13.9 h-21 v33 h122 v-33 h-11 c-8.5,0 -17,-4.1 -17,-12.2 v-57.8 h75 v58.4 c0,9.1 -1.4,11.6 -9.9,11.6 h-18.1 v33 h122.9 h5.9 h102.2 v-33 H366.2 z"
        transform="translate(100,60)"
        :style="{ fillStyle: 'grad(grad4)' }"
      />
      <i-rect
        v-for="n in 30"
        v-bind:key="n"
        :x="Math.sin(n * 0.4) * 50"
        :y="n * 11"
        :width="(Math.sin(n * 0.4 - 4.5) + 1) * 3 + 4"
        :height="(Math.sin(n * 0.4 - 4.5) + 1) * 3 + 4"
        transform="translate(130,360)"
        :bbox="false"
        :style="{
          fillStyle: 'hsl(' + ((n * 5) % 360) + ',100%,50%)',
          opacity: Math.sin(n * 0.4) + 1 + 0.1,
          lineWidth: 1,
        }"
      />
      <i-rect
        v-for="n in 30"
        v-bind:key="n"
        :x="Math.sin((n + 7.5) * 0.4) * 50"
        :y="n * 11"
        :width="(Math.sin((n + 7.5) * 0.4 - 4.5) + 1) * 3 + 4"
        :height="(Math.sin((n + 7.5) * 0.4 - 4.5) + 1) * 3 + 4"
        transform="translate(130,360)"
        :style="{
          fillStyle: 'hsl(' + (((n + 7.5) * 10) % 360) + ',100%,50%)',
          opacity: Math.sin((n + 7.5) * 0.4) + 1 + 0.1,
          lineWidth: 1,
        }"
      />
      <i-g :transform="() => {
          return {
            translate: [240, 330]
          }
      }">
        <i-text
          :x="0"
          :y="0"
          :width="300"
          align="justify"
          text="What is Pdf-frame?"
          :style="{ fillStyle: '#42f590', align: 'justify', font: 'bold 18px Arial' }"
        />
        <i-text
          :x="10"
          :y="30"
          :width="320"
          align="justify"
          text="Pdf-frame is a JavaScript web framework for client-side PDF/Canvas rendering. With its declarative HTML syntax and semantics, it offers an easy and efficient way to define PDF/Canvas graphical content. It follows syntax similar to SVG's and provides component support for popular frameworks like Vue, nuxt, and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs as PDF and Canvas formats."
          :style="{ fillStyle: '#ffffff', align: 'justify', font: '14px Arial' }"
        />
      </i-g>

       <i-g :transform="() => {
          return {
            translate: [240, 550]
          }
      }">
        <i-text
          :x="0"
          :y="0"
          :width="300"
          align="justify"
          text="Features of Pdf-frame?"
          :style="{ fillStyle: '#42f590', align: 'center', font: 'bold 18px Arial' }"
        />
        <i-g
          v-for="(item, index) in featuresList"
          v-bind:key="index"
          :transform="() => {
            return {
              translate: [10, 50 + index * 30]
            }
          }"
          >
          <i-circle :cx="0" :cy="3" :r="3" :style="{fill:'#000000'}">
          </i-circle>
          <i-text
            :x="10"
            :y="-10"
            :width="320"
            align="justify"
            :text="item"
            :style="{ fillStyle: '#ffffff', align: 'justify', font: '12px Arial' }"
          />
        </i-g>
      </i-g>
    </pdfFrame>
  </div>
</template>

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
