# pdf-frame


<p align="center">
  <img src="https://github.com/I2Djs/pdf-frame/blob/main/assets/pdf-frame.svg?raw=true" width=500>
</p>

| Package | version |
| --- | --- |
| [vuejs](https://github.com/I2Djs/pdf-frame/tree/main/packages/pdf-frame-vue) | [![npm](https://img.shields.io/npm/v/@i2d/pdf-frame-vue.svg)](https://www.npmjs.com/package/@i2d/pdf-frame-vue) |
| [nuxtjs](https://github.com/I2Djs/pdf-frame/tree/main/packages/pdf-frame-nuxt) | [![npm](https://img.shields.io/npm/v/@i2d/pdf-frame-nuxt.svg)](https://www.npmjs.com/package/@i2d/pdf-frame-nuxt) |
| reactjs | WIP |

## Introduction

pdf-frame is a web framework for client side PDF generation. With its declarative HTML syntax and semantics, it offers a easy way to define PDF graphical content efficiently. It provides component support for popular frameworks like Vue, nuxt and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs in PDF and Canvas formats.

## Features

* Declarative HTML syntax for defining pdf content.
* Adoption of SVG tag syntax for creating geometrical shapes.
* Rendering options: PDF, Canvas and SVG.
* Easy creation of multi-page PDF documents.

## Usage Example
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
        <i-text :x="30" :y="60" :text="'Page 1 Title'" :width="530" :style="{font: '25px Arial', align: 'center'}"></i-text>
        <i-rect :x="30" :y="100" :width="535" :height="700" :style="{ fillStyle:'#f0f0f0' }"></i-rect>
    </i-page>
    
    <!-- Page 2 -->
    <i-page p-template="temp-1">
        <i-text :x="30" :y="60" :text="'Page 2 Title'" :width="530" :style="{font: '25px Arial', align: 'center'}"></i-text>
        <i-image src="src/assets/i2d-frame.svg" :width="200" :x="175" :y="100"></i-image>
    </i-page> 
</pdfFrame>
```

## Framework components

pdf-frame provides framework specific components to support easy and quick adoptions in the projects:

 ### vue
 
  Tutorial: [PDF-frame-vue](https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue)
  
  Example:
  * [PDF Example](https://j8r4lw.csb.app/)
  * [Canvas Example](https://cmynlk.csb.app/)
       
  

  ### nuxt
  Tutorial: [PDF-frame-nuxt](https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue)
  
  Example:
  * [PDF Example](https://j8r4lw.csb.app/)
  * [Canvas Example](https://j8r4lw.csb.app/)

## Documentation
* [PDF-Frame-Vue](https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue)
* [PDF-Frame supported Tags](https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue-tags-syntax)
* [page‐template](https://github.com/I2Djs/pdf-frame/wiki/i%E2%80%90page%E2%80%90template)
  

## Contributing
Contributions are welcome! If you would like to contribute to pdf-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayanaswamy14@gmail.com`.
