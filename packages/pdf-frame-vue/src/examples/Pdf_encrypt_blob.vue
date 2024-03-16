<script setup>
  let config={
    margin:5,
    defaultFont: 'Courier',
    margins: {
      lef: 5,
      right: 5,
      top: 5,
      bottom: 5
    },
  }
  let encry = {
    userPassword: "pdfframe"
    // ownerPassword:
    // permissions: {
        // printing:,
        // modifying:,
        // copying:,
        // annotating:,
        // fillingForms:,
        // contentAccessibility:,
        // documentAssembly:
    // }
  };
  let info = {
    title: "PDF-Frame Blob example",
    author: "Narayana Swamy",
    keywords: "PDF-Frame, I2Djs",
    creationDate: new Date(),
  }
  let updateExternalIframe = function (url) {
    document.getElementById("ext_iframe_").setAttribute("src", url);
  }
</script>

<template>
  <div class="pdfContainer">
    <iframe src="" height="100%" width="100%" id="ext_iframe_"></iframe>
    <pdfFrame
      id="nswamyid"
      type="pdf-blob"
      :width="595"
      :height="841"
      :config="config"
      :encrypt="encry"
      @on-update="updateExternalIframe"
      :encryption="encry"
      :info="info"    >
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
        <i-linearGradient
            id="grad4"
            :x1="0"
            :y1="0"
            :x2="0"
            :y2="100"
            :colorStops="[{
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
                           }]"
          />
        <i-path d="M366.2,204.2 c-9.8,0 -15,-5.6 -15,-15.1 V77.2 h-85 v28 h19.5 c9.8,0 8.5,2.1 8.5,11.6 v72.4 c0,9.5 0.5,15.1 -9.3,15.1 H277 h-20.7 c-8.5,0 -14.2,-4.1 -14.2,-12.9 V52.4 c0,-8.5 5.7,-12.3 14.2,-12.3 h18.8 v-28 h-127 v28 h18.1 c8.5,0 9.9,2.1 9.9,8.9 v56.1 h-75 V53.4 c0,-11.5 8.6,-13.3 17,-13.3 h11 v-28 H2.2 v28 h26 c8.5,0 12,2.1 12,7.9 v142.2 c0,8.5 -3.6,13.9 -12,13.9 h-21 v33 h122 v-33 h-11 c-8.5,0 -17,-4.1 -17,-12.2 v-57.8 h75 v58.4 c0,9.1 -1.4,11.6 -9.9,11.6 h-18.1 v33 h122.9 h5.9 h102.2 v-33 H366.2 z" transform="translate(100,30)" :style="{ fillStyle:'grad(grad4)',  }"
        />
        <i-text 
          :x="30"
          :y="300"
          :width="540"
          align="justify"
          text="PDF-frame is a web framework for client side PDF generation. With its declarative HTML syntax and semantics, it offers a easy way to define PDF graphical content efficiently. It provides component support for popular frameworks like Vue, nuxt and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs in PDF and Canvas formats."
          :style="{ fillStyle: '#ffffff',align:'justify' }"
        />
        <i-rect v-for="n in 30"
          :x="500 - n*15"
          :y="200 - n*2.5"
          :width="n*6"
          :height="n*6"
          transform="translate(10,280)"
          :style="{ fillStyle:'hsl(' + ((n * 10) % 360) + ',100%,50%)', opacity: 0.2,strokeStyle: '#000000', lineWidth: 1 }"
        />
        <i-circle v-for="n in 30"
          :cx="30 + n*15"
          :cy="100"
          :r="10 + n*2"
          transform="translate(10,580)"
          :style="{ fillStyle:'hsl(' + ((n * 10) % 360) + ',100%,50%)',opacity: 0.2, strokeStyle: '#000000', lineWidth: 1 }"
        />
      </i-page>
      <i-page p-template="temp-1">
        <i-group transform="translate(0,20)">
          <i-group transform="translate(50,50)">
            <i-rect
              :x="0"
              :y="0"
              :width="300"
              :height="300"
              :rx=30
              :ry=30
              :style="{ strokeStyle:'#03fcf4', lineWidth: 15 }"
            />
            <i-circle :cx="150" :cy="150" :r="75" :style="{ fillStyle:'#ff0000' }" />
          </i-group>
          <i-group transform="translate(250,250)">
            <i-rect
              :x="0"
              :y="0"
              :width="300"
              :height="300"
              :rx=30
              :ry=30
              :style="{ strokeStyle:'#03fcf4', lineWidth: 15 }"
            />
            <i-circle :cx="150" :cy="150" :r="75" :style="{ fillStyle:'#00ff00' }" />
          </i-group>
          <i-group transform="translate(50,450)">
              <i-rect
                :x="0"
                :y="0"
                :width="300"
                :height="300"
                :rx=30
                :ry=30
                :style="{ strokeStyle:'#03fcf4', lineWidth: 15 }"
              />
              <i-circle :cx="150" :cy="150" :r="75" :style="{ fillStyle:'#0000ff' }" />
          </i-group>
        </i-group>
      </i-page>
      <i-page p-template="temp-1">
        
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
