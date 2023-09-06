# pdf-frame


<p align="center">
  <img src="https://github.com/I2Djs/pdf-frame/blob/main/assets/pdf-frame.svg?raw=true" width=500>
</p>

## Introduction

pdf-frame is a web framework for client side PDF generation. With its declarative HTML syntax and semantics, it offers a easy way to define PDF graphical content efficiently. It provides component support for popular frameworks like Vue, nuxt and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs in PDF and Canvas formats.

## Features

* Declarative HTML syntax for defining pdf content.
* Adoption of SVG tag syntax for creating geometrical shapes.
* Rendering options: PDF, Canvas and SVG.
* Easy creation of multi-page PDF documents.

## Installation

To use pdf-frame in your project, you can install it via npm:

  ### vue
  ``` bash
    npm install pdf-frame-vue
  ```

  ### nuxt
  ``` bash
    npm install pdf-frame-nuxt
  ```

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
In the pdf-frame context, the `<pdfFrame>` tag is used to create a client instance for rendering graphical content in the specified format.
  
  * type="pdf": The type attribute specifies the output format of rendered graphical content. In this case, it is set to "pdf", indicating that the content to be rendered as a PDF document. Possible values are `pdf`, `canvas`

  * width="595": The width attribute sets the width of the graphical element.

  * height="841": The height attribute sets the height of the graphical element.
    
  
  Inside the <pdfFrame> tag, you can add one or more <i-page> elements to represent different pages within the PDF document and define the content to be rendered on each page.
  Inside the <i-page> tag, we have defined circle element with properties 'r', 'cx', 'cy' and 'styles'.
  

## Contributing
Contributions are welcome! If you would like to contribute to pdf-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayanaswamy14@gmail.com`.
