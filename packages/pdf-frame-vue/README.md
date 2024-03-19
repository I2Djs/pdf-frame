<p align="center">
  <img src="https://github.com/I2Djs/pdf-frame/blob/main/assets/pdf-frame.svg?raw=true" width=500>
</p>

# pdf-frame-vue [![npm](https://img.shields.io/npm/v/@i2d/pdf-frame-vue.svg)](https://www.npmjs.com/package/@i2d/pdf-frame-vue)

PDF-Frame-Vue is a vue.js component designed for rendering PDF and Canvas graphics effortlessly on the web. This component provides an intuitive HTML Template-based syntax and semantics that simplifies the creation and management of graphical content. Leveraging the [i2djs](https://github.com/I2Djs/I2Djs) framework, PDF-Frame-Vue currently supports rendering outputs in both PDF and Canvas formats.

PDF-Frame-Vue implements Vue.js' custom renderer, taking advantage of framework capabilities like templating, the reactivity system, component architecture and many more.

## Features

* **Declarative Syntax**: Easily define PDF/Canvas graphical content using a clear and declarative syntax. Adopts the familiar SVG tag and attribute syntax for defining geometrical shapes.
* **Multi media output**: **Canvas** and **PDF**.
* **Consistent Rendering**: Provides the same syntax and semantics for rendering both PDF and Canvas outputs.
* **Auto Pagination**: Content overflow is taken care by the engine by spawning new pages, ensuring the document's integrity and readability.
* **Multi-page PDF Support**: Create multi-page PDF documents seamlessly.
* **Animations & Events**: Easy way to define the animations and events on elements in canvas context.

## Documentation: 
  * [PDF-frame-vue](https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue)
  
## Playground:
  * [PDF Example](https://stackblitz.com/edit/pdf-frame-vuejs?embed=1&file=src%2FApp.vue)
  * [PDF Custom Font Example](https://stackblitz.com/edit/pdf-frame-vuejs-67yqev)
  * [Canvas Example](https://stackblitz.com/edit/pdf-frame-vuejs-canvas?embed=1&file=src%2FApp.vue)
  * [Canvas Animation](https://stackblitz.com/edit/pdf-frame-vuejs-canvas-qp1rhy?file=src%2FApp.vue)
  * [Canvas Animation 2](https://stackblitz.com/edit/pdf-frame-vuejs-canvas-ragz9p?file=src%2FApp.vue)

## Blogs:
  * [Creating visually rich PDFs with PDF-Frame-Vue](https://nswamy14.hashnode.dev/creating-visually-rich-pdfs-with-pdf-frame-vue)
  * [Simplifying PDF Rendering in Vue with PDF-Frame-Vue](https://nswamy14.hashnode.dev/pdf-rendering-made-easy-with-pdf-frame-vue)

## Usage
### PDF Template
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

### Canvas Template
```html
<pdfFrame type="pdf" width="595" height="841">
  <i-g :transform="{ translate: [100, 200], scale: [2, 3], rotate: [ 45, 0, 0] }">
    <i-text :x="30" :y="60" :text="'Page 1 Title'" :width="530" :style="{font: '25px Arial', align: 'center'}"></i-text>
    <i-rect :x="30" :y="100" :width="535" :height="700" :style="{ fillStyle:'#f0f0f0' }"></i-rect>
    <i-image src="src/assets/i2d-frame.svg" :width="200" :x="175" :y="100"></i-image>
  </i-g>
</pdfFrame>
```

## Contributing
Contributions are welcome! If you would like to contribute to pdf-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayanaswamy14@gmail.com`.
