# pdf-frame-vue

<p align="center">
  <img src="https://github.com/I2Djs/pdf-frame/blob/main/assets/pdf-frame.svg?raw=true" width=500>
</p>

## Introduction

pdf-frame-vue is a vue.js component for rendering PDF/Canvas graphics on web. It supports an intuitive HTML-based syntax to define graphics, making it simple and easy for users to create and manage 2D graphical content. It is implemented on I2djs framework.

## Features

* Declarative HTML syntax for defining graphical content.
* Renders PDF, Canvas output
* Adoption of SVG tag syntax for creating geometrical shapes.
* Easy creation of multi-page PDF documents.

## Installation

To use pdf-frame-vue in your project, you can install it via npm:
  
  ``` bash
    npm install @i2d/pdf-frame-vue
  ```
## Integration

Register the pdf-frame-vue component to your application as shown below.
Add the following code in vue entry file : main.js 
``` Javascript
import pdfFrame from "@i2d/pdf-frame-vue";
createApp(App).component("pdfFrame", pdfFrame)
```

  Tutorial: [PDF-frame-vue](https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90vue)
  
  Example:
  * [PDF Example](https://j8r4lw.csb.app/)
  * [Canvas Example](https://cmynlk.csb.app/)

## Usage
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




## Contributing
Contributions are welcome! If you would like to contribute to pdf-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayanaswamy14@gmail.com`.
