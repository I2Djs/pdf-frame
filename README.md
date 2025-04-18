<p align="center">
  <img src="https://github.com/I2Djs/pdf-frame/blob/main/assets/pdf-frame.svg?raw=true" width=500>
</p>

<h3 align="center">
    
  [www.pdf-frame.org](https://www.pdf-frame.org)
   
</h3>

# pdf-frame

| Package | version |
| --- | --- |
| [pdf-frame-vue](https://github.com/I2Djs/pdf-frame/tree/main/packages/pdf-frame-vue) | [![npm](https://img.shields.io/npm/v/@i2d/pdf-frame-vue.svg)](https://www.npmjs.com/package/@i2d/pdf-frame-vue) [![Downloads](https://img.shields.io/npm/dm/@i2d/pdf-frame-vue.svg)](https://www.npmjs.com/package/@i2d/pdf-frame-vue) |
| [pdf-frame-nuxt](https://github.com/I2Djs/pdf-frame/tree/main/packages/pdf-frame-nuxt) | [![npm](https://img.shields.io/npm/v/@i2d/nuxt-pdf-frame.svg)](https://www.npmjs.com/package/@i2d/nuxt-pdf-frame) [![Downloads](https://img.shields.io/npm/dm/@i2d/nuxt-pdf-frame.svg)](https://www.npmjs.com/package/@i2d/nuxt-pdf-frame) |

## Introduction
https://www.npmjs.com/package/@i2d/nuxt-pdf-frame

Pdf-frame is a JavaScript web framework for client-side PDF/Canvas rendering. With its declarative HTML syntax and semantics, it offers an easy and efficient way to define PDF/Canvas graphical content. It follows syntax similar to SVG's and provides component support for popular frameworks like Vue, nuxt, and React(work in progress). Powered by [i2djs](https://github.com/I2Djs/I2Djs), PDF-frame presently supports rendering outputs as PDF and Canvas formats.

## Features

* **Declarative Syntax:** Easily define PDF/Canvas graphical content using a clear and declarative syntax.
* **SVG-like Syntax and Semantics:** Adopts the familiar SVG tag and attribute syntax for defining geometrical shapes.
* **Consistent Rendering:** Provides the same syntax and semantics for rendering both PDF and Canvas outputs.
* **Auto Pagination:** Content overflow is taken care by the engine by spawning new pages, ensuring the document's integrity and readability.
* **Multi-page Support:** Create multi-page PDF documents seamlessly.
* **Animations & Events:** Easy way to define the animations and events on elements in canvas context.
* Framework component support: Vue, nuxt.

## Blogs:
  * [Creating visually rich PDFs with PDF-Frame-Vue](https://nswamy14.hashnode.dev/creating-visually-rich-pdfs-with-pdf-frame-vue)
  * [Simplifying PDF Rendering in Vue with PDF-Frame-Vue](https://nswamy14.hashnode.dev/pdf-rendering-made-easy-with-pdf-frame-vue)

### Canvas Template
```html
<pdfFrame type="canvas" width="595" height="841">
  <i-g :transform="{ translate: [100, 200], scale: [2, 3], rotate: [ 45, 0, 0] }">
    <i-text :x="30" :y="60" :text="'Page 1 Title'" :width="530" :style="{font: '25px Arial', align: 'center'}"></i-text>
    <i-rect :x="30" :y="100" :width="535" :height="700" :style="{ fillStyle:'#f0f0f0' }"></i-rect>
    <i-image src="src/assets/i2d-frame.svg" :width="200" :x="175" :y="100"></i-image>
  </i-g>
</pdfFrame>
```

### PDF Basic Template
```html
<pdfFrame type="pdf" width="595" height="841">
  <i-g :transform="{ translate: [100, 200], scale: [2, 3], rotate: [ 45, 0, 0] }">
    <i-text :x="30" :y="60" :text="'Page 1 Title'" :width="530" :style="{font: '25px Arial', align: 'center'}"></i-text>
    <i-rect :x="30" :y="100" :width="535" :height="700" :style="{ fillStyle:'#f0f0f0' }"></i-rect>
    <i-image src="src/assets/i2d-frame.svg" :width="200" :x="175" :y="100"></i-image>
  </i-g>
</pdfFrame>
```

### Multi-Page PDF Template
```html
<pdfFrame type="pdf" width="595" height="841">
    <!-- Page Templates -->
    <i-page-template id="temp-1">
        <i-rect :x="0" :y="0" :width="595" :height="841" :style="{ fillStyle:'#ffffff' }"></i-rect>
        <i-text :x="30" :y="30" :text="'Header Text'" :width="530" :style="{font: '15px Arial'}"></i-text>
        <i-text :x="30" :y="810" :text="'Footer Text'" :width="530" :style="{font: '15px Arial'}"></i-text>
    </i-page-template>
    <!-- Page 1 -->
    <i-page p-template="temp-1">
      <i-g :transform="{ translate: [100, 200], scale: [2, 3], rotate: [ 45, 0, 0] }">
          <i-text :x="30" :y="60" :text="'Page 1 Title'" :width="530" :style="{font: '25px Arial', align: 'center'}"></i-text>
          <i-rect :x="30" :y="100" :width="535" :height="700" :style="{ fillStyle:'#f0f0f0' }"></i-rect>
      </i-g>
    </i-page>
    
    <!-- Page 2 -->
    <i-page p-template="temp-1">
        <i-text :x="30" :y="60" :text="'Page 2 Title'" :width="530" :style="{font: '25px Arial', align: 'center'}"></i-text>
        <i-image src="src/assets/i2d-frame.svg" :width="200" :x="175" :y="100"></i-image>
    </i-page> 
</pdfFrame>
```
  

## Contributing
Contributions are welcome! If you would like to contribute to pdf-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayanaswamy14@gmail.com`.
