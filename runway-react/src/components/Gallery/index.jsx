import React from 'react'
import { ImagePlaceholder, ScaledImagePlaceholder } from 'react-image-placeholder'
import GalleryRow from './components/GalleryRow/index.jsx'
import Lightbox from 'react-images'

export default class Gallery extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			overlay: {
				open: false,
				current: 0
			}
		}
		this.overlayImage = this.overlayImage.bind(this)
		this.overlayImageIndex = this.overlayImageIndex.bind(this)
	}
	overlayImage (image) {
		const index = this.imageIndices[image]
		this.overlayImageIndex(index)
	}
	overlayImageIndex (index) {
		this.setState({
			overlay: {
				open: true,
				current: index
			}
		})
	}
	render () {
		// set default image components
		const ThumbImageType = this.props.thumbImageType ?
			this.props.thumbImageType
			: ImagePlaceholder
		const LightboxImageType = this.props.lightboxImageType ?
			this.props.lightboxImageType
			: ScaledImagePlaceholder

		// lightbox config input
		var lightboxConfigDefaults = {
			width: '90vw',
			height: '100vh',
			heightOffset: 90,
			spinner: () => { return <div></div> }
		}
		var lightboxConfig = {...lightboxConfigDefaults, ...this.props.lightboxConfig}

		// generate image components for lightbox
		this.imageIndices = {}
		var currentImageIndex = 0
		lightboxConfig.images = []
		this.props.config.gallery.rows.forEach(row => {
			row.images.forEach(image => {
				const imageFile = this.props.config.imagesFolder + '/' + image.filename
				image.component = <LightboxImageType
					metadata={{
						src: imageFile,
						width: image.metadata.width,
						height: image.metadata.height
					}}
					maxHeight={`calc(${lightboxConfig.height} - ${lightboxConfig.heightOffset}px)`}
					maxWidth={lightboxConfig.width}
				/>
				lightboxConfig.images.push(image)
				this.imageIndices[imageFile] = currentImageIndex
				currentImageIndex ++
			})
		})

		// set lightbox component properties
		lightboxConfig.currentImage = this.state.overlay.current
		lightboxConfig.isOpen = this.state.overlay.open
		lightboxConfig.onClickNext = () => (
			this.overlayImageIndex(this.state.overlay.current + 1)
		).bind(this)
		lightboxConfig.onClickPrev = () => (
			this.overlayImageIndex(this.state.overlay.current - 1)
		).bind(this)
		lightboxConfig.onClose = () => (
			this.setState({
				overlay: {
					open: false
				}
			})
		)
		const lightbox = this.props.lightbox ? <Lightbox {...lightboxConfig} /> : undefined

		// assemble thumbnail gallery component
		var galleryConfig = {}
		galleryConfig.name = this.props.config.name // TODO migrate config values to specific field (requires changes to runway-gallery package)
		galleryConfig.imagesFolder = this.props.config.imagesFolder
		galleryConfig.thumbsFolder = this.props.config.thumbsFolder
		galleryConfig.width = this.props.config.width
		galleryConfig.imagesPerRow = this.props.config.imagesPerRow
		galleryConfig.imageMargins = this.props.config.imageMargins
		const galleryRows = this.props.config.gallery.rows.map((row, index) => {
			const last = (index === this.props.config.gallery.rows.length - 1)
			return (
				<GalleryRow
					key = {index}
					row = {row}
					galleryConfig = {galleryConfig}
					overlayImage = {this.overlayImage}
					imageComponentType = {ThumbImageType}
					last = {last}
				/>
			)
		})

		return (
			<div style={{width: `${galleryConfig.width}px`}}>
				<p>This is a Runway gallery called {this.props.config.name}</p>
				{galleryRows}
				{lightbox}
			</div>
		)
	}
}
