# pdf-frame-vue

<p align="center">
  <img src="https://github.com/I2Djs/pdf-frame/blob/main/assets/pdf-frame.svg?raw=true" width=500>
</p>

## Introduction

pdf-frame-vue is a vue.js component designed for rendering PDF/Canvas graphics, and it's built upon the i2djs framework. It employs an intuitive HTML-based syntax to define graphics, making it simple for users to create and manage 2D graphical elements using SVG-like tags. In addition, pdf-frame-vue facilitates the rendering of graphics in both PDF and Canvas formats, offering efficiency and versatility in generating diverse graphical content.


## Features

* Declarative HTML syntax for defining graphical content.
* Renders PDF, Canvas output
* Adoption of SVG tag syntax for creating geometrical shapes.
* Easy creation of multi-page PDF documents.

## Installation

To use pdf-frame-vue in your project, you can install it via npm:

  
  ### vue
  ``` bash
    npm install @i2d/pdf-frame-vue
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

## Table of Contents

- [pdfFrame Element](#pdfFrame-element)
- [Supported Elements](#supported-elements)
    - [i-page](#i-page)
    - [i-page-template](#i-page-template)
    - [i-rect](#i-rect)
    - [i-circle](#i-circle)
    - [i-line](#i-line)
    - [i-group](#i-group)
    - [i-path](#i-path)
    - [i-polygon](#i-polygon)
    - [i-ellipse](#i-ellipse)
    - [i-text](#i-text)
    - [i-image](#i-image)
    - [i-linearGradient](#i-linearGradient)
    - [i-radialGradient](#i-radialGradient)

## <a name="pdfFrame-element"></a> pdfFrame Element

The pdfFrame element is the main container for PDF content. It accepts attributes for defining various properties:

```html
<pdfFrame type="pdf" width="595" height="841"></pdf-frame>
```

## <a name="supported-elements"></a> Supported Elements

### <a name="i-page"></a> i-page
Denotes an individual page within the PDF. "p-template" specifies the template applied to the page.
```html
<i-page p-template="temp-1"></i-page>
```

### <a name="i-page-template"></a> i-page-template
Define page styles and assign them to respective pages using the "p-template" attribute.
```html
<i-page-template id="temp-1"></i-page-template>
```

### <a name="i-rect"></a> i-rect
Draws rectangles with attributes like position (x, y), width, height, and styling properties.
```html
<i-rect :x="0" :y="0" :width="595" :height="800" :style="{ fillStyle:'#ff0000' }" />
```

### <a name="i-circle"></a> i-circle
Draws circles with attributes like cx, cy, and r for position, size, and style properties.
```html
<i-circle :cx="0" :cy="0" :r="50" :style="{ fillStyle:'#ff0000' }" />
```

### <a name="i-line"></a> i-line
Draws lines with x1, y1, x2, y2 attributes for start and end points.
```html
<i-line :x1="0" :y1="0" :x2="50" :y2="50" :style="{ strokeStyle:'#00ff00' }" />
```

### <a name="i-group"></a> i-group
Groups other elements together for collective styling or transformation.
```html
<i-group id="group-1" :transform="{‘translate’: [100, 50]}" :style="{ strokeStyle:'#00ff00' }" />
```

### <a name="i-path"></a> i-path
Defines complex paths using commands and parameters in the d attribute.
```html
<i-path d="M0,0 L10,23Z" :style="{ strokeStyle:'#00ff00' }" />
```

### <a name="i-polygon"></a> i-polygon
Creates polygons with multiple sides, defined by the points attribute.
```html
<i-polygon :points="[{x: 0, y:0},{x: 100, y:200},{x:200, y:300}]" :style="{ strokeStyle:'#00ff00' }" />
```

### <a name="i-ellipse"></a> i-ellipse
Draws ellipses using cx, cy, rx, and ry attributes for center, horizontal radius, and vertical radius.
```html
<i-ellipse :cx="0" :cy="0" :rx="50" :ry="50" :style="{ fillStyle:'#ff0000' }" />
```

### <a name="i-text"></a> i-text
Renders text using x, y, text attributes as per style format. Width attribute for wrapping text.
```html
<i-text :x="0" :y="60" :text="aboutText" :width="530" :style="{fillStyle:'grad(grad1)',font: '25px Arial', align: 'center'}" class="text_123" />
```

### <a name="i-image"></a> i-image
Renders images using x, y, width, height, and src attributes.
```html
<i-image src="src/assets/i2d-frame.svg" :width="200" :x="175" :y="0" />
```

## Color gradients
PDF frame supports linear or radial gradients akin to I2djs.

### <a name="i-linearGradient"></a> i-linearGradient
Defines linear gradient fills.
```html
<i-linearGradient id="grad1" :x1="0" :y1="0" :x2="100" :y2="0" :colorStops="[{ color: '#FF7C80', offset:0, opacity: 1}, { color: '#0075F3', offset:100, opacity: 1}]" />
```

### <a name="i-radialGradient"></a> i-radialGradient
Defines radiant gradient fills.
```html
<i-radialGradient id="grad1" :inerCircle="{x: 0, y: 0, r: 50}" :outerCircle="{x: 0, y: 0, r: 100}" :colorStops="[{ color: '#FF7C80', offset:0, opacity: 1}, { color: '#0075F3', offset:100, opacity: 1}]" />
```


## Contributing
Contributions are welcome! If you would like to contribute to pdf-frame, please follow the guidelines in CONTRIBUTING.md.

## License
This project is licensed under the MIT License. See the [LICENSE](https://raw.githubusercontent.com/I2Djs/pdf-frame/main/LICENSE) file for more details.

## Contact
For any inquiries or support, please contact `narayanaswamy14@gmail.com`.
