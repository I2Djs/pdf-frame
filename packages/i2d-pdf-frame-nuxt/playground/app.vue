<template>
  <div class="container">
    <i2dClient type="pdf" id="nswamyid" :width="595" :height="841">
        <i-page-template id="temp-1">
            <i-group>
              <i-linearGradient id="grad3" :x1=0 :y1=0 :x2=100 :y2=100 :colorStops="[{
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
      }]">
            </i-linearGradient>
                <i-rect :x="0" :y="0" :width=595 :height=800 :style="{ fillStyle:'grad(grad3)' }"></i-rect>
            </i-group>
        </i-page-template>
        <i-page>
          <i-defs>
            <i-linearGradient id="grad1" :x1=0 :y1=0 :x2=100 :y2=0 :colorStops="[{ color: '#FF7C80', offset:0, opacity: 1}, { color: '#0075F3', offset:100, opacity: 1}]">
            </i-linearGradient>
            <i-linearGradient id="grad2" :x1=0 :y1=0 :x2=100 :y2=100 :colorStops="[{color: '#023c73',offset: 0},{color: '#5f0b9c',offset: 50},{color: '#b814c4',offset: 100}]">
            </i-linearGradient>
          </i-defs>
          <i-rect :x="0" :y="0" :width=595 :height=800 :style="{ fillStyle:'grad(grad2)' }"></i-rect>
          <i-group transform="translate(30,20)">
            <i-image src="src/assets/i2d-frame.svg" :width=200 :x=175 :y=0></i-image>
            <i-text :x=0 :y=60 text="About I2Djs-Frame" :width=530 :style="{fillStyle:'grad(grad1)',font: '25px Arial', align: 'center'}" class="text_123"></i-text>
            <i-text :x=20 :y=85 :width=530 text="Acalvio is the leader in Cyber Deception technology, built on over 25 issued patents in Autonomous Deception and advanced AI." :style="{ fillStyle: '#ffffff',font: '9px Arial',align: 'left'}" class="text_123"></i-text>
          </i-group>        
          <i-group transform="translate(20,120)" >
            <i-text :x=30 :y=10 text="Acalvio is the leader in Cyber Deception technology, built on over 25 issued patents in Autonomous Deception and advanced AI. The Acalvio Active Defense Platform provides robust Identity Protection, Advanced Threat Defense, and Threat Hunting products. Acalvio is the leader in Cyber Deception technology, built on over 25 issued patents in Autonomous Deception and advanced AI. The Acalvio Active Defense Platform provides robust Identity Protection, Advanced Threat Defense, and Threat Hunting products. The Acalvio Active Defense Platform provides robust Identity Protection, Advanced Threat Defense, and Threat Hunting products. Acalvio is the leader in Cyber Deception technology, built on over 25 issued patents in Autonomous Deception and advanced AI. The Acalvio Active Defense Platform provides robust Identity Protection, Advanced Threat Defense, and Threat Hunting products." :width=500 :style="{ fillStyle: '#ffffff',font: '9px',align: 'justify'}" class="text_123"></i-text>
          </i-group>
        </i-page>
    </i2dClient>
  </div>
</template>

<script setup>

</script>
<style>
  html, body, #__nuxt {
    height: 100%;
    width: 100%;
  }

  .container {
    height: 100%;
    width: 100%;
  }

  .canvasContainer {
    height: 100%;
    width: 100%;
  }

  .pdfContainer {
    height: 100%;
    width: 100%;
  }

  #pdfContent {
    height: 100%;
    width: 100%;
  }

  .text_123 {
    font:30px Arial;
  }
</style>