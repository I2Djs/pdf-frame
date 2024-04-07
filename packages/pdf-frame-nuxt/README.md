<p align="center">
  <img src="https://github.com/I2Djs/pdf-frame/blob/main/assets/pdf-frame.svg?raw=true" width=500>
</p>

<h3 align="center">
    
  [www.pdf-frame.org](https://www.pdf-frame.org)
   
</h3>

# pdf-frame-nuxt [![npm](https://img.shields.io/npm/v/@i2d/nuxt-pdf-frame.svg)](https://www.npmjs.com/package/@i2d/nuxt-pdf-frame) [![License](https://img.shields.io/npm/l/@i2d/nuxt-pdf-frame.svg)](https://www.npmjs.com/package/@i2d/nuxt-pdf-frame) [![Nuxt](https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js)](https://nuxt.com)

PDF-Frame-Nuxt is a Nuxt 3 module, designed to enable the rendering of PDF and Canvas graphics within Nuxt applications. It provides a simple, template-based syntax and semantics to simplify the creation and management of graphical content. Leveraging the i2djs framework, PDF-Frame-Nuxt supports generating graphical outputs in both PDF and Canvas formats.

## Features

* Declarative Syntax: Easily define PDF/Canvas graphical content using a clear and declarative syntax.
* SVG-like Syntax and Semantics: Adopts the familiar SVG tag and attribute syntax for defining geometrical shapes.
* Consistent Rendering: Provides the same syntax and semantics for rendering both PDF and Canvas outputs.
* Auto Pagination: Content overflow is taken care by the engine by spawning new pages, ensuring the document's integrity and readability.
* Multi-page Support: Create multi-page PDF documents seamlessly.
* Animations & Events: Easy way to define the animations and events on elements in canvas context.
* Nuxt 3 Compatible module.

## Documentation
  * [PDF-frame-nuxt](https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue)
  
## Playground
  * Try examples on [Stackblitz](https://stackblitz.com/~/github.com/I2Djs/pdf-frame-showcase)

## Quick Setup

### Installation
```
# Using pnpm
pnpm add @i2d/nuxt-pdf-frame

# Using yarn
yarn add @i2d/nuxt-pdf-frame

# Using npm
npm install @i2d/nuxt-pdf-frame
```

### Integration
Add `@i2d/nuxt-pdf-frame` module to the nuxt.config.js.
```javascript
export default defineNuxtConfig({
  modules: [
    '@i2d/nuxt-pdf-frame'
  ]
})
```

### Usage

#### PDF Basic Template
```html
<pdfFrame type="pdf" width="595" height="841">
  <i-g :transform="{ translate: [100, 200], scale: [2, 3], rotate: [ 45, 0, 0] }">
    <i-text :x="30" :y="60" :text="'Page 1 Title'" :width="530" :style="{font: '25px Arial', align: 'center'}"></i-text>
    <i-rect :x="30" :y="100" :width="535" :height="700" :style="{ fillStyle:'#f0f0f0' }"></i-rect>
    <i-image src="src/assets/i2d-frame.svg" :width="200" :x="175" :y="100"></i-image>
  </i-g>
</pdfFrame>
```

#### PDF Multi-Page Template
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

#### Canvas Template
```html
<pdfFrame type="canvas" width="595" height="841">
  <i-g :transform="{ translate: [100, 200], scale: [2, 3], rotate: [ 45, 0, 0] }">
    <i-text :x="30" :y="60" :text="'Page 1 Title'" :width="530" :style="{font: '25px Arial', align: 'center'}"></i-text>
    <i-rect :x="30" :y="100" :width="535" :height="700" :style="{ fillStyle:'#f0f0f0' }"></i-rect>
    <i-image src="src/assets/i2d-frame.svg" :width="200" :x="175" :y="100"></i-image>
  </i-g>
</pdfFrame>
```

### License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

### Compatibility
Pdf-Frame-Nuxt is Nuxt 3 client only module.

