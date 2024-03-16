<template>
  <div class="canvasParentContainer">
    <pdfFrame id="tadpoleExample" type="canvas" :width="1000" :height="841" @on-ready="onInstanceReady">
      <i-g class="heads" :style="{
                        strokeStyle: 'white',
                        lineJoin: 'round',
                        lineCap: 'round',
                    }">
        <i-g v-for="(d, index) in dataArray" v-bind:key="index">
          <i-polyline
            class="mid"
            :style= "{ lineWidth: 4 }"
            :bbox="false"
            :points="d.midArr"
          >
          </i-polyline>
          <i-polyline
            class="tail"
            :style= "{ lineWidth: 1 }"
            :bbox="false"
            :points="d.tail"
          >
        </i-polyline>

        <i-ellipse
        :cx="0"
        :cy="0"
        :rx="6.5"
        :ry="4"
        :style="{
          fillStyle: '#ffffff'
        }"
        :transform="{
          translate: [d.px[0], d.py[0]],
          rotate: [Math.atan2(d.vy, d.vx) * (360 / (2 * Math.PI)), 0, 0]
        }"
        :bbox="false"
        ></i-ellipse>
      </i-g>
    </i-g>
  </pdfFrame>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const n = 500;
const v = 2;
const m = 12;
let height = 1000;
let width = 1000;
const tadpoles = new Array(n).fill().map(() => ({
    vx: (Math.random() - 0.5) * v,
    vy: (Math.random() - 0.5) * v,
    px: new Array(m).fill(Math.random() * width),
    py: new Array(m).fill(Math.random() * height),
    count: 0,
    midArr: [],
    tail: []
}));

let dataArray = ref(tadpoles);


function onInstanceReady (layer) {
    window.requestAnimationFrame(step);
}


  function step() {
      dataArray.value.forEach(function (t) {
          let dx = t.vx;
          let dy = t.vy;
          let x = (t.px[0] += dx);
          let y = (t.py[0] += dy);
          let speed = Math.sqrt(dx * dx + dy * dy);
          const count = speed * 10;
          const k1 = -5 - speed / 3;

          // Bounce off the walls.
          if (x < 0 || x > width) t.vx *= -1;
          if (y < 0 || y > height) t.vy *= -1;

          // Swim!
          for (var j = 1; j < m; ++j) {
              const vx = x - t.px[j];
              const vy = y - t.py[j];
              const k2 = Math.sin(((t.count += count) + j * 3) / 300) / speed;
              t.px[j] = (x += (dx / speed) * k1) - dy * k2;
              t.py[j] = (y += (dy / speed) * k1) + dx * k2;
              speed = Math.sqrt((dx = vx) * dx + (dy = vy) * dy);
          }

          let midArr = [];
            for (let i = 0; i < 3; ++i) midArr[i] = { x: t.px[i], y: t.py[i] };

          let tail = [];
          for (let i = 0; i < m; ++i) tail[i] = { x: t.px[i], y: t.py[i] };

          t.midArr = midArr;
          t.tail = tail;
      });

      var elementExists = document.getElementById("tadpoleExample");
      if (elementExists) {
        window.requestAnimationFrame(step);
      }
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
