<script setup>
  let pdfConfig = {
    margins: {
      top: 20,
      left: 10,
      right: 10,
      bottom: 10
    },
  fontRegister: {
    ShinyCrystal: 'fonts/ShinyCrystal-Yq3z4.ttf',
    Chapbook :'fonts/Chapbook.woff',
    MonteCristo :'fonts/MonteCristo.woff',
    TheBlacklist: 'fonts/TheBlacklist.woff',
    LemonJelly: 'fonts/LemonJellyPersonalUse-dEqR.ttf',
    Pecita: 'fonts/Pecita.otf'
  },
};
</script>

<template>
  <div class="pdfContainer">
    <pdfFrame
      id="samplePdf"
      type="pdf"
      :width="595"
      :height="841"
      :config="pdfConfig"
    >
      <i-page-template id="temp-1">
        <i-linearGradient
            id="grad3"
            :x1="0"
            :y1="0"
            :x2="100"
            :y2="100"
            :colorStops="[{
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
                           }]"
          />
          <i-rect
            :x="0"
            :y="0"
            :width="595"
            :height="841"
            :style="{ fillStyle:'grad(grad3)' }"
          />
          <i-rect
            :x="10"
            :y="10"
            :width="575"
            :height="821"
            :rx=10
            :ry=10
            :style="{ strokeStyle:'#ffffff', lineWidth: 1 }"
          />
      </i-page-template>
      <i-page p-template="temp-1">
        
        <i-text 
          :x="0"
          :y="50"
          text="PDF-frame"
          :style="{ fill: '#ffffff',textAlign:'center', font: '70px Chapbook' }"
        />
        <i-text 
          :x="30"
          :y="150"
          :width="540"
          text="PDF-frame is a web framework for client side PDF generation. With its declarative HTML syntax and semantics, it offers a easy way to define PDF graphical content efficiently. It provides component support for popular frameworks like Vue, nuxt and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs in PDF and Canvas formats."
          :style="{ fill: '#ffffff',textAlign:'justify', font: '24px LemonJelly' }"
        />

        <i-text 
          :x="30"
          :y="350"
          :width="540"
          text="PDF-frame is a web framework for client side PDF generation. With its declarative HTML syntax and semantics, it offers a easy way to define PDF graphical content efficiently. It provides component support for popular frameworks like Vue, nuxt and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs in PDF and Canvas formats."
          :style="{ fill: '#ffffff',textAlign:'justify', font: '24px MonteCristo' }"
        />

        <i-text 
          :x="30"
          :y="550"
          :width="540"
          text="PDF-frame is a web framework for client side PDF generation. With its declarative HTML syntax and semantics, it offers a easy way to define PDF graphical content efficiently. It provides component support for popular frameworks like Vue, nuxt and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs in PDF and Canvas formats."
          :style="{ fill: '#ffffff',textAlign:'justify', font: '24px ShinyCrystal' }"
        />

        <i-text 
          :x="30"
          :y="750"
          :width="540"
          text="PDF-frame is a web framework for client side PDF generation. With its declarative HTML syntax and semantics, it offers a easy way to define PDF graphical content efficiently. It provides component support for popular frameworks like Vue, nuxt and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs in PDF and Canvas formats."
          :style="{ fill: '#ffffff',textAlign:'justify', font: '24px TheBlacklist' }"
        />

        <i-text 
          :x="30"
          :y="950"
          :width="540"
          text="PDF-frame is a web framework for client side PDF generation. With its declarative HTML syntax and semantics, it offers a easy way to define PDF graphical content efficiently. It provides component support for popular frameworks like Vue, nuxt and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs in PDF and Canvas formats."
          :style="{ fill: '#ffffff',textAlign:'justify', font: '24px Pecita' }"
        />
      </i-page>
    </pdfFrame>
  </div>
</template>

<style>

.pdfContainer {
  height: 100%;
  width: 100%;
}
</style>
