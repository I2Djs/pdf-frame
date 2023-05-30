<template>
  <div class="container">
    <i2dClient type="pdf" id="nswamyid" :width="595" :height="841">
        <i-page>
          <i-defs>
            <i-linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <i-stop offset="0%" :style="{ 'stop-color':'#ffffff','stop-opacity':1}" />
              <i-stop offset="100%" :style="{ 'stop-color':'#ff0000','stop-opacity':1}" />
            </i-linearGradient>
            <i-radialGradient id="grad2" x1="50%" y1="50%" r1="0" x2="50%" y2="50%" r2="100">
              <i-stop offset="0%" style="stop-color:#ffffff;stop-opacity:0" />
              <i-stop offset="25%" style="stop-color:#ff0000;stop-opacity:1" />
              <i-stop offset="50%" style="stop-color:#0000ff;stop-opacity:0.75" />
            </i-radialGradient>
          </i-defs>
          <i-group transform="translate(120,40)">
            <i-text :x=40 :y=0 text="Acalvio" style="fillStyle: #a83232;font: 25px Arial;align: left" class="text_123"></i-text>
            <i-text :x=40 :y=25 :width=400 text="Acalvio is the leader in Cyber Deception technology, built on over 25 issued patents in Autonomous Deception and advanced AI." style="fillStyle: #121212;font: 9px Arial;align: left" class="text_123"></i-text>
          </i-group>        
          <i-group transform="translate(20,120)" >
            <i-rect :x=120 :y=0 :width=430 :height=120 :rx=10 :ry=10 :style="{ strokeStyle:'#b5b5b5', fillStyle:`grad(grad1)` }"></i-rect>
            <i-text :x=130 :y=10 text="Acalvio is the leader in Cyber Deception technology, built on over 25 issued patents in Autonomous Deception and advanced AI. The Acalvio Active Defense Platform provides robust Identity Protection, Advanced Threat Defense, and Threat Hunting products. Acalvio is the leader in Cyber Deception technology, built on over 25 issued patents in Autonomous Deception and advanced AI. The Acalvio Active Defense Platform provides robust Identity Protection, Advanced Threat Defense, and Threat Hunting products. The Acalvio Active Defense Platform provides robust Identity Protection, Advanced Threat Defense, and Threat Hunting products. Acalvio is the leader in Cyber Deception technology, built on over 25 issued patents in Autonomous Deception and advanced AI. The Acalvio Active Defense Platform provides robust Identity Protection, Advanced Threat Defense, and Threat Hunting products." :width=400 style="fillStyle: #363636;font: 9px;align: justify" class="text_123"></i-text>
            <i-rect :x=0 :y=0 :width=100 :height=120 :rx=10 :ry=10 :style="{ 'strokeStyle':'#b5b5b5','fillStyle':'grad(grad2)'}"></i-rect>
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