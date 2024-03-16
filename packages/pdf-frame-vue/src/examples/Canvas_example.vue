<template>
  <div class="canvasParentContainer">
    <pdfFrame
      id="canvasContainer"
      type="canvas"
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
        :width="width"
        :height="height"
        rx=50
        ry=50
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
      <i-rect
        v-for="n in 60"
        v-bind:key="n"
        :x="Math.sin(n * 0.4) * 50"
        :y="n * 11"
        :width="(Math.sin(n * 0.4 - 4.5) + 1) * 3 + 4"
        :height="(Math.sin(n * 0.4 - 4.5) + 1) * 3 + 4"
        transform="translate(130,60)"
        :bbox="false"
        :style="{
          fillStyle: 'hsl(' + ((n * 5) % 360) + ',100%,50%)',
          opacity: Math.sin(n * 0.4) + 1 + 0.1,
          lineWidth: 1,
        }"
      />
      <i-rect
        v-for="n in 60"
        v-bind:key="n"
        :x="Math.sin((n + 7.5) * 0.4) * 50"
        :y="n * 11"
        :width="(Math.sin((n + 7.5) * 0.4 - 4.5) + 1) * 3 + 4"
        :height="(Math.sin((n + 7.5) * 0.4 - 4.5) + 1) * 3 + 4"
        transform="translate(130,60)"
        :style="{
          fillStyle: 'hsl(' + (((n + 7.5) * 10) % 360) + ',100%,50%)',
          opacity: Math.sin((n + 7.5) * 0.4) + 1 + 0.1,
          lineWidth: 1,
        }"
      />

      <i-g :transform="() => {
          return {
            translate: [250, 100]
          }
      }">

        <i-path
                d="M366.2,204.2 c-9.8,0 -15,-5.6 -15,-15.1 V77.2 h-85 v28 h19.5 c9.8,0 8.5,2.1 8.5,11.6 v72.4 c0,9.5 0.5,15.1 -9.3,15.1 H277 h-20.7 c-8.5,0 -14.2,-4.1 -14.2,-12.9 V52.4 c0,-8.5 5.7,-12.3 14.2,-12.3 h18.8 v-28 h-127 v28 h18.1 c8.5,0 9.9,2.1 9.9,8.9 v56.1 h-75 V53.4 c0,-11.5 8.6,-13.3 17,-13.3 h11 v-28 H2.2 v28 h26 c8.5,0 12,2.1 12,7.9 v142.2 c0,8.5 -3.6,13.9 -12,13.9 h-21 v33 h122 v-33 h-11 c-8.5,0 -17,-4.1 -17,-12.2 v-57.8 h75 v58.4 c0,9.1 -1.4,11.6 -9.9,11.6 h-18.1 v33 h122.9 h5.9 h102.2 v-33 H366.2 z"
                transform="translate(0,0)"
                :style="{ fillStyle: 'grad(grad4)' }"
              />
        <i-text
          :x="0"
          :y="300"
          :width="width - 300"
          align="justify"
          text="Pdf-frame is a client-side JavaScript web framework designed for PDF/Canvas rendering that leverages a declarative HTML syntax for efficient graphical content definition. It is built on the i2djs framework and currently supports PDF and Canvas formats. Pdf-frame features SVG-like syntax and semantics for easy geometrical shape definitions, ensuring consistent rendering across both PDF and Canvas. It automatically handles content overflow by creating new pages, supports multi-page PDFs, and allows for animations and events in canvas contexts. The framework also provides components for integration with popular frameworks like Vue and Nuxt, with ongoing work for React support."
          :style="{ fillStyle: '#ffffff', align: 'justify', font: '18px Courier' }"
        />
      </i-g>
    </pdfFrame>
  </div>
</template>

<script setup>
  import { ref, watch,onMounted } from "vue";

  let width = ref(0);
  let height = ref(0);

  function onInstanceResize(data) {
    width.value = data.width;
    height.value = data.height;
  }

  function onInstanceReady (layer) {
    width.value = layer.width;
    height.value = layer.height;
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
