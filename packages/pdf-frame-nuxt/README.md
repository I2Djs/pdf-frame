# pdf-frame-nuxt

<p align="center">
  <img src="https://github.com/I2Djs/pdf-frame/blob/main/assets/pdf-frame.svg?raw=true" width=500>
</p>

## Introduction

pdf-frame-nuxt is a nuxt module for rendering PDF/Canvas graphics, and it's built on the i2djs framework. It employs an intuitive HTML-based syntax to define graphics, making it simple for users to create and manage 2D graphical elements using SVG-like tags. In addition, pdf-frame-nuxt facilitates the rendering of graphics in both PDF and Canvas formats, offering efficiency and versatility in generating diverse graphical content.


## Features

* Declarative HTML syntax for defining graphical content.
* Renders PDF and Canvas outputs.
* Dynamic content creation leveraging vuejs capabilities - template engine and reactivity.
* Provides abstract elements to define multi-page PDF documents.

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

## Tutorial
  Docs: [PDF-frame-vue](https://github.com/I2Djs/pdf-frame/wiki/pdf%E2%80%90frame%E2%80%90nuxt)
  
  Examples:
  * [PDF Example](https://j8r4lw.csb.app/)
  * [Canvas Example](https://cmynlk.csb.app/)
  

## Contributing
Contributions are welcome! If you would like to contribute to pdf-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayanaswamy14@gmail.com`.
