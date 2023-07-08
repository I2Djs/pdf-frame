# pdf-frame


<p align="center">
  <img src="https://github.com/I2Djs/pdf-frame/blob/main/assets/pdf-frame.svg?raw=true" width=500>
</p>

## Introduction

pdf-frame is a web framework designed specifically for handling PDF graphics requirements. With its declarative HTML syntax and semantics, it offers a straightforward way to define PDF graphical content efficiently. It provides component support for popular frameworks like Vue, nuxt and React(work in progress). Built on the i2djs framework, PDF-frame presently supports rendering outputs in PDF and Canvas formats.

## Features

* Declarative HTML syntax for defining graphical content.
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
    <i-page>
      <i-circle :cx=100 :cy=200 :r=50 :style="{ fillStyle: '#ff0000', strokeStyle= '#ff00ff' }">
      <i-circle>
    </i-page>
</pdfFrame>
```
In the pdf-frame context, the `<pdfFrame>` tag is used to create a client instance for rendering graphical content in the specified format.
  
  * type="pdf": The type attribute specifies the output format for rendering the graphical content. In this case, it is set to "pdf", indicating that the content will be rendered as a PDF document. Possible values are `pdf/canvas`

  * width="595": The width attribute sets the width of the client area for rendering the graphical content. Here, it is set to "595", indicating a width of 595 units.

  * height="841": The height attribute sets the height of the client area. It is set to "841", indicating a height of 841 units.
  
  Inside the <pdfFrame> tag, you can add one or more <i-page> elements to represent different pages within the PDF document and define the content to be rendered on each page.
  Inside the <i-page> tag, we have defined circle element with properties 'r', 'cx', 'cy' and 'styles'.
  

## Contributing
Contributions are welcome! If you would like to contribute to pdf-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayanaswamy14@gmail.com`.
