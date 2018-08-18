import React from 'react'
import ImagePlaceholder from 'react-image-placeholder'
import styles from './styles.js'

export default class GalleryImage extends React.Component {
	render () {
		const imagesFolder = this.props.galleryConfig.imagesFolder
		const thumbsFolder = this.props.galleryConfig.thumbsFolder
		const src = thumbsFolder + '/' + this.props.image.filename

		const imgPlaceholder = <ImagePlaceholder
			metadata = {{
				src: src,
				width: this.props.image.width,
				height: this.props.image.height
			}}
		/>
		return (
			<div
				style = { styles.imageDiv(
					this.props.last,
					this.props.galleryConfig.imageMargins
				)}
				onClick = {
					() => this.props.overlayImage(imgPlaceholder)
				}
			>
				{imgPlaceholder}
			</div>
		)
	}
}
