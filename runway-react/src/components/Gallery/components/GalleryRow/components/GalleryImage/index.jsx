import React from 'react'
import deepmerge from 'deepmerge'
import { Placeholder, LoadableImage } from 'react-image-placeholder'
import styles from './styles.js'

export default class GalleryImage extends React.Component {
	render () {
		const imagesFolder = this.props.galleryConfig.imagesFolder
		const thumbsFolder = this.props.galleryConfig.thumbsFolder
		const imageSrc = imagesFolder + '/' + this.props.image.filename
		const thumbSrc = thumbsFolder + '/' + this.props.image.filename

		const imageComponent = deepmerge(
			{
				type: Placeholder,
				props: {
					placeholderType: Placeholder,
					placeholderProps: {
						moduleType: LoadableImage,
						moduleProps: {
							imageProps: {
								src: thumbSrc,
								width: `${this.props.image.width}px`,
								height: `${this.props.image.height}px`
							}
						}
					},
					moduleType: LoadableImage,
					moduleProps: {
						imageProps: {
							src: imageSrc,
							width: this.props.image.width,
							height: this.props.image.height
						}
					},
					width: `${this.props.image.width}px`,
					height: `${this.props.image.height}px`
				}
			},
			this.props.imageComponent ? this.props.imageComponent : {}
		)
		const ImageComponentType = imageComponent.type

		return (
			<div
				style = { styles.imageDiv(
					this.props.last,
					this.props.galleryConfig.imageMargins
				)}
				onClick = {
					() => this.props.openOverlay(imageSrc)
				}
			>
				<ImageComponentType
					{...imageComponent.props}
				/>
			</div>
		)
	}
}
