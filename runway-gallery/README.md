# Runway-Gallery
`runway-gallery` pre-processes gallery images for static websites. By processing images during site builds, it generates optimally sized thumbnails to minimize site load time without creating any request-time server load.

## Usage
The `runway-gallery` package exports an object with a single attribute, `default`, with a function as the value. That function has two parameters: a configuration object (see [Configuration](Configuration)), and the path in which the gallery photos should be processed (i.e. the directory containing the `imagesFolder` and `thumbsFolder`). It returns a Promise with a resolution parameter of an object that includes all the configuration object's values, and adds the filenames of the processed thumbnail files.

Example usage:
```JavaScript
var runwayGallery = require('runway-gallery')
var galleryConfig = // configuration options object
runwayGallery.default(
	galleryConfig,
	'.'
).then(gallery => {
	// gallery object includes all values from galleryConfig, and adds processed thumbnail filenames
}
```

### Configuration

Example configuration object:
```JSON
{
	"name": "My Gallery",
	"imagesFolder": "images",
	"thumbsFolder": "images/thumbs",
	"width": 960,
	"imagesPerRow": 4,
	"imageMargins": {
		"horiz": 10,
		"vert": 10
	},
	"images": [
		{
			"filename": "image1.jpg"
		}
	]
}
```
Property | Type | Default | Description
:--------|:----:|:-------:|:-----------
name | string | `'gallery'` | The name to be rendered labelling the gallery
imagesFolder | string | `'images'` | The path, relative to the file instantiating the `runway-react` component, to the full-size image files listed in the `images` property
thumbsFolder | string | `'images/thumbs'` | The path, relative to the file instantiating the `runway-react` component, to which `runway-gallery` will save the generated thumbnail image files
width | integer | `960`| The width, in pixels, of the gallery component
imagesPerRow | integer | `4` | The number of images to place in each row of the thumbnail gallery
imageMargins | object | `{ horiz: 10, vert: 10 }` | The horizontal and vertical margins, in pixels, around each gallery thumbnail
images | array | `[]` | The list of images to render in the gallery as represented by an object -- see below for the definition of this object

Each object in the Runway configuration `images` consist of the following fields:

Property | Type | Description
:--------|:----:|:-----------
filename | string | The filename of the image -- the image file must exist in the `imagesFolder` directory
caption | string | (Optional) The caption to be rendered with the image in the overlay

Example `images` array:
```JSON
[
	{
		"filename": "image1.jpg"
	},
	{
		"filename": "iamge2.jpg",
		"caption": "This photo is the second image in this gallery"
	}
]
```

## Use in a build tool

### Webpack
The [`runway-webpack-loader`](../runway-webpack-loader) package defines a loader that wraps `runway-gallery` for use with Webpack.

### Other build tools
Wrappers may be written for `runway-gallery` so that it can be used as a plugin/loader for other build tools used to generate static sites. Use the [`runway-webpack-loader`](../runway-webpack-loader) package as an example of the requirements of such a wrapper.
