import React from 'react'
import deepmerge from 'deepmerge'
import { LoadableImage, Placeholder, ScaledComponent } from 'react-image-placeholder'
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

		this.lightboxImageConfigDefaults = {
			type: ScaledComponent,
			props: {
				componentType: Placeholder,
				componentProps: {
					placeholderType: Placeholder,
					placeholderProps: {
						componentType: LoadableImage
					},
					componentType: LoadableImage
				}
			}
		}

		this.openOverlay = this.openOverlay.bind(this)
		this.openOverlayIndex = this.openOverlayIndex.bind(this)
	}
	openOverlay (image) {
		const index = this.imageIndices[image]
		this.openOverlayIndex(index)
	}
	openOverlayIndex (index) {
		this.setState({
			overlay: {
				open: true,
				current: index
			}
		})
	}
	render () {
		// set default image components
		// TODO: update documentation for thumbImageConfig prop -- remove thumbImageType
		// TODO: update documentation for lightboxImageConfig prop -- remove lightboxImageType
		const lightboxImageConfig = deepmerge(
			this.lightboxImageConfigDefaults,
			this.props.lightboxImageConfig ? this.props.lightboxImageConfig : {}
		)
		const LightboxImageType = lightboxImageConfig.type

		// lightbox config input
		var lightboxConfigDefaults = {
			width: '90vw',
			height: '100vh',
			heightOffset: 90,
			spinner: () => { return <div></div> }
		}
		var lightboxConfig = {...lightboxConfigDefaults, ...this.props.lightboxConfig}

		// generate image components for lightbox
		lightboxConfig.images = []
		// and map from image filenames to their indices in the image list
		this.imageIndices = {}
		var currentImageIndex = 0
		this.props.config.gallery.rows.forEach(row => {
			row.images.forEach(image => {
				const thumbFile = this.props.config.thumbsFolder + '/' + image.filename
				const imageFile = this.props.config.imagesFolder + '/' + image.filename

				var lightboxImageProps = deepmerge(
					{
						componentProps: {
							placeholderProps: {
								componentProps: {
									imageProps: {
										src: thumbFile,
										width: '100%',
										height: '100%'
									}
								}
							},
							componentProps: {
								imageProps: {
									src: imageFile,
									width: '100%',
									height: '100%'
								}
							}
						},
						width: image.metadata.width,
						height: image.metadata.height,
						maxWidth: lightboxConfig.width,
						maxHeight: `calc(${lightboxConfig.height} - ${lightboxConfig.heightOffset}px)`
					},
					lightboxImageConfig.props
				)

				const imageComponent = <LightboxImageType
					{...lightboxImageProps}
				/>
				const lightboxImage = {
					component: imageComponent,
					src: imageFile
				}
				lightboxConfig.images.push(lightboxImage)

				this.imageIndices[imageFile] = currentImageIndex
				currentImageIndex ++
			})
		})

		// set lightbox component properties
		lightboxConfig.currentImage = this.state.overlay.current
		lightboxConfig.isOpen = this.state.overlay.open
		lightboxConfig.onClickNext = () => (
			this.openOverlayIndex(this.state.overlay.current + 1)
		)
		lightboxConfig.onClickPrev = () => (
			this.openOverlayIndex(this.state.overlay.current - 1)
		)
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
					openOverlay = {this.openOverlay}
					imageComponentConfig = {this.props.thumbImageConfig}
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
