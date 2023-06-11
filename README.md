# i2d-frame

<p align="center">
  <img src="https://github.com/I2Djs/i2d-frame/blob/main/assets/i2d-frame.svg?raw=true" width=500>
</p>

## Introduction

i2d-frame is a 2D graphical framework written on top of the i2djs framework. It provides a declarative HTML syntax and semantics for defining graphical content. With i2d-frame, you can easily create and manipulate 2D graphics using familiar SVG tag syntax. The framework supports rendering output as Canvas, PDF, and SVG, allowing you to generate various types of graphical content efficiently. Additionally, i2d-frame enables the creation of multi-page PDF documents with ease.

## Features

* Declarative HTML syntax for defining graphical content.
* Adoption of SVG tag syntax for creating geometrical shapes.
* Rendering options: PDF, Canvas and SVG.
* Easy creation of multi-page PDF documents.

## Installation

To use i2d-frame in your project, you can install it via npm:

  ### nuxt
  ``` bash
    npm install i2d-frame-nuxt
  ```
  
  ### vue
  ``` bash
    npm install i2d-frame-vue
  ```

## Usage
```html
<i2dClient type="pdf" width="595" height="841">
    <i-page>
    </i-page>
</i2dClient>
```
In the i2d-frame context, the `<i2dClient>` tag is used to create a client instance for rendering graphical content in the specified format.
  
  * type="pdf": The type attribute specifies the output format for rendering the graphical content. In this case, it is set to "pdf", indicating that the content will be rendered as a PDF document. Possible values are `pdf/canvas/svg/webgl`

  * width="595": The width attribute sets the width of the client area for rendering the graphical content. Here, it is set to "595", indicating a width of 595 units.

  * height="841": The height attribute sets the height of the client area. It is set to "841", indicating a height of 841 units.
  
  Inside the <i2dClient> tag, you can add one or more <i-page> elements to represent different pages within the PDF document and define the content to be rendered on each page.
  

## Contributing
Contributions are welcome! If you would like to contribute to i2d-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/i2d-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayaswamy14@gmail.com`.
