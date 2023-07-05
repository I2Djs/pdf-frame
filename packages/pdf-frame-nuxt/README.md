# pdf-frame-nuxt

<p align="center">
  <img src="https://github.com/I2Djs/i2d-frame/blob/main/assets/i2d-frame.svg?raw=true" width=500>
</p>

## Introduction

pdf-frame-nuxt is a nuxt component designed for rendering PDF/Canvas graphics, and it's built upon the i2djs framework. It employs an intuitive HTML-based syntax to define graphics, making it simple for users to create and manage 2D graphical elements using SVG-like tags. In addition, pdf-frame-nuxt facilitates the rendering of graphics in both PDF and Canvas formats, offering efficiency and versatility in generating diverse graphical content.


## Features

* Declarative HTML syntax for defining graphical content.
* Renders PDF, Canvas output
* Adoption of SVG tag syntax for creating geometrical shapes.
* Easy creation of multi-page PDF documents.

## Installation

To use pdf-frame-nuxt in your project, you can install it via npm:

  
  ### vue
  ``` bash
    npm install @i2d/pdf-frame-nuxt
  ```

## Usage
```html
<pdfFrame type="pdf" width="595" height="841">
    <i-page>
    </i-page>
</pdfFrame>
```
The `<pdfFrame>` tag is used to create a client instance for rendering graphical content in the specified format.
  
  * type="pdf": The type attribute specifies the output format for rendering the graphical content. In this case, it is set to "pdf", indicating that the content will be rendered as a PDF document. Possible values are `pdf/canvas/svg/webgl`

  * width="595": The width attribute sets the width of the client area for rendering the graphical content. Here, it is set to "595", indicating a width of 595 units.

  * height="841": The height attribute sets the height of the client area. It is set to "841", indicating a height of 841 units.
  
  Inside the <pdfFrame> tag, you can add one or more <i-page> elements to represent different pages within the PDF document and define the content to be rendered on each page.
  

## Contributing
Contributions are welcome! If you would like to contribute to pdf-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayanaswamy14@gmail.com`.
