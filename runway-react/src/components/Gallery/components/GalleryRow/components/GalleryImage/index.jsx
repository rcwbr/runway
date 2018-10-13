import React from 'react'
import styles from './styles.js'

export default class GalleryImage extends React.Component {
	render () {
		const imagesFolder = this.props.galleryConfig.imagesFolder
		const thumbsFolder = this.props.galleryConfig.thumbsFolder
		const imageSrc = imagesFolder + '/' + this.props.image.filename
		const thumbSrc = thumbsFolder + '/' + this.props.image.filename

		const ImagePlaceholderType = this.props.imageComponentType
		return (
			<div
				style = { styles.imageDiv(
					this.props.last,
					this.props.galleryConfig.imageMargins
				)}
				onClick = {
					() => this.props.overlayImage(imageSrc)
				}
			>
				<ImagePlaceholderType
					metadata={{
						src: thumbSrc,
						width: this.props.image.width,
						height: this.props.image.height
					}}
					width={`${this.props.image.width}px`}
					height={`${this.props.image.height}px`}
				/>
			</div>
		)
	}
}
