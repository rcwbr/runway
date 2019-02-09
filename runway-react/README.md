# Runway-React
The `runway-react` package defines a `Gallery` component, which renders a thumbnail gallery and [Lightbox](https://github.com/rcwbr/react-images) viewer to display images processed by the `runway-gallery` tool.

## Usage
Example usage of the `runway-react Gallery` component can be found in the [test-runway](../test-runway/README.md) package.

The simplest use case of the `runway-react Gallery` component passes only the config prop:
```JavaScript
import Runway from 'runway-react'
<Runway config={runwayConfig} />
```
In this case, the `Gallery` defaults to render only the thumbnail gallery, with no Lightbox. `runwayConfig` is an object representation of the output of the `runway-gallery` tool, usually passed through the build tool. Here is an example using the [`runway-webpack-loader`](../runway-webpack-loader/README.md):
```JavaScript
import Runway from 'runway-react'
import runwayConfig from 'runway-webpack-loader!./gallery.runwayconf.json'
<Runway config={runwayConfig} />
```
Here, `gallery.runwayconf.json` would be a config file used as input to the `runway-gallery` tool. It could have this content:
```JSON
{
	"name": "My Gallery",
	"images": [
		{
			"filename": "image.jpg"
		}
	]
}
```
The `.runwayconf` pre-extension is not required when using the inline `runway-webpack-loader!` loader directive. However, Webpack can also be directed, in the `webpack.config.js` file, to use the `runway-webpack-loader` for any files with a `.runwayconf` pre-extension, such that the import could instead be just
```JavaScript
import runwayConfig from './gallery.runwayconf.json'
```
(see [`runway-webpack-loader`](../runway-webpack-loader/README.md))

### Input
A `runway-react` component receives configuration for the component itself, defining details such as whether the gallery should render images in an overlay when clicked, as well as the configuration details for the gallery rendered by the component.
#### runway-react configuration
Example:
```JavaScript
import Runway from 'runway-react'
<Runway
	lightbox={true}
	thumbImageType={(props) => {
		return <img src={props.metadata.src} />
	}}
	lightboxImageType={(props) => {
		return <img src={props.metadata.src} />
	}}
/>
```

Property | Type | Default | Description
:--------|:----:|:-------:|:-----------
lightbox | boolean | `false` | Show image lightbox on image click.
thumbImageType | component | `ImagePlaceholder` | Optional. Must define image component for the thumbnail gallery based on the `props`. See `props` fields below.
lightboxImageType | component | `ScaledImagePlaceholder` | Optional. Must define image component for the lightbox based on the `props`. See `props` fields below.

`thumbImageType` and `lightboxImageType` components receive `props` with the following fields:

Property | Type | Description
:--------|:----:|:-----------
metadata.src | string | The filename of the image (or path and filename, if applicable)
metadata.width | integer | Width, in pixels, of the image file.
metadata.height | integer | Height, in pixels, of the image file.
width | string | (`thumbImageComponent` only) Width integer with CSS units, representing the exact width the image should be rendered to.
height | string | (`thumbImageComponent` only) Height integer with CSS units, representing the exact height the image should be rendered to.
maxWidth | string | (`lightboxImageComponent` only) Width integer with CSS units to which the image should scale down to fit within. The rendered image's width may be smaller if the scale factor to keep its height within the `maxHeight` parameter requires it.
maxHeight | string | (`lightboxImageComponent` only) Height integer with CSS units to which the image should scale down to fit within. The rendered image's height may be smaller if the scale factor to keep its width within the `maxWidth` parameter requires it.

#### Lightbox configuration
If using the lightbox with a `runway-react` component (i.e. with the `lightbox` property set to true), a configuration object will be passed through to the lightbox component. Documentation of this configuration can be found in the [`react-images` package](https://github.com/rcwbr/react-images). Some fields mentioned there cannot be set as props from the `runway-react` component because it sets them internally. These fields are `onClose`, `images`, `isOpen`, `onClickNext`, `onClickPrev` and `onClose`.
```JavaScript
import Runway from 'runway-react'
<Runway
	lightboxConfig = {{
		width: '70vw',
		height: '70vh',
		heightOffset: 120
	}}
/>
```
Additionally, `runway-react` components set the `spinner` property of their lightbox components to an empty `div` by default, because the default image placeholder effectively replaces the function of the spinner. The spinner can be overridden as a field of the `lightboxConfig` property, either to an arbitrary component, or back to the `react-images` default spinner via an `undefined` value:
```JavaScript
import Runway from 'runway-react'
<Runway
	lightboxConfig = {{
		spinner: undefined
	}}
/>
```

Property | Type | Default | Description
:--------|:----:|:-------:|:-----------
width | string | `'90vw'` | The maximum width of images rendered in the lightbox. Must include CSS units in string. Should not exceed `90vh`, or buttons will render on top of images.
height | string | `'100vh'` | The maximum height of images rendered in the lightbox, plus the `heightOffset` property.
heightOffset | integer | `90` | The height (in pixels) subtracted from the `height` property to determine the maximum height of lightbox images, accounting for the height of the close button and image count text.

#### Runway configuration
The configuration for the gallery rendered by a `runway-react` component is passed in through the `config` property. Usually, this property should be defined by the output of a Runway loader, rather than by direct assignment at `runway-react` component instantiation.

Example:
```JavaScript
import Runway from 'runway-react'
<Runway config={{
	name: 'gallery',
	imagesFolder: 'images',
	thumbsFolder: 'images/thumbs',
	width: 960,
	imagesPerRow: 4,
	imageMargins: {
		horiz: 10,
		vert: 10
	},
	images: []
}} />
```

Normally, this property should be read from a Runway loader, as in this example:
```JavaScript
import Runway from 'runway-react'
import runwayConfig from 'runway-webpack-loader!./gallery.runwayconf.json'
<Runway config={runwayConfig} />
```

See [`runway-gallery`](../runway-gallery) for documentation of how to use this configuration.

### Output
The `Gallery` React component is self-contained within a div with an explicit pixel width defined by the `config` prop's `width` field. The height is not self-constrained.

## Implementation details

The image [lightbox](https://github.com/rcwbr/react-images) is part of a very lightly modified version of [jossmac's react-images](https://github.com/jossmac/react-images). The only change is the addition of an optional `component` field of each obect in the Lightbox component's `images` array, which, if present, is rendered in place of the default `<img>` component in the lightbox. This allows the [`react-element-placeholder`](https://todo) to be rendered in the lightbox while the image files load.
